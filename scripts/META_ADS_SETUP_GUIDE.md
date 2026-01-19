# VERALABS Meta Ads Manager Setup Guide

## Quick Setup Checklist

### Prerequisites
- [ ] Meta Business Suite access
- [ ] Instagram Professional Account connected
- [ ] Payment method added
- [ ] Ad account verified

---

## Campaign Setup (Step-by-Step)

### Step 1: Create New Campaign

1. Go to **business.facebook.com/adsmanager**
2. Click **+ Create**
3. Select Campaign Objective: **Engagement** → **Messages**
4. Campaign Name: `VERALABS_Messaging_Campaign_Jan2026`
5. Click **Continue**

---

### Step 2: Ad Set Configuration

#### Ad Set 1: Lead Generation

**Name:** `VERALABS_LeadGen_Shadow_Lace_Silk`

**Conversion Location:**
- Select: **Messaging Apps**
- Choose: **Instagram Direct**

**Budget & Schedule:**
- Daily Budget: **$30** (testing phase)
- Schedule: Run continuously
- Bid Strategy: Lowest cost

**Audience:**

| Setting | Value |
|---------|-------|
| Location | United States, Canada, UK, Australia |
| Age | 25-54 |
| Gender | All |

**Detailed Targeting (Interests):**
```
- Fine art photography
- Boudoir photography
- Luxury goods
- Haute couture
- Fashion photography
- Art collecting
- Self-expression
- Body positivity
- Intimate apparel
- Editorial photography
- Vogue magazine
- Fashion editorials
```

**Placements:**
- [x] Instagram Feed
- [x] Instagram Stories
- [x] Instagram Reels
- [x] Instagram Explore
- [ ] Facebook (uncheck)
- [ ] Audience Network (uncheck)

---

#### Ad Set 2: Engagement

**Name:** `VERALABS_Engagement_WhichSpeaks`

Same settings as Ad Set 1, but:
- Daily Budget: **$20**
- Optimize for: **Conversations**

---

#### Ad Set 3: Conversion (Limited Drop)

**Name:** `VERALABS_Conversion_LimitedDrop`

Same settings as Ad Set 1, but:
- Daily Budget: **$40**
- Schedule: 48 hours only
- Optimize for: **Messaging replies**

---

### Step 3: Ad Creative Setup

#### For Each Ad:

1. **Ad Name:** Match the image filename (e.g., `ad_shadow_exclusive`)

2. **Media:**
   - Upload from: `/home/ecolex/version1/instagram-ads/`
   - Feed ads: `*_feed.jpg` (1080x1080)
   - Story ads: `*_story.jpg` (1080x1920)

3. **Primary Text (Lead Gen):**
```
Shadow speaks where words dare not venture.

Unlock exclusive access to the complete VERALABS collection.

✨ DM "SHADOW" for the Shadow Symphony gallery
✨ DM "LACE" for the Lace Poetry collection
✨ DM "SILK" for Mesh & Silk exclusives

Limited spots available. First 100 get a free styling guide.
```

4. **Primary Text (Engagement):**
```
Shadow. Lace. Silk.

Three collections. Three stories. One question:

Which speaks to YOUR soul?

Drop your answer in the DMs. We read every message.
Best answers featured in our stories ✨
```

5. **Primary Text (Conversion):**
```
🔥 48-HOUR DROP 🔥

The Mesh Moderne collection is here.

Only 50 pieces available.
No restock planned.
Early access for DM subscribers only.

DM "DROP" now before it's gone.
```

6. **Call to Action:** `Send Message`

7. **Message Template:**
   - Enable: **Automated responses**
   - Greeting: "Welcome to VERALABS ✨ What collection interests you?"

---

### Step 4: Automated Response Setup

Go to **Meta Business Suite** → **Inbox** → **Automations**

#### Create Keyword Automations:

**Keyword: SHADOW**
```
Welcome to the shadows ✨

Here's your exclusive access to the Shadow Symphony collection.

Light sculpts. Darkness embraces. The body becomes canvas.

🖼️ View the full gallery: [YOUR_LINK]

Reply with any questions - we're here to help!
```

