import {
  Mic,
  Play,
  Plus,
  Home,
  ClipboardList,
  User,
  Bookmark,
  Share2,
  Pencil,
  X,
  Sparkles,
  FileText,
  Link2,
  Video,
} from "lucide-react";

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[326px] w-[148px] shrink-0 flex-col overflow-hidden rounded-[1.4rem] border-4 border-white bg-white shadow-md ring-1 ring-ink/5">
      {children}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-3 pt-2 text-[9px] font-semibold text-ink/70">
      <span>9:41</span>
      <span>••• ⏻</span>
    </div>
  );
}

export function BlourMockups() {
  return (
    <div className="w-full rounded-[2rem] bg-[#e8e7ea] p-4 sm:p-5">
      <div className="flex justify-center gap-2 overflow-x-auto pb-1">
        {/* Phone 1 — Podcast news card */}
        <Phone>
          <div className="flex flex-1 flex-col bg-gradient-to-b from-[#dfe3f5] to-[#f5e2d2] px-3">
            <StatusBar />
            <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-ink">
              <span className="flex items-center gap-1">
                <Mic className="h-3 w-3 text-periwinkle" /> Podcast
              </span>
              <X className="h-3 w-3 text-ink/50" />
            </div>
            <div className="mt-2 overflow-hidden rounded-xl bg-white/80">
              <div className="flex h-20 items-center justify-center bg-gradient-to-br from-[#e9edf7] to-[#f3e6d8] text-lg font-bold tracking-tight">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="p-2.5">
                <p className="text-[10px] font-semibold leading-tight text-ink">
                  Google&rsquo;s AI is trying on your clothes for you
                </p>
                <p className="mt-1 text-[8px] leading-tight text-muted-ink">
                  A new feature lets shoppers preview outfits virtually before buying.
                </p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between py-3 text-[9px]">
              <span className="text-muted-ink">Not right now</span>
              <span className="flex items-center gap-1 rounded-full bg-periwinkle px-3 py-1.5 font-semibold text-white">
                <Sparkles className="h-2.5 w-2.5" /> Interested!
              </span>
            </div>
          </div>
        </Phone>

        {/* Phone 2 — Reminders */}
        <Phone>
          <div className="flex flex-1 flex-col px-3">
            <StatusBar />
            <p className="mt-2 text-base font-bold text-ink">Reminders</p>
            <p className="mt-1 text-[8px] font-semibold text-periwinkle">Today, Sep 3</p>
            <div className="mt-2 space-y-2">
              {[
                ["10:00AM · Weekly", "Finalize quarterly report"],
                ["2:00PM · 1x", "Project Sync"],
                ["10:00AM · Weekly", "Design review"],
              ].map(([time, task]) => (
                <div key={task} className="flex items-start gap-1.5">
                  <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full border border-ink/25" />
                  <div>
                    <p className="text-[9px] font-semibold text-ink">{task}</p>
                    <p className="text-[7px] text-muted-ink">{time}</p>
                  </div>
                  <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-md bg-periwinkle/15 text-[6px] font-bold text-periwinkle">
                    AI
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-around border-t border-ink/5 py-2">
              <Home className="h-3.5 w-3.5 text-muted-ink" />
              <ClipboardList className="h-3.5 w-3.5 text-periwinkle" />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-periwinkle">
                <Mic className="h-3 w-3 text-white" />
              </span>
              <Plus className="h-3.5 w-3.5 text-muted-ink" />
              <User className="h-3.5 w-3.5 text-muted-ink" />
            </div>
          </div>
        </Phone>

        {/* Phone 3 — Your Day, in Audio */}
        <Phone>
          <div className="flex flex-1 flex-col bg-gradient-to-b from-[#c7cdf0] via-[#e6d7e0] to-[#f6d9bf] px-3">
            <StatusBar />
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
              <p className="text-[9px] font-medium text-white/90">15 mins</p>
              <p className="text-sm font-semibold text-white drop-shadow">Your Day, in Audio</p>
              <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow">
                <Play className="h-4 w-4 text-ink" fill="currentColor" />
              </span>
            </div>
            <div className="mb-3 rounded-xl bg-white/85 p-2">
              <p className="text-center text-[7px] font-semibold uppercase tracking-wide text-periwinkle">
                Create your pod
              </p>
              <div className="mt-2 flex justify-around text-muted-ink">
                <FileText className="h-3.5 w-3.5" />
                <Link2 className="h-3.5 w-3.5" />
                <Video className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </Phone>

        {/* Phone 4 — Your Latest News */}
        <Phone>
          <div className="flex flex-1 flex-col bg-gradient-to-b from-[#cdd3f2] via-[#e7dbe1] to-[#f6dcc2] px-3">
            <StatusBar />
            <div className="mt-1 flex items-center justify-between text-[10px] font-semibold text-white/90">
              <span className="flex items-center gap-1">
                <Mic className="h-3 w-3" /> Podcast
              </span>
            </div>
            <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-1 text-center">
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-lg">
                🧑‍💻
              </span>
              <p className="text-[7px] font-semibold uppercase tracking-wide text-white/80">
                Tuesday, Jul 22
              </p>
              <p className="text-base font-bold text-white drop-shadow">Your Latest News</p>
              <p className="mt-1 text-[8px] text-white/80">15 mins · 10 pods</p>
            </div>
            <div className="mb-3 flex items-center justify-around rounded-xl bg-white/85 py-2 text-muted-ink">
              <Share2 className="h-3 w-3" />
              <Mic className="h-3.5 w-3.5 text-orange" />
              <Bookmark className="h-3 w-3" />
              <Pencil className="h-3 w-3" />
            </div>
          </div>
        </Phone>
      </div>
    </div>
  );
}
