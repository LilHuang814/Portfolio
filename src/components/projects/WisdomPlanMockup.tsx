import { BookOpen, ChevronRight, MessageCircle, Award, Star } from "lucide-react";

const TABS = ["Programming", "Data Science", "AI Tools", "Visual Design", "AI Skills"];

export function WisdomPlanMockup() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-ink/5 px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <BookOpen className="h-4 w-4 text-periwinkle" /> WisdomPlan
        </div>
        <div className="hidden gap-5 text-xs text-muted-ink sm:flex">
          <span>Features</span>
          <span>Blog</span>
          <span>Pricing</span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" /> Join Discord
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted-ink">Sign in</span>
          <span className="rounded-full bg-periwinkle px-3 py-1.5 font-semibold text-white">
            Sign up
          </span>
        </div>
      </div>

      <div className="grid gap-8 p-8 sm:grid-cols-2 sm:items-center">
        <div>
          <h3 className="text-2xl font-bold leading-tight text-ink">
            AI-powered learning: Master <span className="text-periwinkle">AI skills</span>, Your way
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-ink">
            Create your personalized learning plan in minutes, automatically curated
            from the internet&rsquo;s top resources.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="flex items-center gap-1 rounded-lg border border-orange/30 px-3 py-1.5 text-[11px] font-medium text-orange">
              <Award className="h-3 w-3" /> #1 Product of the Day
            </span>
            <span className="flex items-center gap-1 rounded-lg border border-orange/30 px-3 py-1.5 text-[11px] font-medium text-orange">
              <Star className="h-3 w-3" /> Education
            </span>
          </div>
          <button className="mt-5 rounded-lg bg-periwinkle px-5 py-2.5 text-sm font-semibold text-white">
            Get started — It&rsquo;s free
          </button>
        </div>

        <div className="rounded-xl border border-ink/5 bg-[#faf9fc] p-5">
          <p className="text-sm font-semibold text-ink">What subject are you interested in?</p>
          <p className="mt-1 text-[11px] text-muted-ink">
            No more hunting for random links — get a study plan curated to top resources.
          </p>
          <div className="mt-4 rounded-lg border border-ink/10 px-3 py-2 text-xs text-ink">
            Programming
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={`rounded-full px-3 py-1.5 ${
                  i === 0 ? "bg-periwinkle text-white" : "bg-[#f1eff8] text-muted-ink"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-1 rounded-lg bg-periwinkle px-4 py-2 text-xs font-semibold text-white">
            Next <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
