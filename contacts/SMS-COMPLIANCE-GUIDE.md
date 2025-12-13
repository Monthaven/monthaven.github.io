# SMS Compliance & Toll-Free Verification Guide
**Monthaven Capital - Complete Implementation Roadmap**

---

## 📋 Implementation Status

✅ **Completed:**
- Dedicated SMS opt-in page at `/text`
- Webform with name, mobile, reason dropdown, unchecked consent checkbox
- SMS Terms and Privacy Policy links
- Optional phone fields on Contact and Submit-a-Deal forms
- Email invitation strategy (link to /text, not reply-based consent)
- Proof-of-consent tracking: timestamp, IP, URL, consent version

⏳ **Next Steps:**
- Update form backend to store all consent data
- Configure Twilio Messaging Service with toll-free number
- Submit Toll-Free Verification (TFV) request
- Implement STOP/HELP keyword handling
- (Optional) Add double opt-in confirmation

---

## 🎯 Scope Recommendation

### Start with: **Transactional / Customer Care Only**

✅ Lowest-friction approval path  
✅ Avoids "marketing consent" complexity  
✅ No express written consent requirement  

Use cases:
- Scheduling calls
- Diligence requests  
- Deal process updates  
- Document requests

### Add Later: **Investor Deal Alerts** (Separate Program)

When ready, create:
- Separate opt-in checkbox or page (`/text-investors`)
- Explicit marketing/deal alert disclosure
- Distinct consent records (campaign-specific)

⚠️ **Important:** Consent is use-case specific. Cannot use transactional opt-in for marketing messages.

---

## 📱 Phase 1: Build Compliance "Proof" on Website

### ✅ 1. Dedicated Opt-In Page Created

**URL:** `monthavencapital.com/text`

**What Reviewers Look For:**
- ✅ Clear Monthaven Capital branding
- ✅ Visible opt-in form
- ✅ Disclosure text near phone field
- ✅ Links to Privacy Policy + SMS Terms
- ✅ Publicly reachable (no login, no robots.txt blocking)

### ✅ 2. Webform Requirements Met

**Fields:**
- ✅ Name (optional)
- ✅ Mobile phone (required, with auto-formatting)
- ✅ "Reason for texts" dropdown (Deal updates, Scheduling, Document requests, General updates)
- ✅ Consent checkbox (unchecked by default) ⚠️

**Checkbox Language (Transactional):**
```
I agree to receive text messages from Monthaven Capital at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. See our SMS Terms and Privacy Policy.
```

### ✅ 3. SMS Terms + Privacy Links

Both documents are linked from `/text` page:
- `/legal/sms` - SMS Terms
- `/legal/privacy` - Privacy Policy

### ✅ 4. Opt-In on Other Forms

Contact and Submit-a-Deal forms include:
- Optional phone field
- Same consent checkbox (appears when phone is entered)
- Same disclosure language
- JavaScript shows/hides consent based on input

### ✅ 5. Email Strategy

**Template Language:**
```
If you want text updates for scheduling and diligence, opt in here: 
monthavencapital.com/text
```

✅ Keeps proof clean and consistent  
✅ Email is invitation, not the opt-in mechanism

---

## 💾 Phase 2: Recordkeeping + Compliance Controls

### 6. Store Proof-of-Consent (Database Schema)

**Required Fields:**

