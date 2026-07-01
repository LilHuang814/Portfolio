import { Hero } from "@/components/Hero";
import { ResumeCard } from "@/components/ResumeCard";
import { FeaturedProject } from "@/components/FeaturedProject";
import { BlourMockups } from "@/components/projects/BlourMockups";
import { JPMorganCards } from "@/components/projects/JPMorganCards";
import { WisdomPlanMockup } from "@/components/projects/WisdomPlanMockup";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl pb-6">
      <Hero />

      <ResumeCard />

      <FeaturedProject
        eyebrowColor="orange"
        title="Blour"
        glowBias="warm"
        description="Automatically curates the news users care about and surfaces urgent to-dos on their behalf. Lets users upload their own material to generate personalized podcasts, with notes to keep it all organized."
        tags={["Designing the AI Agent", "Building the design system", "Producing podcast content", "Analyzing competitors"]}
      >
        <BlourMockups />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="periwinkle"
        title="JPMorgan Chase"
        glowBias="cool"
        description="Designed scalable internal tools and intake systems to streamline cross-functional collaboration and improve operational efficiency for 52+ teams."
        tags={["Process design", "Forms & systems design", "Cross-functional collaboration", "Experience optimization"]}
      >
        <JPMorganCards />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="orange"
        title="WisdomPlan"
        glowBias="cool"
        description="Helps users escape the time and inefficiency of hunting for learning resources — delivering personalized learning paths and career development at lower cost."
        tags={["User research", "Interaction design", "Competitive analysis"]}
      >
        <WisdomPlanMockup />
      </FeaturedProject>

      <ContactSection />
    </main>
  );
}
