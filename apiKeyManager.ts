export async function fetchGcloudToken() {
  try {
    const res = await fetch("/api/gcloud-token")
    const data = await res.json()

    if (!data.success) throw new Error("Token fetch failed")

    return data.accessToken || data.token
  } catch (err) {
    console.warn("⚠️ Could not fetch API key from server:", err)
    return null
  }
}

export async function fetchGcloudProject() {
  try {
    const res = await fetch("/api/gcloud-project")
    const data = await res.json()

    if (!data.success) throw new Error("Project fetch failed")

    return data.projectId
  } catch (err) {
    console.warn("⚠️ Could not fetch GCP project from server:", err)
    return null
  }
}
