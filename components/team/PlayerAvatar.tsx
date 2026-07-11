import Image from "next/image";
import Link from "next/link";
import { getPlayerByName, initials } from "@/lib/players";

const SIZES = {
  sm: { box: "h-7 w-7", text: "text-[10px]", px: 28 },
  md: { box: "h-9 w-9", text: "text-[11px]", px: 36 },
} as const;

/**
 * Roster headshot, resolved by player name. Eight skaters have no photo, so this
 * falls back to an initials monogram rather than a broken image or a blank slot.
 * When the name matches a roster player it links through to their profile.
 */
export function PlayerAvatar({
  name,
  size = "sm",
  link = true,
}: {
  name: string;
  size?: keyof typeof SIZES;
  link?: boolean;
}) {
  const player = getPlayerByName(name);
  const s = SIZES[size];

  const inner = player?.photo ? (
    <Image
      src={player.photo}
      alt=""
      width={s.px}
      height={s.px}
      className="h-full w-full object-cover object-top"
    />
  ) : (
    <span className={`font-mono ${s.text} text-frost/70`}>{initials(name)}</span>
  );

  const shell = (
    <span
      className={`grid ${s.box} shrink-0 place-items-center overflow-hidden rounded-full border border-white/15 ${
        player?.photo ? "bg-gradient-to-b from-white/90 to-frost/60" : "bg-white/[0.06]"
      }`}
    >
      {inner}
    </span>
  );

  if (!link || !player) return shell;

  return (
    <Link
      href={`/team/${player.slug}`}
      aria-label={name}
      className="rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ice-blue"
    >
      {shell}
    </Link>
  );
}
