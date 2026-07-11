import { WordReveal } from "@/components/ui/WordReveal";
import { Gallery } from "@/components/gallery/Gallery";
import { photoCredits, type PhotoKey } from "@/lib/photos";

export const metadata = { title: "Gallery" };

const keys: PhotoKey[] = [
  "arenaAction",
  "faceoff",
  "standing",
  "iceSpray",
  "goalie",
  "puckBattle",
  "netFront",
  "closeFaceoff",
  "teamPortrait",
  "skater",
  "sticksSkates",
  "goalieSave",
  "practice",
  "puckCarry",
  "bench",
  "outdoor",
  "youth",
  "gameNight",
];

export default function GalleryPage() {
  return (
    <div className="pb-28 pt-28">
      <header className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">On the ice</p>
        <WordReveal
          text="Gallery"
          className="font-display text-[15vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
        />
        <p className="mt-5 max-w-xl text-balance text-frost/75">
          Practice, gameday and everything in between. Tap any frame to open it full size.
        </p>
      </header>

      <section className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <Gallery keys={keys} />

        <p className="mt-8 font-mono text-[11px] leading-relaxed text-frost/55">
          Photography: {photoCredits.join(", ")}. Free to use under the Pexels license.
        </p>
      </section>
    </div>
  );
}