```sql
CREATE TABLE sms_optins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone_e164 VARCHAR(20) NOT NULL,
  name VARCHAR(255),
  consent_version VARCHAR(10) DEFAULT 'v1',
  consent_text_snapshot TEXT,
  page_url VARCHAR(255) DEFAULT '/text',
  timestamp_utc DATETIME NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  program VARCHAR(50) DEFAULT 'transactional',
  status VARCHAR(20) DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**What to Capture:**
- ✅ Phone number (E.164 format: +1XXXXXXXXXX)
- ✅ Name (optional)
- ✅ Consent version (v1, v2, etc. - track language changes)
- ✅ Consent text snapshot (exact checkbox language)
- ✅ Page URL (`/text`)
- ✅ Timestamp (UTC)
- ✅ IP address
- ✅ User agent
- ✅ Program type (`transactional`)

### 7. Opt-Out State Machine

**Maintain Status Field:**

```javascript
status: {
  'active',           // Can receive messages
  'opted_out',        // Replied STOP
  'pending_confirm'   // (Optional) Double opt-in waiting for YES
}
```

**STOP Keyword Handling:**
1. User replies "STOP"
2. Update status to `opted_out`
3. Record: `opted_out_at`, `keyword_used`
4. Send one final confirmation: "You are unsubscribed. No more messages will be sent."
5. Block all future messages unless they re-opt-in

**Required by Twilio:**
- Must honor STOP immediately
- Can send one final confirmation
- Cannot message again until re-consent

### 8. (Optional) Double Opt-In

**Flow:**
1. User submits form at `/text`
2. Send: "Monthaven Capital: Reply YES to confirm subscription. Msg & data rates apply."
3. Wait for YES reply
4. Mark status as `active`
5. Send confirmation: "You are subscribed..."

**Benefits:**
- ✅ Reduces complaints
- ✅ Confirms phone ownership
- ✅ Stronger compliance defensibility

---

## 📞 Phase 3: Twilio Setup

### 9. Prerequisites

**Required:**
- ✅ Paid Twilio account
- ⏳ Toll-free number purchased

⚠️ **Important:** Toll-free numbers cannot send to US/Canada until TFV approval.

### 10. Configure Messaging Service

**Steps:**
1. Create Messaging Service in Twilio Console
2. Attach toll-free number to service
3. Set inbound webhook URL (for HELP, STOP, replies)
4. Enable delivery callbacks (logging + troubleshooting)
5. Configure status callbacks

**Webhook Endpoint Example:**
```
POST https://monthavencapital.com/api/sms/inbound
```

**Handle Inbound Messages:**
- STOP → Update status to opted_out
- HELP → Respond with help message
- YES (if double opt-in) → Activate subscription
- Other → Route to team or auto-respond

---

## 📋 Phase 4: Toll-Free Verification Submission

### 11. Prepare Screenshot

**Requirements:**
- Full page screenshot of `/text` opt-in form
- Show Monthaven Capital branding clearly
- Include consent checkbox (unchecked state)
- Show SMS Terms and Privacy Policy links
- High quality (not cropped, blurry, or missing branding)

**Where to Host:**
- Upload to public URL (e.g., monthavencapital.com/assets/tfv-optin-proof.png)
- Or use Twilio's upload feature during submission

### 12. TFV Request Fields

**Required Fields:**
- `useCaseCategories` - Array of use case types
- `useCaseSummary` - Detailed description (250+ chars)
- `productionMessageSample` - Example message
- `optInType` - WEB_FORM
- `optInImageUrls` - Array of screenshot URLs

**Recommended Fields:**
- `privacyPolicyUrl` - https://monthavencapital.com/legal/privacy
- `termsAndConditionsUrl` - https://monthavencapital.com/legal/sms
- `optInConfirmationMessage` - Post-signup text
- `helpMessageSample` - Response to HELP keyword

### 13. Copy/Paste Values for TFV Form

#### Use Case Categories
Select these options:
- ✅ Customer care
- ✅ Account notifications (Scheduling)
- ✅ Conversational

#### Use Case Summary
```
Monthaven Capital texts only individuals who opt in via our website form for scheduling and transaction-related communication (diligence requests and deal process updates). Message frequency varies. Recipients can opt out anytime by replying STOP and request help by replying HELP or emailing info@monthavencapital.com. We do not use purchased lists.
```

#### Production Message Sample
```
Monthaven Capital: Confirming our call on Tuesday at 2:00 PM ET. Reply STOP to unsubscribe. Reply HELP for help.
```

#### Opt-In Type
```
WEB_FORM
```

#### Opt-In URL
```
https://monthavencapital.com/text
```

#### Opt-In Confirmation Message (Recommended)
```
Monthaven Capital: You are subscribed to transaction-related texts. Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe. Reply HELP for help.
```

#### Help Message Sample (Recommended)
```
Monthaven Capital: For help, email info@monthavencapital.com. Reply STOP to unsubscribe.
```

#### Privacy Policy URL
```
https://monthavencapital.com/legal/privacy
```

#### Terms and Conditions URL
```
https://monthavencapital.com/legal/sms
```

---

## 🚫 Phase 5: Avoid Rejection Triggers

### Top Rejection Reasons

❌ **URL doesn't show opt-in mechanism clearly**
- ✅ Fixed: `/text` page has visible form with all required fields

❌ **Consent checkbox is pre-checked**
- ✅ Fixed: Checkbox is unchecked by default

❌ **Opt-in proof is cropped/blurry/not branded**
- ⏳ Action: Take high-quality full-page screenshot before submission

❌ **Policies mention selling/sharing opt-in data**
- ✅ Verify: Review Privacy Policy and SMS Terms to ensure no data-sharing language

❌ **Use case doesn't match actual messages**
- ✅ Fixed: Scope limited to transactional (scheduling, diligence, process updates)

### Submission Process

1. Log into Twilio Console
2. Navigate to Toll-Free Verification
3. Fill out form with copy/paste values above
4. Upload screenshot(s) of opt-in page
5. Submit for review

**Timeline:**
- Initial review: 5-7 business days
- Rejections can be corrected and resubmitted
- Keep response time fast to avoid delays

---

## 🔮 Phase 6: Investor Deal Alerts (Future)

### When Ready to Expand

**Create Separate Program:**

1. **New Page:** `/text-investors` or separate checkbox on `/text`

2. **Explicit Disclosure:**
```
"I agree to receive deal alert and investment opportunity texts from Monthaven Capital. This is marketing communication. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help."
```

3. **Separate Database Records:**
```sql
program = 'investor_alerts'
```

4. **New TFV Submission:**
- Submit separate verification request
- Use case: Marketing, Promotional, Lead Generation
- Provide proof of express written consent

⚠️ **Never cross-use consent:** Transactional opt-in ≠ Marketing permission

---

## 📅 Important Dates

**February 17, 2026:**
- Business registration number becomes required
- Gather now: EIN, business registration details

---

## ✅ Pre-Submission Checklist

Before submitting TFV:

- [ ] `/text` page is live and publicly accessible
- [ ] Screenshot taken and hosted
- [ ] SMS Terms and Privacy Policy reviewed (no data-sharing language)
- [ ] Form backend stores all consent fields
- [ ] Toll-free number purchased in Twilio
- [ ] Messaging Service created
- [ ] Inbound webhook endpoint ready (STOP/HELP handling)
- [ ] All TFV copy/paste values prepared
- [ ] Business registration information ready (EIN, etc.)

---

## 📞 Next Technical Steps

To complete implementation, you need:

1. **Form Backend Integration**
   - Connect `/text` form to database
   - Store all consent fields per schema above
   - Return success confirmation

2. **Twilio Webhook Handler**
   - POST endpoint: `/api/sms/inbound`
   - Parse inbound messages
   - Handle STOP, HELP, YES keywords
   - Update database status

3. **Admin Dashboard (Optional)**
   - View all opt-ins
   - See opt-out requests
   - Export compliance records

**Tech Stack Needed:**
- Backend: Node.js, Python, PHP, etc.
- Database: PostgreSQL, MySQL, or Firebase
- Hosting: Vercel, Netlify Functions, AWS Lambda

---

**Questions or Need Code Examples?**

Let me know your stack (Next.js, Astro, plain HTML + API, etc.) and I can provide:
- Exact form submission handler code
- Database setup scripts
- Twilio webhook handler
- Double opt-in flow implementation

---

**Generated:** December 12, 2025  
**Implementation Status:** Phase 1 Complete ✅
