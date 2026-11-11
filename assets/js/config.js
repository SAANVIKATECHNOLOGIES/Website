/*
 * SAANVIKA TECHNOLOGIES — site configuration
 * ------------------------------------------------------------------
 * Official configuration for SAANVIKA TECHNOLOGIES:
 * Sales, Service and Maintenance across Greater Visakhapatnam & Andhra Pradesh.
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
    mapsEmbedQuery: "SAANVIKA TECHNOLOGIES, Chandrampalem, Madhurawada, Visakhapatnam 530041"
  },

  contact: {
    phone:    { enabled: true,  display: "+91 88863 33367", tel: "+918886333367" },
    whatsapp: { enabled: true,  number: "918886333367" },
    email:    { enabled: false, address: "" },
    hours:    { enabled: false, lines: [] }
  },

  defaultMessage: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about your IT hardware and technical services.",

  /*
   * Services Catalog:
   * Explicitly covering Sales, Service/Repairs, and Maintenance/AMC across all categories.
   */
  services: [
    {
      id: "desktop-laptop",
      enabled: true,
      category: "computers",
      categoryName: "Computers & Laptops",
      icon: "laptop",
      image: "assets/img/services/desktop-laptop-services.jpg",
      pageUrl: "services/desktop-laptop-services.html",
      title: "Desktops, Laptops & Workstations",
      tagline: "Sales, Component-Level Repair & Maintenance",
      badges: ["Sales", "Service", "AMC"],
      text: "Authorized branded PCs (Dell, HP, Lenovo), high-performance workstations, new & certified laptops, chip-level motherboard service, screen/battery replacement, and corporate AMCs.",
      highlights: [
        "New & custom PC/workstation sales",
        "Screen, keyboard, battery & hinge replacements",
        "SSD/RAM performance upgrades & OS setup",
        "Preventative maintenance & thermal cleaning"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about Desktop and Laptop sales, service, or AMC."
    },
    {
      id: "cctv-surveillance",
      enabled: true,
      category: "security",
      categoryName: "Security & Surveillance",
      icon: "repair",
      image: "assets/img/services/cctv-surveillance-systems.jpg",
      pageUrl: "services/cctv-surveillance-systems.html",
      title: "CCTV & Video Surveillance Systems",
      tagline: "HD/IP Cameras, NVR/DVR Setup & AMC Support",
      badges: ["Sales", "Service", "AMC"],
      text: "End-to-end electronic surveillance for offices, schools, retail stores, and residential societies. High-definition dome, bullet, and PTZ cameras with mobile live streaming.",
      highlights: [
        "HD Analog, IP & 4K PTZ security camera sales",
        "Complete installation, structured cabling & NVR/DVR setup",
        "Remote smartphone live streaming & playback config",
        "Surveillance AMC, camera cleaning & hard drive monitoring"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about CCTV Surveillance installation, service, or AMC."
    },
    {
      id: "biometrics-access",
      enabled: true,
      category: "security",
      categoryName: "Security & Access",
      icon: "user",
      image: "assets/img/services/biometrics-access-control.jpg",
      pageUrl: "services/biometrics-access-control.html",
      title: "Biometrics & Access Control Systems",
      tagline: "Time Attendance, Facial Recognition & EM Locks",
      badges: ["Sales", "Service", "AMC"],
      text: "Automated attendance tracking and high-security access control. Fingerprint readers, AI face recognition terminals, magnetic EM door locks, and cloud software integration.",
      highlights: [
        "Biometric time-attendance & facial recognition sales",
        "Magnetic EM door lock & card access installation",
        "Payroll & HR attendance software setup",
        "Database sync, sensor calibration & annual maintenance"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about Biometric Attendance and Access Control systems."
    },
    {
      id: "networking-wifi",
      enabled: true,
      category: "networking",
      categoryName: "Networking & Telecom",
      icon: "wifi",
      image: "assets/img/services/networking-wifi-solutions.jpg",
      pageUrl: "services/networking-wifi-solutions.html",
      title: "Networking, Wi-Fi 6 & Structured Cabling",
      tagline: "Gigabit LAN, Commercial Mesh & Rack Dressing",
      badges: ["Sales", "Service", "AMC"],
      text: "Enterprise-grade wired and wireless network infrastructure. Structured CAT6/Fiber optic cabling, managed gigabit switches, commercial Wi-Fi 6 mesh, and rack management.",
      highlights: [
        "Commercial routers, gigabit switches & access point sales",
        "Structured CAT6 / Optical Fiber cabling & termination",
        "Zero-deadzone office & apartment Wi-Fi 6 coverage",
        "Network troubleshooting, rack dressing & bandwidth tuning"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about Office Networking and Wi-Fi setup or service."
    },
    {
      id: "intranet-servers",
      enabled: true,
      category: "enterprise",
      categoryName: "Servers & Storage",
      icon: "backup",
      image: "assets/img/services/intranet-servers-storage.jpg",
      pageUrl: "services/intranet-servers-storage.html",
      title: "Intranet Setup, Local Servers & Storage",
      tagline: "Local File Servers, NAS Storage & Data Recovery",
      badges: ["Sales", "Service", "AMC"],
      text: "Secure local enterprise intranet solutions, local file sharing servers, Network Attached Storage (NAS) configurations, automated backups, and emergency data recovery.",
      highlights: [
        "Office tower servers & high-capacity NAS hardware sales",
        "Internal intranet portal & local shared drive setup",
        "RAID configuration & automated offline backup routines",
        "Data recovery from damaged hard drives, SSDs & flash media"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about Intranet setup, Local Servers, or Data Recovery."
    },
    {
      id: "intercom-epabx",
      enabled: true,
      category: "networking",
      categoryName: "Networking & Telecom",
      icon: "chat",
      image: "assets/img/services/intercom-epabx-systems.jpg",
      pageUrl: "services/intercom-epabx-systems.html",
      title: "Intercom & EPABX Telecom Systems",
      tagline: "IP-PBX, Multi-Apartment Intercom & Video Phones",
      badges: ["Sales", "Service", "AMC"],
      text: "Seamless internal communication systems for corporate offices, commercial complexes, and multi-flat apartment societies. IP-PBX, analog EPABX, and video door intercoms.",
      highlights: [
        "EPABX systems, IP-PBX consoles & intercom station sales",
        "Multi-line extension cabling & wall socket wiring",
        "Apartment security gate-to-flat intercom connectivity",
        "Periodic line testing, troubleshooting & telecom AMC"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about Intercom and EPABX Telecom installation or repair."
    },
    {
      id: "printers-peripherals",
      enabled: true,
      category: "computers",
      categoryName: "Printers & Peripherals",
      icon: "printer",
      image: "assets/img/services/printers-peripherals.jpg",
      pageUrl: "services/printers-peripherals.html",
      title: "Printers, Scanners & POS Peripherals",
      tagline: "LaserJet/InkTank Sales, Logic Board Fix & Refills",
      badges: ["Sales", "Service", "AMC"],
      text: "Complete printing and POS peripheral solutions for offices, clinics, retail stores, and home setups. Sales, troubleshooting, toner refilling, and roller servicing.",
      highlights: [
        "Multifunction laser, inktank & thermal POS printer sales",
        "Paper jam resolution, head cleaning & logic board repairs",
        "High-yield toner cartridge supply & refilling",
        "Office printer fleet AMC & preventative roller lubrication"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about Printer sales, repairs, or toner cartridge services."
    },
    {
      id: "firewalls-power",
      enabled: true,
      category: "enterprise",
      categoryName: "Cybersecurity & Power",
      icon: "chip",
      image: "assets/img/services/firewalls-server-racks-power.jpg",
      pageUrl: "services/firewalls-server-racks-power.html",
      title: "Firewalls, Server Racks & Online UPS",
      tagline: "Cybersecurity Appliances, 4U-42U Racks & Power Backup",
      badges: ["Sales", "Service", "AMC"],
      text: "Robust physical and digital protection for your critical IT backbone. Hardware network firewalls, custom server rack enclosures, cable management, and Online UPS systems.",
      highlights: [
        "Hardware firewall & industrial Online UPS sales",
        "4U to 42U server rack mounting & neat cable dressing",
        "Firewall rule deployment, VPN setup & threat protection",
        "UPS battery health testing, load audits & power AMC"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about Network Firewalls, Server Racks, or Online UPS solutions."
    },
    {
      id: "it-amc",
      enabled: true,
      category: "enterprise",
      categoryName: "Enterprise Maintenance",
      icon: "support",
      image: "assets/img/services/it-amc-maintenance.jpg",
      pageUrl: "services/it-amc-maintenance.html",
      title: "Annual Maintenance Contracts (IT AMC)",
      tagline: "Comprehensive & Non-Comprehensive Support Plans",
      badges: ["Sales", "Service", "AMC"],
      text: "Proactive, reliable IT infrastructure maintenance for corporate offices, IT companies, educational institutions, healthcare centers, and residential communities.",
      highlights: [
        "Tailored Comprehensive (with parts) & Non-Comprehensive plans",
        "Guaranteed on-call engineer dispatch & priority response",
        "Scheduled monthly hardware dusting, thermal checks & health logs",
        "Full coverage: PCs, Laptops, Printers, CCTV, LAN & Servers"
      ],
      message: "Hello SAANVIKA TECHNOLOGIES, I would like to enquire about an Annual Maintenance Contract (AMC) for our premises."
    }
  ],

  /*
   * Localized Coverage Areas (SEO & GEO Targeted)
   */
  coverage: {
    primaryCity: "Visakhapatnam",
    primaryHub: "Madhurawada",
    vizagAreas: [
      "Madhurawada (HQ)",
      "Rushikonda (IT SEZ Hills 1, 2 & 3)",
      "Brandix India Apparel City (Atchutapuram)",
      "PM Palem (Pothinamallayya Palem)",
      "Kommadi",
      "Chandrampalem & Srinivasa Nagar",
      "Yendada",
      "MVP Colony",
      "Siripuram",
      "Dwaraka Nagar",
      "Daba Gardens",
      "Asilmetta",
      "Gajuwaka Industrial Zone",
      "Kurmannapalem",
      "Auto Nagar",
      "Sheela Nagar",
      "Pendurthi",
      "Gopalapatnam",
      "Marripalem & NAD Kotha Road",
      "Seethammadhara",
      "Akkayyapalem",
      "Waltair Uplands & Beach Road",
      "Gambheeram SEZ",
      "Bhimili (Bheemunipatnam)"
    ],
    andhraPradeshCities: [
      "Visakhapatnam",
      "Vizianagaram",
      "Srikakulam",
      "Rajahmundry (Rajamahendravaram)",
      "Kakinada",
      "Paderu",
      "Araku Valley",
      "Anakapalle",
      "Payakaraopeta",
      "Tuni"
    ]
  },

  /*
   * Trouble With Your Tech? - One-Touch WhatsApp Diagnostics
   */
  problems: [
    { icon: "slow",     label: "Computer / Laptop running slowly", message: "my computer is running very slowly." },
    { icon: "power",    label: "Desktop / Laptop not turning on",  message: "my computer is not starting or powering on." },
    { icon: "repair",   label: "CCTV camera offline or not recording", message: "my CCTV cameras are offline or not recording video." },
    { icon: "user",     label: "Biometric machine attendance sync error", message: "my biometric machine is not syncing attendance logs." },
    { icon: "printer",  label: "Printer paper jam / toner empty",  message: "I am having printer paper jam or cartridge printing issues." },
    { icon: "wifi",     label: "Office Wi-Fi or LAN connection down", message: "our office network / Wi-Fi connection is down." },
    { icon: "chat",     label: "Intercom line dead / no dial tone", message: "our intercom / EPABX phone line has no dial tone." },
    { icon: "backup",   label: "Hard drive failure / Data recovery needed", message: "I need urgent data recovery from a damaged hard drive." },
    { icon: "chip",     label: "Server rack / Firewall / UPS power issue", message: "we have an issue with our server rack, firewall, or UPS backup." },
    { icon: "support",  label: "Need Annual Maintenance Contract (AMC)", message: "we would like to discuss an IT AMC maintenance contract for our office." }
  ]
};
