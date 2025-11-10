#!/bin/bash

# Vercel Deploy Hook Trigger Script
# This script triggers Vercel deployments for specific branches

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display usage
usage() {
    echo "Usage: $0 <branch-name>"
    echo ""
    echo "Available branches:"
    echo "  1. claude/test-build-deploy-hooks-011CUzLG4EX5fybyy2E6b2qy"
    echo "  2. claude/check-tools-011CUwxroJjnrY3ZzpXzQqDh"
    echo ""
    echo "Example:"
    echo "  $0 claude/test-build-deploy-hooks-011CUzLG4EX5fybyy2E6b2qy"
    exit 1
}

# Check if branch name is provided
if [ $# -eq 0 ]; then
    usage
fi

BRANCH="$1"

# Load deploy hooks from environment or .env file
if [ -f ".env.deploy" ]; then
    source .env.deploy
fi

# Determine which deploy hook to use
case "$BRANCH" in
    "claude/test-build-deploy-hooks-011CUzLG4EX5fybyy2E6b2qy")
        DEPLOY_HOOK_URL="${VERCEL_DEPLOY_HOOK_TEST_BUILD:-}"
        BRANCH_NAME="test-build-deploy-hooks"
        ;;
    "claude/check-tools-011CUwxroJjnrY3ZzpXzQqDh")
        DEPLOY_HOOK_URL="${VERCEL_DEPLOY_HOOK_CHECK_TOOLS:-}"
        BRANCH_NAME="check-tools"
        ;;
    *)
        echo -e "${RED}Error: Unknown branch '$BRANCH'${NC}"
        usage
        ;;
esac

# Check if deploy hook URL is set
if [ -z "$DEPLOY_HOOK_URL" ]; then
    echo -e "${RED}Error: Deploy hook URL not found for branch '$BRANCH'${NC}"
    echo ""
    echo "Please set the environment variable or create a .env.deploy file with:"
    echo "VERCEL_DEPLOY_HOOK_TEST_BUILD=https://api.vercel.com/..."
    echo "VERCEL_DEPLOY_HOOK_CHECK_TOOLS=https://api.vercel.com/..."
    exit 1
fi

# Confirm deployment
echo -e "${YELLOW}About to trigger deployment for:${NC}"
echo -e "  Branch: ${GREEN}$BRANCH${NC}"
echo -e "  Name: ${GREEN}$BRANCH_NAME${NC}"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Trigger the deploy hook
echo -e "${YELLOW}Triggering deployment...${NC}"
RESPONSE=$(curl -s -X POST "$DEPLOY_HOOK_URL")

# Check if deployment was triggered successfully
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Deployment triggered successfully!${NC}"
    echo ""
    echo "Response from Vercel:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    echo ""
    echo "Check deployment status at: https://vercel.com/dashboard"
else
    echo -e "${RED}✗ Failed to trigger deployment${NC}"
    exit 1
fi