**Keyword: LACE**
```
Poetry in lace, just for you 🖤

The Lace Poetry collection celebrates the intersection of textile artistry and intimate expression.

✨ Explore the collection: [YOUR_LINK]

Which piece caught your eye?
```

**Keyword: SILK**
```
Silk confessions unlocked 💫

Welcome to the Mesh & Silk collection - where transparency meets timelessness.

🌙 Your exclusive access: [YOUR_LINK]

Let us know if you need styling tips!
```

**Keyword: DROP**
```
You're in! 🔥

The Mesh Moderne limited drop is coming soon.

Only 50 pieces available. No restock planned.

You'll get first access before anyone else. Stay tuned for the link!

Reply "NOTIFY" to get an instant alert when it drops.
```

**Keyword: STYLE**
```
Your free styling guide is here! 📖

We've put together our complete intimate styling secrets - normally $47, free for you.

Download here: [YOUR_LINK]

Any specific styling questions? Just ask!
```

---

### Step 5: Tracking Setup

#### UTM Parameters:
```
?utm_source=instagram
&utm_medium=paid
&utm_campaign=veralabs_messaging
&utm_content={{ad.name}}
```

#### Conversion Events to Track:
- Messages started
- Messages replied
- Link clicks from DMs
- Leads captured

---

## Ad Creative Files

### Feed Ads (1:1 - 1080x1080)
| File | Ad Type | CTA |
|------|---------|-----|
| `ad_shadow_exclusive_feed.jpg` | Lead Gen | DM "SHADOW" |
| `ad_lace_vip_feed.jpg` | Lead Gen | DM "LACE" |
| `ad_silk_insider_feed.jpg` | Lead Gen | DM "SILK" |
| `ad_which_speaks_feed.jpg` | Engagement | Share your pick |
| `ad_art_or_fashion_feed.jpg` | Engagement | Join the debate |
| `ad_shadow_speaks_feed.jpg` | Brand Story | Learn more |
| `ad_poetry_in_lace_feed.jpg` | Brand Story | See more |
| `ad_limited_drop_feed.jpg` | Conversion | DM "DROP" |
| `ad_free_guide_feed.jpg` | Lead Magnet | DM "STYLE" |

### Story/Reel Ads (9:16 - 1080x1920)
| File | Ad Type | CTA |
|------|---------|-----|
| `ad_shadow_exclusive_story.jpg` | Lead Gen | DM "SHADOW" |
| `ad_lace_vip_story.jpg` | Lead Gen | DM "LACE" |
| `ad_silk_insider_story.jpg` | Lead Gen | DM "SILK" |
| `ad_which_speaks_story.jpg` | Engagement | Share your pick |
| `ad_art_or_fashion_story.jpg` | Engagement | Join the debate |
| `ad_shadow_speaks_story.jpg` | Brand Story | Learn more |
| `ad_poetry_in_lace_story.jpg` | Brand Story | See more |
| `ad_limited_drop_story.jpg` | Conversion | DM "DROP" |
| `ad_free_guide_story.jpg` | Lead Magnet | DM "STYLE" |

---

## Budget Recommendations

### Testing Phase (Week 1-2)
| Ad Set | Daily Budget | Duration |
|--------|--------------|----------|
| Lead Gen | $30 | 7 days |
| Engagement | $20 | 7 days |
| Conversion | $40 | 48 hours |
| **Total** | **$90/day** | |

### Scaling Phase (After Testing)
- Increase budget 20% every 2-3 days for winning ads
- Kill ads with CPM >$2.50 after 1000 impressions
- Scale winners to $100-200/day

---

## Performance Benchmarks

| Metric | Target | Good | Excellent |
|--------|--------|------|-----------|
| CPM | <$15 | <$10 | <$7 |
| CTR | >1% | >2% | >3% |
| Cost/Message | <$2 | <$1.50 | <$1 |
| Response Rate | >30% | >50% | >70% |

---

## Troubleshooting

**Low engagement?**
- Test different images
- Adjust targeting (broader or narrower)
- Try different ad copy

**High CPM?**
- Audience too narrow
- Creative fatigue
- Increase budget

**Few messages?**
- CTA not clear enough
- Add more urgency
- Simplify the keyword

---

*Guide created by VERALABS AI Studio*
