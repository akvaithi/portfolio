import { HEROES } from "./heroes";

export type Project = {
  slug: string;
  title: string;
  role: string;
  org: string;
  location: string;
  period: string;
  scale: "molecular" | "digital" | "creative";
  tagline: string;
  body: string[];
  stack: string[];
  metrics?: { label: string; value: string }[];
  heroes: { src: string; isVideo: boolean }[];
  link?: { label: string; href: string };
  // "photo" (default) crops to fill (object-cover) — right for camera shots.
  // "screenshot" contains the full frame inside a framed window so cropped
  // UI text doesn't read as a mistake.
  displayMode?: "photo" | "screenshot";
  screenshotBg?: "cream" | "ink";
};

const H = HEROES;

export const PROJECTS: Project[] = [
  {
    slug: "rov-control-systems",
    title: "Closed-Loop Stabilization for an Underwater ROV",
    role: "Control Systems Engineering Lead",
    org: "Oceanus ThinkTank · MATE ROV",
    location: "College Station, TX",
    period: "May 2025 — Present",
    scale: "digital",
    tagline:
      "A 6-DOF PID feedback loop on a Raspberry Pi 5 + Blue Robotics Navigator stack — stabilizing a vehicle in dynamic fluid, streaming RTSP video for live photogrammetry.",
    body: [
      "Engineered a closed-loop PID control system in Python over ArduSub firmware to maintain attitude and depth under turbulent flow.",
      "Architected the Distributed Control System: a Raspberry Pi 5 paired with a Blue Robotics Navigator flight controller, handling 6-DOF IMU telemetry and thruster output across a tethered Ethernet link.",
      "Conducted a techno-economic trade study selecting a high-bandwidth SBC architecture to support photogrammetry and turbidity sensing requirements.",
      "Built a live computer-vision tool that ingests an underwater RTSP feed and feeds variance-thresholded frames into Apple RealityKit for high-fidelity 3D scene reconstruction.",
    ],
    stack: [
      "Python",
      "ArduSub",
      "Raspberry Pi 5",
      "BR Navigator",
      "PID",
      "RealityKit",
      "OpenCV",
      "RTSP",
    ],
    metrics: [
      { label: "DOF stabilized", value: "6" },
      { label: "Control loop", value: "PID" },
      { label: "Vision pipeline", value: "RTSP → RealityKit" },
    ],
    heroes: H["ThinkTank"]?.filter((a) => !a.isVideo).slice(0, 5) ?? [],
  },
  {
    slug: "aggie-research-finder",
    title: "Aggie Research Finder",
    role: "Project Co-founder",
    org: "Independent",
    location: "College Station, TX",
    period: "January 2026 — Present",
    scale: "digital",
    tagline:
      "A discovery engine indexing 1,770+ Texas A&M faculty profiles, scaled to 3,000+ active users — built to remove friction from undergraduate research matching.",
    body: [
      "Architected and deployed a centralized faculty index spanning 20+ departments, with multi-attribute filtering tuned for the way undergrads actually search.",
      "Engineered the querying logic to parse research interests and instantly surface relevant labs by discipline, technique, or keyword.",
      "Scaled the platform from internal alpha to 3,000+ active users within the first semester.",
    ],
    stack: ["Next.js", "Firebase", "Edge functions", "TypeScript", "Search index"],
    metrics: [
      { label: "Faculty indexed", value: "1,770+" },
      { label: "Active users", value: "3,000+" },
      { label: "Departments", value: "20+" },
    ],
    heroes: H["Aggie Reseach Finder"] ?? [],
    link: { label: "aggie-research-finder.vercel.app", href: "#" },
    displayMode: "screenshot",
    screenshotBg: "cream",
  },
  {
    slug: "petroleum-coke-graphite",
    title: "Petroleum Coke → Battery-Grade Graphite",
    role: "Undergraduate Researcher",
    org: "Texas A&M College of Engineering",
    location: "College Station, TX",
    period: "February 2026 — Present",
    scale: "molecular",
    tagline:
      "Catalytic conversion of waste petroleum coke into anode-grade graphite — high-energy ball milling, iron-catalyzed graphitization in a 1,600°C tube furnace, structurally validated via XRD.",
    body: [
      "Investigating low-cost, sustainable pathways from refinery byproduct to battery-grade graphite anode material.",
      "Executing material synthesis through high-energy ball milling and iron-catalyst integration, then driving graphitization in high-temperature tube furnaces.",
      "Characterizing synthesized samples with X-ray Diffraction (XRD) to quantify crystallinity and validate degree of graphitization.",
    ],
    stack: [
      "Tube furnace (1600°C)",
      "Ball milling",
      "Fe catalyst",
      "XRD",
      "Materials synthesis",
    ],
    metrics: [
      { label: "Max temp", value: "1,600 °C" },
      { label: "Validation", value: "X-Ray Diffraction" },
      { label: "Domain", value: "Energy storage" },
    ],
    // Lab imagery is withheld pending publication; a schematic stand-in is
    // used in its place.
    heroes:
      H["Research"]?.slice(0, 5) ?? [
        { src: "/images/stock/graphite.svg", isVideo: false, name: "graphite.svg" },
      ],
  },
  {
    slug: "tube-furnace-calculator",
    title: "Tube Furnace Program Calculator",
    role: "Lead Developer & Creator",
    org: "Internal Lab Tooling",
    location: "College Station, TX",
    period: "May 2026",
    scale: "digital",
    tagline:
      "A single-page app that maps complex multi-stage thermal profiles up to 1,600°C — ramps, holds, preheats, soak, and cooling markers — eliminating manual programming error.",
    body: [
      "Built a logic-driven mathematical interface that dynamically generates precise setpoint tables from user-defined ramp rates, preheat hold durations, and cooling markers.",
      "Eliminated manual configuration error for laboratory personnel, ensuring reproducible furnace programming and high-fidelity thermal cycles for critical research experiments.",
      "Deployed on Vercel; used daily by lab researchers.",
    ],
    stack: ["TypeScript", "React", "Vercel"],
    metrics: [
      { label: "Max profile", value: "1,600 °C" },
      { label: "Profile type", value: "Multi-stage C/T" },
      { label: "Deployment", value: "Vercel" },
    ],
    heroes: H["Tube Furnace"] ?? [],
    link: { label: "tube-furnace-calculator.vercel.app", href: "#" },
    displayMode: "screenshot",
    screenshotBg: "ink",
  },
  {
    slug: "exxon-safety-interlock",
    title: "ExxonMobil Engineered-for-Safety Interlock",
    role: "Team Lead — Aggies Invent",
    org: "Texas A&M, Meloy Program",
    location: "College Station, TX",
    period: "November 2025",
    scale: "molecular",
    tagline:
      "A SIL-rated safety interlock using Two-out-of-Two voting logic and SAE J1939 to prevent struck-by incidents in hazardous-location upstream and downstream environments. 3rd Place Overall.",
    body: [
      "Designed a SIL-rated safety interlock leveraging Two-out-of-Two (2oo2) voting logic and ISO 13849-1 standards to prevent struck-by incidents in high-risk zones.",
      "Engineered a hardware-agnostic E-stop integration over SAE J1939, with Edge AI and Ultra-Wideband (UWB) proximity sensors triggering automatic shutdowns on dynamic buffer-zone breach.",
      "Scaled deployment strategy across Upstream (mobile magnet-mount) and Downstream (fixed network) infrastructures, addressing HazLoc constraints throughout.",
    ],
    stack: [
      "SIL rating",
      "ISO 13849-1",
      "SAE J1939",
      "Edge AI",
      "UWB proximity",
      "2oo2 logic",
    ],
    metrics: [
      { label: "Placement", value: "3rd Overall" },
      { label: "Logic", value: "2oo2 SIL" },
      { label: "Environments", value: "Up + Downstream" },
    ],
    heroes: H["Aggies Invent"]?.filter((a) => !a.isVideo).slice(0, 6) ?? [],
  },
  {
    slug: "sec-ignite-ache",
    title: "SEC Ignite — Air-Cooled Heat Exchanger Safety",
    role: "Engineering Design Lead",
    org: "Texas A&M · Chart Industries Challenge",
    location: "Texas A&M, College Station",
    period: "October 2025",
    scale: "molecular",
    tagline:
      "A comprehensive safety solution for Chart Industries' Air-Cooled Heat Exchanger systems: redesigned fail-safes, codified risk mitigation. 2nd Place Overall.",
    body: [
      "Developed an end-to-end safety architecture addressing the failure modes specific to ACHE systems at process scale.",
      "Codified fail-safe enhancements and a layered risk-mitigation strategy informed by LOPA-style review.",
    ],
    stack: ["LOPA", "HAZOP-style review", "ACHE process safety"],
    metrics: [
      { label: "Placement", value: "2nd Overall" },
      { label: "Domain", value: "ACHE process safety" },
    ],
    heroes: H["SEC Ignite"]?.filter((a) => !a.isVideo).slice(0, 6) ?? [],
  },
  {
    slug: "tex-e-fellow",
    title: "TEX-E Fellow — Greentown Labs",
    role: "Ecosystem Builders Committee Co-lead",
    org: "Texas Exchange for Energy & Climate Entrepreneurship",
    location: "Houston, TX",
    period: "May 2025 — May 2026",
    scale: "creative",
    tagline:
      "Bridging A&M research with early-stage climate-tech startups — carbon capture, hydrogen, low-carbon fuels — and translating dense process engineering into visual brand stories.",
    body: [
      "Co-lead the Ecosystem Builders Committee, organizing renewable-energy events and connecting students with industry leaders across the climate-tech corridor.",
      "Assessed early-stage technologies in carbon capture, hydrogen production, and low-carbon fuels for process feasibility and industrial scalability.",
      "Launched the TEX-E Instagram, scaling to 400+ followers by translating complex chem-E concepts into engaging bite-sized visual stories.",
    ],
    stack: [
      "CCS / DAC",
      "Hydrogen production",
      "Low-carbon fuels",
      "Brand storytelling",
    ],
    heroes: H["TEXE"] ?? [],
  },
  {
    slug: "aggies-in-tech",
    title: "Aggies in Tech — Silicon Valley Residency",
    role: "Program Cohort Member",
    org: "TAMU Mays Business School",
    location: "Bay Area, CA",
    period: "August 2025 — Present",
    scale: "creative",
    tagline:
      "A cross-disciplinary cohort bridging engineering with venture capital, technology commercialization, and corporate strategy — capped by an executive residency at Google, Meta, LinkedIn, Visa, and Perplexity.",
    body: [
      "Selected for a competitive cross-disciplinary cohort focused on technology commercialization, venture capital, and corporate strategy.",
      "Engaged directly with leadership and engineering teams at Google, Meta, LinkedIn, Visa, and Perplexity on emerging market trends.",
      "Collaborated with founders and GNC specialists to evaluate technical overlap between commercial drone software (5G architectures) and underwater robotics control systems.",
    ],
    stack: ["Venture capital", "Technology commercialization", "Strategy"],
    heroes: H["Aggies in Tech"] ?? [],
  },
];

