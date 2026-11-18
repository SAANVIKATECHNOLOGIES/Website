# Google Apps Script Setup Guide for Service Requirement Form

This guide enables the customer requirement form on your website to send customer issues and photo attachments directly to **`info@saanvikatechnologies.com`** without exposing passwords or paying for third-party forms.

---

## 🚀 2-Minute Deployment Steps

### Step 1: Open Google Apps Script
1. Go to [https://script.google.com](https://script.google.com) (make sure you are signed into your Google Workspace or Gmail account for `info@saanvikatechnologies.com`).
2. Click **"+ New project"** in the top left.
3. Rename the project at the top from *"Untitled project"* to **`SAANVIKA Service Form`**.

---

### Step 2: Paste the Script Code
1. Delete any sample code in the editor (`function myFunction() {}`).
2. Open [`google-apps-script/Code.gs`](../google-apps-script/Code.gs) in your repository, copy all the code, and paste it into the editor.
3. Click the **Save** floppy icon (or press `Ctrl + S`).

---

### Step 3: Deploy as a Web App
1. In the top-right corner, click the blue **"Deploy"** button &rarr; select **"New deployment"**.
2. Click the gear icon (**Select type**) next to "Select type" and choose **"Web app"**.
3. Fill in the deployment settings:
   - **Description**: `SAANVIKA Form Intake v1`
   - **Execute as**: `Me (your email)` *(leaves your Google account in control)*
   - **Who has access**: **`Anyone`** *(allows website visitors to submit requirements)*
4. Click **"Deploy"**.
5. Google will ask you to **"Authorize access"**:
   - Click **"Authorize access"**
   - Choose your Google account
   - If you see *"Google hasn't verified this app"*, click **"Advanced"** at the bottom &rarr; then click **"Go to SAANVIKA Service Form (unsafe)"** &rarr; click **"Allow"**.
6. Google will provide a **Web app URL** looking like:
   ```text
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
7. Click **"Copy"** to copy that Web app URL.

---

### Step 4: Paste the URL into `assets/js/config.js`
Open [`assets/js/config.js`](../assets/js/config.js) and paste your URL into `formScriptUrl`:

```javascript
  contact: {
    phone:         { enabled: true,  display: "+91 88863 33367", tel: "+918886333367" },
    whatsapp:      { enabled: true,  number: "918886333367" },
    email:         { enabled: true,  address: "info@saanvikatechnologies.com" },
    // Paste your deployed Google Apps Script URL here:
    formScriptUrl: "https://script.google.com/macros/s/YOUR_DEPLOYED_ID_HERE/exec",
    hours:         { enabled: false, lines: [] }
  },
```

Commit and push to GitHub:
```bash
git add assets/js/config.js
git commit -m "Connect live Google Apps Script form endpoint"
git push origin main
```

---

## 🔒 Why This Solution Is 100% Secure
1. **No Passwords on GitHub**: Because Google Apps Script executes under your Google Account authorization within Google's cloud, no App Passwords or API keys are stored in GitHub Pages.
2. **Photo Attachments Handled**: Photos taken from customer phones are safely converted to Base64 and attached as true email attachments in your inbox.
3. **One-Click Reply**: The email sent to you includes `Reply-To: customer@email.com` so you can simply hit "Reply" in Gmail or click the green "Chat on WhatsApp" button inside the email notification.
