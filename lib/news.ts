// Concept newsroom content for the redesign. Written to reflect the site's data
// (2026-27 pre-season, ticketing, the McKenna Select drop). Not official reporting.

import type { PhotoKey } from "./photos";

export type Article = {
  slug: string;
  title: string;
  category: "Club" | "Roster" | "Gameday" | "Community" | "Store";
  date: string; // ISO
  author: string;
  readMins: number;
  excerpt: string;
  photo: PhotoKey;
  body: string[];
  featured?: boolean;
};

export const articles: Article[] = [
  {
    slug: "preseason-schedule-announced",
    title: "Leafs unveil 2026-27 pre-season slate",
    category: "Club",
    date: "2026-07-08",
    author: "Leafs Communications",
    readMins: 3,
    excerpt:
      "Four split-squad games over two September days against Original Six rivals Montreal and Ottawa kick off the road to the regular season.",
    photo: "arenaAction",
    featured: true,
    body: [
      "The Maple Leafs will open their pre-season with a familiar pair of rivals. The club today confirmed a four-game exhibition slate, with split-squad meetings against the Montreal Canadiens on September 19 and the Ottawa Senators on September 23.",
      "Both dates feature simultaneous home-and-away games, giving the coaching staff a long look at prospects and roster hopefuls on either side of the split. The Scotiabank Arena dates give supporters an early chance to see the group take shape before the puck drops for real.",
      "Game times and broadcast details are still to be announced. Tickets go on sale July 23, with members receiving first access through their presale window.",
    ],
  },
  {
    slug: "single-game-tickets-on-sale",
    title: "Single-game tickets on sale July 23",
    category: "Gameday",
    date: "2026-07-09",
    author: "Ticketing",
    readMins: 2,
    excerpt:
      "Mark the calendar. Pre-season seats and the first wave of regular-season inventory drop later this month.",
    photo: "gameNight",
    body: [
      "Supporters won't have to wait long to lock in their seats. Single-game tickets for the pre-season slate go on sale July 23, with additional regular-season inventory to follow later in the summer.",
      "Members and season-seat holders receive priority access through a dedicated presale. Premium options, including the party lofts and suites, remain available on request through the box office.",
      "Head to the tickets page for seating tiers and to join the notify list for the on-sale.",
    ],
  },
  {
    slug: "mckenna-select-drop",
    title: "The Gavin McKenna Select collection has landed",
    category: "Store",
    date: "2026-07-06",
    author: "Team Store",
    readMins: 2,
    excerpt:
      "Autograph-model pucks, lockup caps and limited Select gear celebrating the number one pick, only while it lasts.",
    photo: "standing",
    body: [
      "The number one pick, immortalised. The team store's new Gavin McKenna Select collection is live, headlined by an autograph-model puck in a display case, a rink-lockup cap and a run of limited Select pieces.",
      "Quantities are limited and the collection is only around while it lasts. Members get an early look before general availability.",
      "Browse the drop on the shop page and add your favourites to the bag.",
    ],
  },
  {
    slug: "nylander-leads-scoring",
    title: "Nylander pacing the attack",
    category: "Roster",
    date: "2026-06-28",
    author: "Leafs Communications",
    readMins: 3,
    excerpt:
      "A 79-point campaign put William Nylander at the top of the club's scoring chart, with John Tavares and Matthew Knies close behind.",
    photo: "netFront",
    body: [
      "William Nylander led the Maple Leafs in scoring with 79 points, pairing 30 goals with 49 assists across his 2025-26 season. His blend of pace and a heavy release again made him the club's most dangerous even-strength driver.",
      "John Tavares followed with 71 points on a team-high 31 goals, while Matthew Knies broke out for 66 points and continued to establish himself as a physical presence on the top six.",
      "The trio anchors a forward group the staff will lean on heavily as the new season approaches.",
    ],
  },
  {
    slug: "community-fuelling-the-future",
    title: "Fuelling the future: youth camps return",
    category: "Community",
    date: "2026-06-20",
    author: "Community",
    readMins: 2,
    excerpt:
      "The club's youth development programming returns this summer, bringing coaching and mentorship to rinks across the region.",
    photo: "bench",
    body: [
      "Grassroots hockey remains at the heart of the club. This summer's youth camps return with a focus on skill development, mentorship and access, bringing coaching to rinks across the region.",
      "The programming is delivered in partnership with the club's official partners, extending the reach of learn-to-play initiatives for a new generation of supporters.",
      "Registration details and dates will be shared through the community channels in the coming weeks.",
    ],
  },
  {
    slug: "goaltending-outlook",
    title: "Between the pipes: the goaltending picture",
    category: "Roster",
    date: "2026-06-15",
    author: "Leafs Communications",
    readMins: 3,
    excerpt:
      "With depth in the crease, the club heads into camp with real competition for starts.",
    photo: "goalie",
    body: [
      "The crease will be one of the more compelling stories of camp. The club carries genuine depth, with several netminders pushing for time and a competition that should sharpen the group.",
      "Consistency will be the theme, with the staff looking for the tandem that gives the team its best chance on a nightly basis across a long season.",
      "Expect the pre-season split-squad games to offer an early read on where the reps are headed.",
    ],
  },
];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
