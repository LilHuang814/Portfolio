import { Hero } from "@/components/Hero";
import { ResumeCard } from "@/components/ResumeCard";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectPlaceholder } from "@/components/ProjectPlaceholder";
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
          zh: "自动整理用户感兴趣的新闻并处理紧急待办，还能把上传的资料生成个性化播客，用笔记归纳信息。",
          en: "Curates the news users care about, handles urgent to-dos, and turns uploaded material into personalized podcasts — organized with notes.",
        }}
        tags={{
          zh: ["AI Agent 设计", "设计系统", "播客内容", "竞品分析"],
          en: ["AI Agent design", "Design system", "Podcast content", "Competitive analysis"],
        }}
      >
        <ProjectPlaceholder name="Blour" />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="periwinkle"
        title="JPMorgan Chase"
        tagVariant="lavender"
        description={{
          en: "Designed scalable internal tools and intake systems that streamlined collaboration for 52+ teams.",
          zh: "设计可扩展的内部工具与受理系统，为 52+ 个团队简化协作、提升效率。",
        }}
        tags={{
          zh: ["流程设计", "系统设计", "跨部门协作", "体验优化"],
          en: ["Process design", "Systems design", "Cross-team", "UX optimization"],
        }}
      >
        <ProjectPlaceholder name="JPMorgan Chase" />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="orange"
        title="WisdomPlan"
        description={{
          zh: "帮助用户降低寻找学习资源的时间与成本，提供更个性化的学习路径与职业发展。",
          en: "Cuts the time and cost of hunting for learning resources, delivering personalized learning paths and career growth.",
        }}
        tags={{
          zh: ["用户研究", "交互设计", "竞品分析"],
          en: ["User research", "Interaction design", "Competitive analysis"],
        }}
      >
        <ProjectPlaceholder name="WisdomPlan" />
      </FeaturedProject>

      <ContactSection />
    </main>
  );
}
