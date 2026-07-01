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
        description={{
          zh: "自动整理用户感兴趣的新闻，替用户处理紧急的待办事项。支持用户上传资料生成个性化播客，并通过笔记功能整理信息。",
          en: "Automatically curates the news users care about and handles urgent to-dos on their behalf. Users can upload their own material to generate personalized podcasts, with a notes feature to keep everything organized.",
        }}
        tags={{
          zh: ["设计 AI Agent", "搭建设计系统", "制作播客内容", "分析竞品"],
          en: ["Designing the AI Agent", "Building the design system", "Producing podcast content", "Competitive analysis"],
        }}
      >
        <BlourMockups />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="periwinkle"
        title="JPMorgan Chase"
        tagVariant="lavender"
        description={{
          en: "Designed scalable internal tools and intake systems to streamline cross-functional collaboration and improve operational efficiency for 52+ teams.",
          zh: "设计可扩展的内部工具与需求受理系统，简化跨部门协作，为 52+ 个团队提升运营效率。",
        }}
        tags={{
          zh: ["流程设计", "表单与系统设计", "跨部门协作", "体验优化"],
          en: ["Process design", "Forms & systems design", "Cross-functional collaboration", "Experience optimization"],
        }}
      >
        <JPMorganCards />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="orange"
        title="WisdomPlan"
        description={{
          zh: "帮助用户降低寻找学习资源的时间与低效成本，以更低成本、更个性化的方式提供学习路径与职业发展。",
          en: "Helps users cut the time and inefficiency of hunting for learning resources — delivering personalized learning paths and career development in a lower-cost, more tailored way.",
        }}
        tags={{
          zh: ["调研用户需求", "设计交互体验", "分析竞品"],
          en: ["User research", "Interaction design", "Competitive analysis"],
        }}
      >
        <WisdomPlanMockup />
      </FeaturedProject>

      <ContactSection />
    </main>
  );
}
