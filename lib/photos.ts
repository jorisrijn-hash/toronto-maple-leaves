// Photography manifest.
//
// Every photo below is a real, free-to-use image from Pexels (pexels.com/license):
// free for commercial use, no attribution required, though we credit the shooters
// on the gallery page anyway. IDs and photographers were taken from Pexels itself.
//
// Two delivery modes:
//   USE_LOCAL_PHOTOS = false -> served straight from the Pexels CDN (works on deploy,
//                               no download step; images.pexels.com is already allowed
//                               in next.config remotePatterns).
//   USE_LOCAL_PHOTOS = true  -> served from /public/photos. Run `npm run photos` first
//                               to download them, then ship the public/ folder.
//
// Flipping the flag is the only change needed to self-host.

export const USE_LOCAL_PHOTOS = false;

export type Photo = {
  id: string; // Pexels photo id
  file: string; // local filename under /public/photos
  alt: string;
  credit: string; // photographer
  tall?: boolean; // portrait-ish, used by the gallery mosaic
};

const photoMap = {
  arenaAction: {
    id: "34383777",
    file: "arena-action.jpg",
    alt: "Ice hockey players in motion during a match in an indoor arena",
    credit: "Gandhi Moura",
  },
  faceoff: {
    id: "6847276",
    file: "faceoff.jpg",
    alt: "Two ice hockey players face off, eyes locked on the puck",
    credit: "Tima Miroshnichenko",
  },
  puckBattle: {
    id: "6468938",
    file: "puck-battle.jpg",
    alt: "Players battling for the puck during a face-off on a lit rink",
    credit: "Tony Schnagl",
  },
  goalie: {
    id: "6847287",
    file: "goalie.jpg",
    alt: "Goaltender in full gear guarding the net",
    credit: "Tima Miroshnichenko",
  },
  goalieSave: {
    id: "19330405",
    file: "goalie-save.jpg",
    alt: "Goaltender making a save during a game",
    credit: "jaralol",
  },
  netFront: {
    id: "19909823",
    file: "net-front.jpg",
    alt: "Players competing in front of the net under dramatic lighting",
    credit: "Vadim Braydov",
  },
  teamPortrait: {
    id: "6847915",
    file: "team-portrait.jpg",
    alt: "A team of hockey players together on the ice",
    credit: "Tima Miroshnichenko",
  },
  bench: {
    id: "8972990",
    file: "bench.jpg",
    alt: "Young players watching the game from the bench",
    credit: "Ron Lach",
  },
  youth: {
    id: "12945034",
    file: "youth.jpg",
    alt: "A young player handling the puck on an indoor rink",
    credit: "freestockpro",
  },
  iceSpray: {
    id: "6468935",
    file: "ice-spray.jpg",
    alt: "A skater cutting hard and throwing up a spray of ice",
    credit: "Tony Schnagl",
  },
  skater: {
    id: "6847288",
    file: "skater.jpg",
    alt: "A player skating with the puck, fully focused",
    credit: "Tima Miroshnichenko",
  },
  standing: {
    id: "6847302",
    file: "standing.jpg",
    alt: "A player in full gear standing on the ice",
    credit: "Tima Miroshnichenko",
    tall: true,
  },
  sticksSkates: {
    id: "6847281",
    file: "sticks-skates.jpg",
    alt: "Close-up of sticks and skates during a scramble",
    credit: "Tima Miroshnichenko",
  },
  practice: {
    id: "6468923",
    file: "practice.jpg",
    alt: "A group of players working through a practice drill",
    credit: "Tony Schnagl",
  },
  outdoor: {
    id: "20025293",
    file: "outdoor.jpg",
    alt: "A hockey game on a snowy outdoor rink",
    credit: "Vlad Nazarov",
  },
  gameNight: {
    id: "8974835",
    file: "game-night.jpg",
    alt: "A competitive game under the lights at an indoor rink",
    credit: "Ron Lach",
  },
  puckCarry: {
    id: "13978854",
    file: "puck-carry.jpg",
    alt: "A player carrying the puck up the ice",
    credit: "Luke Miller",
  },
  closeFaceoff: {
    id: "6847527",
    file: "close-faceoff.jpg",
    alt: "Close-up of two players fighting for puck control",
    credit: "Tima Miroshnichenko",
    tall: true,
  },
} as const satisfies Record<string, Photo>;

// Keys stay literal (so PhotoKey is a union), values widen to Photo so optional
// fields like `tall` are visible on every entry.
export type PhotoKey = keyof typeof photoMap;
export const photos: Record<PhotoKey, Photo> = photoMap;

// Pexels serves resized variants through imgix-style query params.
export function photoSrc(key: PhotoKey, width = 1600): string {
  const p = photos[key];
  if (USE_LOCAL_PHOTOS) return `/photos/${p.file}`;
  return `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export function photoAlt(key: PhotoKey): string {
  return photos[key].alt;
}

// Unique photographers, for the credit line.
export const photoCredits: string[] = Array.from(
  new Set(Object.values(photos).map((p) => p.credit))
).sort();
