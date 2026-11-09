/*
 * SAANVIKA TECHNOLOGIES — site configuration
 * ------------------------------------------------------------------
 * This is the ONE file the business owner edits to change contact
 * details or publish additional services. No build step is needed:
 * edit, commit, push — GitHub Pages redeploys automatically.
 *
 * RULE: only set `enabled: true` / `verified: true` for information the
 * owner has confirmed. See docs/OWNER-CHECKLIST.md.
 */
window.SITE_CONFIG = {
  business: {
    name: "SAANVIKA TECHNOLOGIES",
    tagline: "Reliable Tech. Clear Solutions.",
    address: [
      "Plot No. 401, Sri Gayatri Nivas,",
      "Near Big Basket, Chandrampalem,",
      "Srinivasa Nagar, Madhurawada,",
      "Visakhapatnam, Andhra Pradesh – 530041, India"
    ],
    mapsUrl: "https://maps.app.goo.gl/uBvAg1Kp8fdG1vbHA?g_st=aw",
    // Used only for the embedded map. Verify the pin matches the shop.
    mapsEmbedQuery: "SAANVIKA TECHNOLOGIES, Chandrampalem, Madhurawada, Visakhapatnam 530041"
  },

  contact: {
    // Verified by the owner (call + WhatsApp).
    phone:    { enabled: true,  display: "+91 88863 33367", tel: "+918886333367" },
    whatsapp: { enabled: true,  number: "918886333367" },

    // NOT YET PROVIDED — set enabled:true after the owner confirms.
    email:    { enabled: false, address: "" },
    hours:    { enabled: false, lines: [ /* e.g. "Mon – Sat: 10:00 AM – 8:00 PM" */ ] }
  },

  // Default WhatsApp greeting for general "Get Support" buttons.
  defaultMessage: "Hello SAANVIKA TECHNOLOGIES, I need help with my computer.",

  /*
   * Services. Only `enabled: true` items are shown on the website.
   * The first two are the verified business categories.
   * The rest are SUGGESTIONS awaiting owner confirmation.
   */
  services: [
    {
      enabled: true, icon: "repair",
      title: "Computer Repair & Services",
      text: "Help with laptops and desktops that are not working as they should — from start-up problems to hardware and software faults.",
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about computer repair & services."
    },
    {
      enabled: true, icon: "support",
      title: "IT Consulting & Support",
      text: "Practical technical guidance for individuals, students, professionals and small businesses on everyday IT needs.",
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about IT consulting & support."
    },

    // ---- Suggested — awaiting owner confirmation (hidden) ----
    { enabled: false, icon: "laptop",   title: "Laptop Troubleshooting",              text: "Diagnosis of laptop issues such as start-up, battery, heating or performance problems." },
    { enabled: false, icon: "desktop",  title: "Desktop Troubleshooting",             text: "Diagnosis of desktop PC issues, from power and boot problems to slow performance." },
    { enabled: false, icon: "chip",     title: "Hardware Repair & Upgrades",          text: "Assistance with replacing or upgrading components such as memory and storage." },
    { enabled: false, icon: "software", title: "Operating System & Software Support", text: "Help with operating system installation, updates and software problems." },
    { enabled: false, icon: "screen",   title: "Screen & Keyboard Replacement",       text: "Replacement of damaged laptop screens and keyboards." },
    { enabled: false, icon: "printer",  title: "Printer & Peripheral Support",        text: "Set-up and troubleshooting for printers and other peripherals." },
    { enabled: false, icon: "wifi",     title: "Network & Wi-Fi Assistance",         text: "Help with home and small-office network and Wi-Fi connectivity." },
    { enabled: false, icon: "backup",   title: "Data Backup & Recovery",              text: "Assistance with backing up data and attempting recovery from storage devices." }
  ],

  // "Having Trouble With Your Computer?" — each opens WhatsApp with a prefilled message.
  problems: [
    { icon: "slow",     label: "Computer running slowly",   message: "my computer is running slowly." },
    { icon: "power",    label: "Laptop not starting",       message: "my laptop is not starting." },
    { icon: "shutdown", label: "Unexpected system shutdown", message: "my computer shuts down unexpectedly." },
    { icon: "screen",   label: "Display problems",          message: "I am having display problems." },
    { icon: "keyboard", label: "Keyboard or hardware problems", message: "I am having keyboard or hardware problems." },
    { icon: "software", label: "Software issues",           message: "I am having software issues." },
    { icon: "help",     label: "Other technical problems",  message: "I have a technical problem with my computer." }
  ]
};
