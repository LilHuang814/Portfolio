import { Hero } from "@/components/Hero";
import { ResumeCard } from "@/components/ResumeCard";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectImage } from "@/components/ProjectImage";
import { ContactSection } from "@/components/ContactSection";
import { CursorGlow } from "@/components/CursorGlow";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <main className="relative mx-auto w-full max-w-[90rem] pb-6">
      <CursorGlow />

      <SiteNav />

      <Hero />

      <ResumeCard />

      <FeaturedProject
        eyebrowColor="periwinkle"
        title="WisdomPlan"
        logo="/projects/home-logos/wisdomplan.png"
        href="/work/wisdomplan"
        description={{
          zh: "帮助用户降低寻找学习资源的时间与成本，提供更个性化的学习路径与职业发展",
          en: "Cuts the time and cost of hunting for learning resources, delivering personalized learning paths and career growth.",
        }}
        tags={{
          zh: ["用户研究", "快速原型", "竞品分析", "AI 产品设计"],
          en: ["User research", "Rapid prototyping", "Competitive analysis", "AI product design"],
        }}
      >
        <ProjectImage src="/projects/wisdomplan.png" alt="WisdomPlan" width={5760} height={2924} />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="orange"
        title="Blour"
        logo="/projects/home-logos/blour.png"
        href="/work/blour"
        description={{
          zh: "自动整理用户感兴趣的新闻并处理紧急待办，还能把上传的资料生成个性化播客，用笔记归纳信息",
          en: "Curates relevant news, handles urgent tasks, and transforms uploaded materials into personalized podcasts with organized notes.",
        }}
        tags={{
          zh: ["AI 产品设计", "AIGC", "竞品分析", "视觉设计"],
          en: ["AI product design", "AIGC", "Competitive analysis", "Visual design"],
        }}
      >
        <ProjectImage src="/projects/blour.png" alt="Blour" width={6840} height={3376} rounded="rounded-none sm:rounded-2xl" />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="orange"
        title="Payment Ticker Improvements"
        logo="/projects/home-logos/payment-ticker.png"
        href="/work/payment-ticker"
        description={{
          zh: "根据不同游戏的设计系统与支付场景，设计对应的支付异常状态提示信息，确保玩家能够清晰理解问题",
          en: "Created clear and consistent payment error-state messaging across game-specific design systems and payment scenarios.",
        }}
        tags={{
          zh: ["游戏UI设计", "用户研究", "优化体验", "内容策略"],
          en: ["Game UI design", "User research", "Experience optimization", "Content strategy"],
        }}
      >
        <ProjectImage
          src="/projects/payment-ticker-improvements.png"
          alt="Payment Ticker Improvements"
          width={6384}
          height={3080}
        />
      </FeaturedProject>

      <FeaturedProject
        eyebrowColor="periwinkle"
        title="JPMC"
        logo="/projects/home-logos/jpmc.png"
        href="/work/jpmc"
        description={{
          en: "Designed scalable internal tools and intake systems that streamlined collaboration for 52+ teams.",
          zh: "设计可扩展的内部工具与受理系统，为 52+ 个团队简化协作、提升效率",
        }}
        tags={{
          zh: ["用户体验设计", "流程优化", "用户研究", "视觉设计"],
          en: ["UX design", "Workflow optimization", "User research", "Visual design"],
        }}
      >
        <ProjectImage src="/projects/jpmc-v2.png" alt="JPMC" width={6912} height={3508} />
      </FeaturedProject>

      <ContactSection />
    </main>
  );
}
