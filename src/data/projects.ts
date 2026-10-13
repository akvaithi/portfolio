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

// Copy here follows the master résumé and the honest-scope rules in Synth
// (CONTEXT.md / RECORD.md / PROJECTS.md). Before editing:
//   - ROV control is bench-tuned and validated in simulation, not water-tested.
//   - Aggies Invent and SEC Ignite were design-and-pitch competitions:
//     "designed" or "proposed", never "built" or "engineered".
//   - STEM Research Finder (formerly Aggie Research Finder) is co-founded, not solely authored.
//   - Graphitization results (DG at given conditions, additive ratios, run
//     masses, kiln parameters) are under NDA / patent hold. Methods only.
export const PROJECTS: Project[] = [
  {
    slug: "petroleum-coke-graphite",
    title: "Petroleum Coke → Battery-Grade Graphite",
    role: "Undergraduate Researcher, Green Lab",
    org: "Artie McFerrin Dept. of Chemical Engineering, Texas A&M",
    location: "College Station, TX",
    period: "February 2026 — Present",
    scale: "molecular",
    tagline:
      "Catalytic graphitization of refinery petroleum coke into battery-grade anode graphite, at temperatures well below the industrial baseline. An ARPA-E project with the DOE National Energy Technology Laboratory and Oxbow Carbon.",
    body: [
      "Run the synthesis route end to end: ball milling and sieving the coke, catalyst mixing, pellet pressing, tube-furnace graphitization, and acid washing to strip residual iron.",
      "My part of the project is the lower-temperature, shorter-hold side: parameter studies across temperature, hold time, catalyst and additive loading, and pellet geometry.",
      "Characterize samples by X-ray diffraction myself (RPD-Research certified, XRD facility trained).",
      "Built the XRD Degree-of-Graphitization Analyzer: Pseudo-Voigt (002) deconvolution, Bragg d-spacing, and Maire–Mering analysis, replacing the lab's manual peak fit. It agrees with expert hand fits to within about 1%, and the lab adopted it as its source of DG values.",
      "Modeled industrial calciner residence time and compared roller compaction and briquetting as binder-free pellet-forming routes for scale-up.",
      "Specific results stay off this page while the group's patent process runs.",
    ],
    stack: [
      "Tube furnace (1600 °C)",
      "Ball milling",
      "Fe catalyst",
      "XRD",
      "Python · SciPy",
      "Docker",
    ],
    metrics: [
      { label: "Funding", value: "ARPA-E" },
      { label: "Characterization", value: "XRD" },
      { label: "Furnace", value: "to 1,600 °C" },
    ],
    // Lab imagery is withheld pending the patent process; a schematic stand-in
    // is used in its place.
    heroes:
      H["Research"]?.slice(0, 5) ?? [
        { src: "/images/stock/graphite.svg", isVideo: false, name: "graphite.svg" },
      ],
    link: {
      label: "xrd.akvaithi.page",
      href: "https://xrd.akvaithi.page",
    },
  },
  {
    slug: "stem-research-finder",
    title: "STEM Research Finder",
    role: "Co-Founder",
    org: "STEM Research Finder",
    location: "College Station, TX",
    period: "January 2026 — Present",
    scale: "digital",
    tagline:
      "A research-discovery platform that matches students to faculty by research interest. It started as the Aggie Research Finder at Texas A&M and now covers 7,864 STEM faculty across 8 universities, with 3,000+ users.",
    body: [
      "Co-founded the platform: upload a résumé, enter research interests, and get matched to faculty by where you want to go rather than where you have been, with an outreach email drafted in one click.",
      "Grew it from a Texas A&M tool into a multi-tenant platform with per-school branding: Texas A&M, Rice, UT Austin, UT Dallas, MIT, Harvard, Michigan, and UCLA.",
      "Faculty profiles come from per-school crawlers; matching runs on a FastAPI backend with the Claude API.",
    ],
    stack: [
      "Python",
      "Playwright",
      "FastAPI",
      "SQLAlchemy",
      "Claude API",
      "React",
      "Tailwind",
    ],
    metrics: [
      { label: "Faculty indexed", value: "7,864" },
      { label: "Users", value: "3,000+" },
      { label: "Universities", value: "8" },
    ],
    heroes: H["Aggie Reseach Finder"] ?? [],
    link: {
      label: "stemresearchfinder.tech",
      href: "https://stemresearchfinder.tech",
    },
    displayMode: "screenshot",
    screenshotBg: "cream",
  },
  {
    slug: "rov-control-systems",
    title: "Guidance and Control for an Underwater ROV",
    role: "Engineering Lead, Guidance & Control Subteam",
    org: "Oceanus ThinkTank · MATE ROV Competition Team",
    location: "College Station, TX",
    period: "May 2025 — Present",
    scale: "digital",
    tagline:
      "Control software for an 8-thruster, 6-DOF ROV on a Raspberry Pi 5 and Blue Robotics Navigator. The PID loop is bench-tuned and validated in simulation ahead of water testing.",
    body: [
      "Lead a 3-person subteam (one of five on the vehicle) that owns the control software, the ArduSub simulation, and photogrammetry.",
      "Designed the onboard architecture around 6-DOF inertial data and thruster output, and validated a bench-tuned PID attitude loop in a 6-DOF ArduSub SITL simulation before hardware.",
      "Ran a single-board-computer trade study weighing cost, thermal load, and throughput against payload bandwidth for photogrammetry and turbidity sensing.",
      "Built Photogrammetry Studio, a desktop app that passes frames from the live RTSP feed through sharpness, novelty, and framing gates, then reconstructs a textured 3D mesh with Apple Object Capture on macOS.",
    ],
    stack: [
      "Python",
      "ArduSub",
      "SITL",
      "Raspberry Pi 5",
      "BR Navigator",
      "PID",
      "PyQt6",
      "OpenCV",
      "RealityKit",
    ],
    metrics: [
      { label: "Degrees of freedom", value: "6" },
      { label: "Control loop", value: "PID" },
      { label: "Validation", value: "SITL sim" },
    ],
    heroes: H["ThinkTank"]?.filter((a) => !a.isVideo).slice(0, 5) ?? [],
  },
  {
    slug: "tube-furnace-calculator",
    title: "Tube Furnace Program Calculator",
    role: "Creator",
    org: "Green Lab bench tooling",
    location: "College Station, TX",
    period: "April 2026",
    scale: "digital",
    tagline:
      "A small web app that turns a target temperature and hold time into the furnace's setpoint table, so programs stop being worked out by hand.",
    body: [
      "Generates the temperature/time setpoint pairs for the lab's tube furnace: 5 °C/min ramps, the required 20-minute preheat holds at 300, 800, and 1,200 °C, up to 1,600 °C, and a programmed cool to 500 °C before natural cooling.",
      "Built for my own bench work in the Green Lab, to take arithmetic errors out of furnace programming and make runs reproducible.",
      "Static HTML and JavaScript, deployed on Vercel.",
    ],
    stack: ["HTML", "JavaScript", "Vercel"],
    metrics: [
      { label: "Max temp", value: "1,600 °C" },
      { label: "Ramp", value: "5 °C/min" },
      { label: "Deployment", value: "Vercel" },
    ],
    heroes: H["Tube Furnace"] ?? [],
    link: {
      label: "tube-furnace-calculator.vercel.app",
      href: "https://tube-furnace-calculator.vercel.app",
    },
    displayMode: "screenshot",
    screenshotBg: "ink",
  },
  {
    slug: "exxon-safety-interlock",
    title: "Operation Halo: Struck-By Prevention Interlock",
    role: "Team Lead",
    org: "Aggies Invent: ExxonMobil Engineered for Safety",
    location: "College Station, TX",
    period: "November 2025",
    scale: "digital",
    tagline:
      "A 48-hour design sprint on keeping people out of the path of heavy mobile equipment. Our proposal placed 3rd overall.",
    body: [
      "Led the team through a 48-hour design sprint on human-presence detection around cranes, forklifts, excavators, and oilfield trucks.",
      "Proposed a two-stage warning and critical buffer zone from ultra-wideband hard-hat tags fused with AI cameras, tied into the equipment's existing E-stop over SAE J1939 so rental fleets need no modification.",
      "Scoped the interlock for SIL-rated, hazardous-location service using two-out-of-two voting and ISO 13849-1, with separate deployment cases for upstream and downstream sites.",
    ],
    stack: [
      "SIL rating",
      "ISO 13849-1",
      "SAE J1939",
      "UWB proximity",
      "2oo2 logic",
    ],
    metrics: [
      { label: "Placement", value: "3rd Overall" },
      { label: "Sprint", value: "48 hours" },
      { label: "Sites", value: "Up + Downstream" },
    ],
    heroes: H["Aggies Invent"]?.filter((a) => !a.isVideo).slice(0, 6) ?? [],
  },
  {
    slug: "sec-ignite-ache",
    title: "SEC Ignite: Air-Cooled Heat Exchanger Safety",
    role: "Design Competition",
    org: "Student Engineers' Council · Chart Industries challenge",
    location: "College Station, TX",
    period: "October 2025",
    scale: "digital",
    tagline:
      "Fail-safes and risk mitigation for Chart Industries' air-cooled heat exchanger (ACHE) systems. A design-and-pitch competition; our proposal placed 2nd overall.",
    body: [
      "Proposed fail-safe enhancements organized around the failure modes specific to air-cooled exchangers in process service.",
      "Framed the mitigation as layers of protection, in the style of a LOPA review.",
    ],
    stack: ["LOPA", "HAZOP", "ACHE process safety"],
    metrics: [
      { label: "Placement", value: "2nd Overall" },
      { label: "Domain", value: "Process safety" },
    ],
    heroes: H["SEC Ignite"]?.filter((a) => !a.isVideo).slice(0, 6) ?? [],
  },
  {
    slug: "tex-e-fellow",
    title: "TEX-E Fellow at Greentown Labs",
    role: "Fellow · Ecosystem Builders Committee Co-Lead",
    org: "Texas Exchange for Energy & Climate Entrepreneurship",
    location: "Houston, TX",
    period: "May 2025 — May 2026",
    scale: "creative",
    tagline:
      "A year evaluating early-stage climate technologies and co-leading the committee that ran TEX-E's events across four partner universities.",
    body: [
      "Assessed early-stage carbon capture, hydrogen, and low-carbon fuel technologies for process feasibility and scalability, presenting to fellows and industry practitioners.",
      "Co-led the Ecosystem Builders Committee across four partner universities, organizing energy-transition events.",
      "Wrote TEX-E's Instagram content and engagement strategy, including live coverage from CERAWeek, and grew the account past 400 followers.",
    ],
    stack: [
      "Carbon capture",
      "Hydrogen",
      "Low-carbon fuels",
      "Content strategy",
    ],
    heroes: H["TEXE"] ?? [],
  },
  {
    slug: "aggies-in-tech",
    title: "Aggies in Tech",
    role: "Cohort Member, one of 40",
    org: "Mays Business School, Texas A&M",
    location: "College Station, TX · Bay Area, CA",
    period: "August 2025 — Present",
    scale: "creative",
    tagline:
      "A 40-student cohort on technology commercialization, venture capital, and corporate strategy. Spring 2026 included a Bay Area trip to LinkedIn, Google, Meta, Perplexity, Roku, and Visa.",
    body: [
      "Selected as one of 40 students for the cohort; completing the Aggies in Tech Business & Technology Certificate.",
      "Visited LinkedIn, Google, Meta, Perplexity, Roku, Visa, and the Computer History Museum on the Spring 2026 Bay Area trip, funded by the Aggies in Tech West Coast Scholarship.",
    ],
    stack: ["Venture capital", "Technology commercialization", "Strategy"],
    // Lead with the Meta-Silicon-Valley group shot — strongest visual,
    // immediately recognizable. Other AiT photos stay available in the
    // carousel.
    heroes: (() => {
      const all = H["Aggies in Tech"] ?? [];
      const heroPick = all.find((a) => a.src.includes("1778885608481"));
      const rest = all.filter((a) => a !== heroPick);
      return heroPick ? [heroPick, ...rest] : all;
    })(),
  },
];

