import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/ui/Ticker";
import { DepthStrip } from "@/components/home/DepthStrip";
import { FeatureStory } from "@/components/home/FeatureStory";
import { GameNight } from "@/components/home/GameNight";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { CtaBand } from "@/components/home/CtaBand";
import { Sponsors } from "@/components/layout/Sponsors";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <DepthStrip />
      <FeatureStory />
      <GameNight />
      <PhotoStrip />
      <Sponsors />
      <CtaBand />
    </>
  );
}
