/**
 * SAANVIKA TECHNOLOGIES - Customer Service Requirement Intake Web App
 * ------------------------------------------------------------------
 * Handles website form submissions, decodes photo/screenshot attachments,
 * and delivers structured service requests directly to info@saanvikatechnologies.com.
 *
 * Designed for deployment as a Google Apps Script Web App.
 * Safe for GitHub Pages: No API keys, passwords, or secrets are exposed in client code.
 */

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var recipient = "info@saanvikatechnologies.com";
    var customerName = data.name || "Customer";
    var customerPhone = data.phone || "Not provided";
    var customerEmail = data.email || "Not provided";
    var device = data.device || "General IT Requirement";
    var timeframe = data.timeframe || "Not specified";
    var serviceMode = data.serviceMode || "On-site / General";
    var problem = data.problem || "No description provided.";
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    var subject = "New Service Request: " + device + " - " + customerName + " (" + customerPhone + ")";

    // Clean phone number for direct WhatsApp link
    var cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;

    var htmlBody = 
      '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">' +
        // Brand Header
        '<div style="background-color: #101D35; padding: 24px; color: #FFFFFF;">' +
          '<h1 style="margin: 0 0 6px; font-size: 20px; letter-spacing: 0.5px; font-weight: 700;">SAANVIKA TECHNOLOGIES</h1>' +
          '<p style="margin: 0; font-size: 13px; color: #18B7A7; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;">New Service Requirement Received</p>' +
        '</div>' +

        // Content Body
        '<div style="padding: 24px; background-color: #FFFFFF; color: #1A202C; line-height: 1.6;">' +
          '<p style="margin-top: 0; font-size: 15px; color: #334155;">A new customer service request has been submitted through <strong>saanvikatechnologies.com</strong>:</p>' +
          
          '<table style="width: 100%; border-collapse: collapse; margin-bottom: 22px; font-size: 14px;">' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; width: 36%; color: #64748B;">Customer Name:</td><td style="padding: 10px 0; color: #0F172A; font-weight: 600;">' + customerName + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #64748B;">Phone / WhatsApp:</td><td style="padding: 10px 0;"><a href="tel:' + customerPhone + '" style="color: #0B7A70; font-weight: 700; text-decoration: none;">' + customerPhone + '</a> &nbsp; ' + (cleanPhone ? '<a href="https://wa.me/' + cleanPhone + '" style="background-color: #25D366; color: #FFFFFF; padding: 3px 8px; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: 600;">Chat on WhatsApp</a>' : '') + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #64748B;">Customer Email:</td><td style="padding: 10px 0;"><a href="mailto:' + customerEmail + '" style="color: #0B7A70; text-decoration: none;">' + customerEmail + '</a></td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #64748B;">Equipment / Service:</td><td style="padding: 10px 0; font-weight: 700; color: #101D35;">' + device + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #64748B;">Since When Not Working:</td><td style="padding: 10px 0; color: #DC2626; font-weight: 600;">' + timeframe + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #64748B;">Preferred Service Mode:</td><td style="padding: 10px 0; color: #334155;">' + serviceMode + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #64748B;">Submitted At:</td><td style="padding: 10px 0; color: #64748B; font-size: 13px;">' + timestamp + ' (IST)</td></tr>' +
          '</table>' +

          // Problem Description Box
          '<div style="background-color: #F8FAFC; border-left: 4px solid #18B7A7; padding: 16px; border-radius: 6px; margin-bottom: 20px;">' +
            '<h3 style="margin: 0 0 8px; font-size: 13px; text-transform: uppercase; color: #475569; letter-spacing: 0.6px; font-weight: 700;">Problem Description & Symptoms</h3>' +
            '<p style="margin: 0; white-space: pre-wrap; color: #1E293B; font-size: 15px;">' + problem + '</p>' +
          '</div>';

    var mailOptions = {
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    };

    if (customerEmail && customerEmail !== "Not provided" && customerEmail.indexOf("@") !== -1) {
      mailOptions.replyTo = customerEmail;
    }

    // Process photo / document attachment if included
    if (data.fileBase64 && data.fileName) {
      var contentType = data.fileType || "application/octet-stream";
      var bytes = Utilities.base64Decode(data.fileBase64);
      var blob = Utilities.newBlob(bytes, contentType, data.fileName);
      mailOptions.attachments = [blob];
      
      var fileSizeKb = Math.round((data.fileSize || 0) / 1024);
      htmlBody += 
        '<div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; color: #065F46;">' +
          '<strong>Attached File:</strong> ' + data.fileName + ' (' + fileSizeKb + ' KB) &mdash; see email attachment above.' +
        '</div>';
    }

    htmlBody += 
        '</div>' +
        // Footer
        '<div style="background-color: #F8FAFC; padding: 14px 24px; text-align: center; color: #64748B; font-size: 12px; border-top: 1px solid #E2E8F0;">' +
          'SAANVIKA TECHNOLOGIES &bull; Madhurawada, Visakhapatnam &bull; +91 88863 33367 &bull; info@saanvikatechnologies.com' +
        '</div>' +
      '</div>';

    mailOptions.htmlBody = htmlBody;

    // Send the email natively via GmailApp (using the user Google Account)
    MailApp.sendEmail(mailOptions);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Service requirement received successfully." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