export const EXPERIENCES = [
  {
    role: "Undergraduate Researcher, Green Lab",
    org: "Artie McFerrin Dept. of Chemical Engineering, Texas A&M",
    period: "Feb 2026 — Present",
    bullets: [
      "Catalytic graphitization of petroleum coke into battery-grade anode graphite (ARPA-E, with NETL and Oxbow Carbon).",
      "Run synthesis end to end, from ball milling to tube-furnace graphitization and acid washing; characterize by XRD myself.",
      "Built the XRD analyzer the lab uses for degree of graphitization, and a furnace program calculator for bench work.",
    ],
  },
  {
    role: "Co-Founder",
    org: "STEM Research Finder (formerly Aggie Research Finder)",
    period: "Jan 2026 — Present",
    bullets: [
      "Co-founded a research-discovery platform; grew it to 3,000+ users.",
      "Expanded from Texas A&M to 8 universities and 7,864 STEM faculty.",
    ],
  },
  {
    role: "Engineering Lead, Guidance & Control Subteam",
    org: "Oceanus ThinkTank · MATE ROV Competition Team",
    period: "May 2025 — Present",
    bullets: [
      "Lead a 3-person subteam; PID attitude loop bench-tuned and validated in 6-DOF ArduSub simulation.",
      "Single-board-computer trade study against payload bandwidth; RTSP-to-3D photogrammetry app.",
    ],
  },
  {
    role: "Fellow · Ecosystem Builders Committee Co-Lead",
    org: "Texas Exchange for Energy & Climate Entrepreneurship, Greentown Labs",
    period: "May 2025 — May 2026",
    bullets: [
      "Assessed early-stage carbon capture, hydrogen, and low-carbon fuel technologies for feasibility and scalability.",
      "Co-led the committee across four partner universities; wrote the Instagram content strategy.",
    ],
  },
  {
    role: "Aggies Invent: ExxonMobil Engineered for Safety",
    org: "Team Lead · Operation Halo",
    period: "November 2025",
    bullets: [
      "3rd Place Overall. Proposed a UWB and AI-camera buffer zone tied into existing E-stops for heavy mobile equipment.",
    ],
  },
  {
    role: "SEC Ignite Engineering Design Competition",
    org: "Student Engineers' Council · Chart Industries challenge",
    period: "October 2025",
    bullets: [
      "2nd Place Overall. Proposed fail-safes and risk mitigation for air-cooled heat exchanger systems.",
    ],
  },
  {
    role: "Student Videographer",
    org: "TAMU School of Performance, Visualization & Fine Arts",
    period: "Aug 2025 — Jan 2026",
    bullets: [
      "Cinema cameras, audio, and lighting for university performances; color grading and multi-cam editing.",
    ],
  },
  {
    role: "IT Support Intern, Kyle Field",
    org: "Texas A&M Athletics",
    period: "Aug 2024 — May 2025",
    bullets: [
      "Supported 350+ point-of-sale systems (Oracle MICROS terminals and enterprise iPads) across a 102,000-seat stadium.",
    ],
  },
  {
    role: "HowdyHack 2024",
    org: "TAMUhack",
    period: "September 2024",
    bullets: [
      "Hackathon project: a TensorFlow neural network in Python predicting horse-race placements.",
    ],
  },
];

