import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/ui/Ticker";
import { DepthStrip } from "@/components/home/DepthStrip";
import { FeatureStory } from "@/components/home/FeatureStory";
import { GameNight } from "@/components/home/GameNight";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <DepthStrip />
      <FeatureStory />
      <GameNight />
      <CtaBand />
    </>
  );
}