export const EXPERIENCES = [
  {
    role: "Undergraduate Researcher",
    org: "Texas A&M College of Engineering",
    period: "Feb 2026 — Present",
    bullets: [
      "Catalytic conversion of petroleum coke into battery-grade graphite anode material.",
      "Material synthesis via high-energy ball milling + iron catalyst; tube-furnace graphitization.",
      "XRD characterization to validate crystallinity and graphitization degree.",
    ],
  },
  {
    role: "Control Systems Engineering Lead",
    org: "Oceanus ThinkTank · MATE ROV",
    period: "May 2025 — Present",
    bullets: [
      "Closed-loop PID control system on Pi 5 + BR Navigator for 6-DOF stability.",
      "Live RTSP photogrammetry pipeline into Apple RealityKit.",
      "Techno-economic SBC trade study to support sensing bandwidth requirements.",
    ],
  },
  {
    role: "Project Co-founder",
    org: "Aggie Research Finder",
    period: "Jan 2026 — Present",
    bullets: [
      "Architected and deployed a faculty discovery platform — 1,770 profiles, 3,000+ users.",
      "Multi-attribute query layer over the institutional dataset.",
    ],
  },
  {
    role: "Lead Developer & Creator",
    org: "Tube Furnace Program Calculator",
    period: "May 2026",
    bullets: [
      "Single-page app generating multi-stage thermal profiles up to 1,600°C.",
      "Deployed via Vercel; used daily by lab researchers.",
    ],
  },
  {
    role: "TEX-E Fellow — Ecosystem Builders Co-lead",
    org: "Greentown Labs",
    period: "May 2025 — May 2026",
    bullets: [
      "Assessed early-stage CCS, hydrogen, and low-carbon fuel technologies for feasibility.",
      "Grew TEX-E Instagram to 400+ followers translating chem-E into visual storytelling.",
    ],
  },
  {
    role: "Aggies Invent: ExxonMobil — Team Lead",
    org: "Texas A&M, Meloy Program",
    period: "November 2025",
    bullets: [
      "3rd Place Overall — SIL-rated 2oo2 safety interlock with SAE J1939 + UWB Edge AI.",
    ],
  },
  {
    role: "SEC Ignite Engineering Design Competition",
    org: "Texas A&M · Chart Industries Challenge",
    period: "October 2025",
    bullets: [
      "2nd Place Overall — fail-safes & risk mitigation for ACHE systems.",
    ],
  },
  {
    role: "IT Support Intern — Kyle Field",
    org: "Texas A&M Athletics",
    period: "Aug 2024 — May 2025",
    bullets: [
      "Managed 350+ POS systems (200+ Oracle MICROS, 150+ enterprise iPads) across a 102k-capacity stadium.",
      "100% uptime through high-traffic SEC game days.",
    ],
  },
  {
    role: "PVFA Student Videographer",
    org: "TAMU School of Performance, Visualization & Fine Arts",
    period: "Aug 2025 — Jan 2026",
    bullets: [
      "Camera operation, lighting, and post for university performances and editorial coverage.",
    ],
  },
  {
    role: "ML Predictive Modeling Developer",
    org: "TAMUHack",
    period: "September 2024",
    bullets: [
      "TensorFlow neural net in Python predicting horse-race placements; live JS web app inference.",
    ],
  },
];

export const AWARDS = [
  "3rd Place Overall — Aggies Invent: ExxonMobil Engineered for Safety, 2025",
  "2nd Place Overall — SEC Ignite Engineering Design (Chart Industries), 2025",
  "Dean's List — Texas A&M University",
  "Chemical Engineering Department Scholarship",
  "Lechner Scholarship",
  "Aggies in Tech Scholarship",
  "FRC World Championship — 3 consecutive years, Pearadox FRC 5414",
];

export const SKILLS = {
  "Process / Engineering": [
    "Aspen HYSYS",
    "LOPA",
    "HAZOP",
    "SIL assessment",
    "PID loop tuning",
    "DCS architecture",
    "SAE J1939",
    "LabView",
    "Autodesk Fusion 360",
  ],
  Languages: ["Python", "Java", "C++", "TypeScript / JS", "HTML / CSS", "VBA"],
  "Libraries / Frameworks": [
    "TensorFlow",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "React",
    "OpenCV",
    "WPILib",
  ],
  "Software / Tools": [
    "Linux / Unix",
    "Git",
    "Docker",
    "Google Cloud Platform",
    "Firebase",
    "Adobe Creative Cloud",
  ],
};