export const AWARDS = [
  "Phi Kappa Phi Gathright/Dean's Excellence Award, 2026",
  "Omega Chi Epsilon, Chemical Engineering Honor Society",
  "Lechner Scholar",
  "Dean's Honor Roll, College of Engineering: Spring 2025, Spring 2026",
  "$20K+ in university and departmental scholarships, including the Chevron USA Chemical Engineering Scholarship",
  "2nd Place Overall: Student Engineers' Council Ignite Design Competition (Chart Industries), 2025",
  "3rd Place Overall, Team Lead: Aggies Invent, ExxonMobil Engineered for Safety, 2025",
  "FRC World Championship, three consecutive seasons with Pearadox FRC 5414 (high school)",
];

export const SKILLS = {
  Materials: [
    "X-ray diffraction",
    "Degree-of-graphitization & crystallite-size analysis",
    "BET",
    "Particle size distribution",
    "Tube furnace",
    "Ball milling",
  ],
  "Process & Safety": [
    "Aspen HYSYS",
    "HAZOP",
    "LOPA",
    "SIL assessment",
    "Residence-time & kiln sizing",
    "Mass & energy balances",
  ],
  "Computational & Tools": [
    "Python",
    "NumPy",
    "SciPy",
    "Pandas",
    "Linux",
    "Git",
    "Docker",
    "OriginLab",
    "Fusion 360",
  ],
  Software: ["TypeScript / React", "Swift", "Java (WPILib)", "OpenCV"],
};
