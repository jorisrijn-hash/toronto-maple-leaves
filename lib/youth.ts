// Youth programming.
//
// The structure and facts here are drawn from the club's real Hockey Development
// site (leafsdevelopment.com): the programme line-up, age bands, session formats,
// safeguarding standards and support partners. Copy is rewritten for this concept.

export type Program = {
  slug: string;
  name: string;
  kicker: string;
  ages: string;
  format: string;
  venue: string;
  summary: string;
  details: string[];
  photo: import("./photos").PhotoKey;
  featured?: boolean;
};

export const programs: Program[] = [
  {
    slug: "hockey-school",
    name: "Leafs Hockey School",
    kicker: "Summer camp",
    ages: "Ages 7 to 12",
    format: "Week long",
    venue: "Ford Performance Centre",
    summary:
      "A full week on the ice with a summer camp feel, run by the Hockey Development staff. Built for recreational and intermediate skaters of every level.",
    details: [
      "Coaching from certified Hockey Development staff across a full week",
      "Open to recreational and intermediate players, all skill levels welcome",
      "Families receive a parent handbook in the week before camp starts",
      "Custom camp jersey included with registration",
    ],
    photo: "practice",
    featured: true,
  },
  {
    slug: "clinic-series-arena",
    name: "Clinic Series at the arena",
    kicker: "Single day",
    ages: "Ages 7 to 12, co-ed",
    format: "90 minute session",
    venue: "Scotiabank Arena",
    summary:
      "Skate where the first team plays. Ninety minutes of skill work, then a mini tour of the building most kids only ever see from the stands.",
    details: [
      "Sessions run 90 minutes and are led by Hockey Development staff",
      "Skaters and goaltenders both welcome, roughly two to three goalies a session",
      "A tour of the arena is included either side of the ice time",
      "An exclusive clinic practice jersey is yours to keep",
    ],
    photo: "arenaAction",
  },
  {
    slug: "clinic-series-fpc",
    name: "Clinic Series at the practice rink",
    kicker: "Single day",
    ages: "Ages 7 to 12, co-ed",
    format: "Single session",
    venue: "Ford Performance Centre",
    summary:
      "The same coaching, at the rink where the pros practise. Focused single day sessions for players sharpening a specific part of their game.",
    details: [
      "Check in opens 30 minutes before the session starts",
      "Sessions are themed: puck control, skating and shooting, passing and play",
      "Led by the same Hockey Development staff as the arena clinics",
    ],
    photo: "puckCarry",
  },
  {
    slug: "girls-grow-the-game",
    name: "Girls Grow The Game",
    kicker: "All girls clinic",
    ages: "Youth",
    format: "Clinic",
    venue: "Ford Performance Centre",
    summary:
      "An all girls clinic built to show young female players everything the sport has to offer, and to make the room feel like theirs from the first whistle.",
    details: [
      "Open to girls of all skill levels, including first time players",
      "Coaching staff includes women working in the game",
      "Focus on confidence and belonging as much as on skills",
    ],
    photo: "youth",
  },
  {
    slug: "coaches-open-house",
    name: "Coaches Open House",
    kicker: "Free, for coaches",
    ages: "Coaches, all levels",
    format: "Morning event",
    venue: "Scotiabank Arena",
    summary:
      "A free morning for coaches at any level, including a conversation with the head coach of the first team. Bring a notebook and take it back to your room.",
    details: [
      "Free to attend, from minor hockey volunteers to senior coaches",
      "Doors at 7:00, programme runs 7:45 to 11:45",
      "Counts toward National Coaching Certification Program development",
      "No entry after 9:00, so arrive early",
    ],
    photo: "bench",
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}

export const staff: { name: string; role: string; line: string }[] = [
  {
    name: "Olivia Perretta",
    role: "Coordinator, Hockey Development",
    line: "A defender by trade, now building the programmes that put structure and communication in front of every young player who walks in.",
  },
  {
    name: "Coach Greg",
    role: "Lead Hockey Development Coach",
    line: "A teacher first. Greg connects young athletes with people who care about the same things they do, on the ice and in the classroom.",
  },
  {
    name: "Coach Erik",
    role: "Hockey Development Coach",
    line: "A centreman on the ice and an instructor off it, with a level head on the good days and the bad ones.",
  },
];

// Safeguarding standards every coach on the ice is held to.
export const safeguarding: string[] = [
  "National Coaching Certification Program designations",
  "Criminal record checks",
  "Reference checks and interviews",
  "Annual on ice and off ice workshops",
];

export const resources: { name: string; blurb: string }[] = [
  {
    name: "Concussion protocol and Rowan's Law",
    blurb:
      "Coaches, parents and players are all expected to know the symptoms and the protocol. When in doubt, the player sits out.",
  },
  {
    name: "Mental health support",
    blurb:
      "On site counselling for youth and their families through the club's community partner, with no stigma attached to asking.",
  },
  {
    name: "Financial support",
    blurb:
      "Individual grants help families meet the cost of playing, so a registration fee is not the reason a kid stays off the ice.",
  },
  {
    name: "Coach certification",
    blurb:
      "A pathway for coaches to train and develop, with standardised and safe sport education across the country.",
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "How do I register my child?",
    a: "Open the page for the programme you want. If registration is live, the link to sign up is on that page. If a session is full, you can join the waitlist there too.",
  },
  {
    q: "What is the coach to player ratio?",
    a: "Every session is staffed so that each group gets real attention on the ice. Ratios vary by programme and age band, and are listed on the programme page.",
  },
  {
    q: "Are there any discounts available?",
    a: "Financial support is available through our community grant partner for families who need it. Ask us before you register and we will point you in the right direction.",
  },
  {
    q: "What is your refund policy?",
    a: "Clinics can be refunded up to six days before the session, minus a small administration fee. Camp refunds work the same way, with the fee and any customised jersey deducted.",
  },
  {
    q: "What do I get with my registration?",
    a: "Ice time with our Hockey Development coaches, an exclusive practice jersey to keep, and for the arena clinics, a tour of the building.",
  },
  {
    q: "What should I bring?",
    a: "Full on ice equipment, a filled water bottle, nut free snacks, and a good attitude. Check in happens before the ice time, so leave room for getting dressed.",
  },
  {
    q: "What happens if my child is injured?",
    a: "Staff are trained in the concussion protocol and follow it without exception. Parents are contacted immediately and the player is removed from the ice.",
  },
];
