# SMS Opt-In Implementation & Toll-Free Verification Guide

## ✅ Implementation Complete

### 1. Dedicated SMS Opt-In Page
- **URL**: `monthavencapital.com/text`
- **Location**: `/text/index.html`
- **Features**:
  - Name field (required)
  - Mobile number field (required, with auto-formatting)
  - Reason dropdown (Deal updates, Scheduling, Document requests, General updates)
  - Required SMS consent checkbox with proper legal language
  - Links to SMS Terms and Privacy Policy
  - On-screen confirmation after submission
  - Automatic tracking: timestamp, IP address, page URL, consent version
  - Google Analytics event tracking

### 2. Existing Forms Updated
- **Contact form** (`/contact.html`)
- **Submit a Deal form** (`/submit-a-deal/index.html`)
- **Feature**: Optional phone field that reveals required SMS consent checkbox when populated
- **Behavior**: JavaScript automatically shows/hides consent based on phone input

### 3. Simplified "Country Club" Website
- **Navigation**: Reduced to Home, Team, Contact, Legal
- **Homepage Structure**:
  - Hero: Two clear lines about what you do
  - What We Do: 3 simple bullets
  - How It Works: 3 numbered steps
  - Who We Are a Fit For: Owners, Brokers, Investors
  - Trust Section: "Straight talk. Fast follow-through. Respect for relationships." + "We do not solicit tenants"
  - CTA: Send a Deal / Request a Call / Text Updates
- **Design**: Warm neutrals (cream/stone/charcoal), serif headings, clean sans body, generous white space

---

## 📋 Toll-Free Verification Form Answers

### Messaging Use Case Categories
Select these options:
- ✅ Customer care
- ✅ Account notifications (Scheduling)
- ✅ Conversational

### Use Case Description
Copy/paste exactly:
```
Monthaven Capital sends text messages only to people who opt in via our website form. Messages are for customer care and transaction-related communication such as scheduling calls, requesting diligence items, and sharing deal process updates. No tenant outreach. Recipients can opt out anytime by replying STOP and can get help by replying HELP.
```

### Proof of Consent URL
```
https://monthavencapital.com/text
```

### Sample Message
```
Monthaven Capital: Confirming our call on Thursday at 11:00 AM ET. Reply STOP to opt out, HELP for help.
```

### Opt-In Confirmation Message (Optional but Recommended)
```
Monthaven Capital: You are subscribed to text updates. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.
```

### Help Message Sample (Optional)
```
Monthaven Capital: For help, reply to this message or email info@monthavencapital.com. Reply STOP to opt out.
```

### Opt-In Keywords (Optional)
```
START, YES, UNSTOP
```

---

## 🔒 Data Storage Requirements

Your form backend (or CRM) should capture and store:

1. **Phone number** - The user's mobile number
2. **Timestamp** - When they submitted (already captured via hidden field)
3. **IP address** - User's IP (already captured via API call)
4. **Page URL** - Where they opted in (stored as `https://monthavencapital.com/text`)
5. **Consent version** - "v1" (allows you to track if you change language)
6. **Checkbox state** - `true` (required to submit)

**Note**: The `/text/index.html` form currently submits to Formspree. Update the `action` attribute on line 79 to your actual form endpoint.

---

## 📧 Email Best Practice

When sending outreach emails, **do not ask for reply-based consent**. Instead:

### ❌ Don't Write:
"Reply YES to receive text updates"

### ✅ Do Write:
"If you want text updates about this deal, you can opt in here: [monthavencapital.com/text]"

This keeps your proof of consent clean and carrier-friendly.

---

## 🎨 Design Notes

The site now has a "real estate country club" feel:
- **Warm neutral palette**: Cream (#f7f5f2), Stone/Sage (#d6d3cc), Charcoal (#2d2d2b)
- **Typography**: Lora serif for headings, Inter sans for body
- **Spacing**: Generous padding (80-120px sections), breathing room around content
- **Copy**: Plain English, no jargon, direct and professional
- **Trust signals**: "We do not solicit tenants" prominently displayed

---

## 🚀 Next Steps

1. **Update Formspree endpoint** in `/text/index.html` (line 79) with your actual form ID
2. **Test the SMS opt-in flow** - submit the form and verify data reaches your CRM
3. **Configure your SMS platform** to send the confirmation text after opt-in
4. **Submit the toll-free verification** using the language above
5. **Set up email templates** with links to `/text` instead of reply-based opt-in
6. **Train your team** on the new "proof of consent = web page" method

---

## 📞 Form Endpoints to Update

If not using Formspree, update these form actions:

- `/text/index.html` - Line 79: `action="https://formspree.io/f/YOUR_FORM_ID"`
- `/contact.html` - Already set to Netlify forms
- `/submit-a-deal/index.html` - Already set to Netlify forms

---

## ✨ What This Accomplishes

**For Carriers**:
- Clear, documented opt-in process
- Web-based proof of consent (stronger than email/text reply)
- Compliant messaging with proper STOP/HELP language
- No tenant outreach (huge for real estate compliance)

**For Your Users**:
- Simple, trustworthy opt-in experience
- Clear expectations about message frequency and content
- Easy opt-out process
- Professional, low-pressure design

**For Your Team**:
- Clean audit trail for every subscriber
- Single source of truth for consent (`/text` page)
- Reduced risk of carrier filtering or account suspension
- Fast verification approval process

---

Generated: December 12, 2025
