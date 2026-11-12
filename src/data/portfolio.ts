export type Social = {
  label: string;
  handle: string;
  href: string;
};

export type Capability = {
  id: string;
  title: string;
  detail: string;
};

export type StackLayer = {
  index: string;
  name: string;
  summary: string;
  items: string[];
};

export type Principle = {
  title: string;
  detail: string;
};

export type SectionId =
  | "about"
  | "capabilities"
  | "stack"
  | "approach"
  | "contact"
  | "projects";

export const person = {
  firstName: "Anesa",
  lastName: "Fazliu",
  fullName: "Anesa Fazliu",
  title: "Full Stack Developer",
  email: "anesafazl@gmail.com",

  intro:
    "I develop full stack web applications, combining intuitive React interfaces with robust REST APIs, .NET Core MVC backend services, and MySQL databases to create seamless, scalable solutions.",

  introHighlights: ["React", "REST API", ".NET Core MVC", "MySQL"],
} as const;

export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "github.com/anesafazliu",
    href: "https://github.com/anesafazliu",
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/anesa-fazliu",
    href: "https://www.linkedin.com/in/anesa-fazliu",
  },
  {
    label: "Email",
    handle: person.email,
    href: `mailto:${person.email}`,
  },
];

export const about = {
  lead: "I work across the whole application, from the interface to the API underneath and the data model both of them depend on.",
  paragraphs: [
    "On the front end that means React applications written in TypeScript and built on a component architecture: reusable components, page layouts and navigation composed into one system rather than a pile of individual screens, holding their structure from a phone to a wide monitor.",
    "Behind the interface it means REST APIs consumed with Axios, C# and .NET Core MVC web services, Node.js, and MySQL underneath endpoints and data models designed alongside the screens that consume them.",
    "Working both ends changes the work itself. The contract gets agreed up front, endpoints get tested as they are built, and integration problems surface before release instead of after it.",
  ],
  facts: [
    {
      label: "Core stack",
      value: "React · TypeScript · .NET Core MVC · MySQL",
    },
    { label: "Works across", value: "Interface · API · Services · Data" },
  ],
} as const;

export const capabilities: Capability[] = [
  {
    id: "interfaces",
    title: "Interfaces built as systems",
    detail:
      "React applications on a component architecture, with reusable components, page layouts and navigation composed into a single consistent system. Responsive by default and consistent across screen sizes.",
  },
  {
    id: "integration",
    title: "Live data, handled properly",
    detail:
      "Interfaces wired to REST APIs with Axios: asynchronous requests, loading and error states, and the paths an application has to take when the network does not cooperate.",
  },
  {
    id: "services",
    title: "The services behind them",
    detail:
      "C#, .NET Core MVC and Node.js web services, with endpoints, data models and an API contract designed to be consumed rather than worked around.",
  },
  {
    id: "data",
    title: "Data the application fits",
    detail:
      "MySQL schemas and queries shaped around how the application actually reads and writes, so the storage layer supports the product instead of constraining it.",
  },
];

export const stack = {
  layers: [
    {
      index: "01",
      name: "Interface",
      summary: "What people use",
      items: [
        "React JS",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML",
        "CSS",
        "Responsive UI",
      ],
    },
    {
      index: "02",
      name: "Integration",
      summary: "How it talks",
      items: ["REST APIs", "Axios", "Web Services"],
    },
    {
      index: "03",
      name: "Services",
      summary: "What answers",
      items: ["C#", ".NET Core MVC", "Node.js"],
    },
    {
      index: "04",
      name: "Data",
      summary: "What persists",
      items: ["MySQL"],
    },
  ] satisfies StackLayer[],
  languages: ["JavaScript", "TypeScript", "C#", "Java", "Python", "C++"],
  tools: [
    "Git",
    "GitHub",
    "Visual Studio Code",
    "Visual Studio",
    "IntelliJ IDEA",
    "PyCharm",
  ],
};

export const principles: Principle[] = [
  {
    title: "Agree the contract first",
    detail:
      "API contracts and data models settled before either side is built, so the interface and the service are never guessing at each other.",
  },
  {
    title: "Components, not screens",
    detail:
      "A component architecture from the start. The codebase stays readable, extendable and cheap to change six months later.",
  },
  {
    title: "Test the endpoints",
    detail:
      "Endpoints exercised as they are written, so integration problems are found during the build rather than in the release.",
  },
  {
    title: "Version control as habit",
    detail:
      "A Git workflow throughout: history that explains itself and work that can always be traced back.",
  },
];

export const contact = {
  lead: "Available for full stack development work.",
  note: "Front end, back end, or the whole application. Email is the fastest way to reach me. I read everything and reply.",
} as const;

export type Section = {
  id: SectionId;
  index: string;
  label: string;
  navLabel?: string;
};

export const sections: Section[] = [
  { id: "about", index: "</>", label: "Profile", navLabel: "About" },
  { id: "capabilities", index: "</>", label: "Capabilities" },
  { id: "stack", index: "</>", label: "Stack" },
  { id: "approach", index: "</>", label: "Approach" },
  { id: "contact", index: "</>", label: "Contact" },
];

export const navLinks = sections
  .filter((section) =>
    ["about", "capabilities", "stack", "approach", "contact"].includes(
      section.id
    )
  )
  .map((section) => ({ ...section, label: section.navLabel ?? section.label }));
