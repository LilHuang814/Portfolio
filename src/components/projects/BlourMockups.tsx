import { Mic, Play, Plus, Home, ClipboardList, User, Bookmark, Share2, Pencil } from "lucide-react";
import { PhoneFrame } from "../PhoneFrame";

export function BlourMockups() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <PhoneFrame className="hidden lg:flex">
        <div className="flex items-center gap-2 px-4 pt-4 text-xs font-semibold text-ink">
          <Mic className="h-3.5 w-3.5 text-periwinkle" /> Podcast
        </div>
        <div className="mx-4 mt-3 flex-1 rounded-2xl bg-gradient-to-br from-periwinkle/20 to-orange/20 p-4">
          <p className="text-sm font-semibold leading-snug text-ink">
            The story behind your morning headlines
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-ink">
            Curated from the sources you follow, ready to read or listen.
          </p>
        </div>
        <div className="flex justify-between gap-2 px-4 py-4 text-xs">
          <button className="flex-1 rounded-full border border-ink/10 py-2 text-muted-ink">
            Not now
          </button>
          <button className="flex-1 rounded-full bg-periwinkle py-2 font-semibold text-white">
            Interested!
          </button>
        </div>
      </PhoneFrame>

      <PhoneFrame>
        <div className="flex items-center justify-between px-4 pt-4">
          <p className="text-lg font-bold text-ink">Reminders</p>
        </div>
        <div className="flex-1 space-y-3 px-4 py-3">
          {[
            "Finalize quarterly report",
            "Project sync",
            "Weekly design review",
          ].map((task) => (
            <div key={task} className="flex items-start gap-2 rounded-xl bg-[#f5f3ee] p-3">
              <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-ink/20" />
              <div>
                <p className="text-xs font-semibold text-ink">{task}</p>
                <p className="text-[10px] text-muted-ink">Auto-scheduled from your notes</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-around border-t border-ink/5 py-3">
          <Home className="h-4 w-4 text-muted-ink" />
          <ClipboardList className="h-4 w-4 text-muted-ink" />
          <Plus className="h-4 w-4 rounded-full bg-periwinkle p-0.5 text-white" />
          <Mic className="h-4 w-4 text-muted-ink" />
          <User className="h-4 w-4 text-muted-ink" />
        </div>
      </PhoneFrame>

      <PhoneFrame className="hidden sm:flex">
        <div className="relative flex flex-1 flex-col items-center justify-center gap-4 bg-gradient-to-b from-periwinkle/25 via-peach/25 to-orange/25 px-6 text-center">
          <p className="text-xs font-medium text-white/90">15 mins · Your Day, in Audio</p>
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow">
            <Play className="h-5 w-5 text-ink" fill="currentColor" />
          </button>
        </div>
        <div className="flex items-center justify-around border-t border-ink/5 py-3">
          <Home className="h-4 w-4 text-muted-ink" />
          <ClipboardList className="h-4 w-4 text-muted-ink" />
          <Mic className="h-4 w-4 rounded-full bg-periwinkle p-0.5 text-white" />
          <Bookmark className="h-4 w-4 text-muted-ink" />
          <User className="h-4 w-4 text-muted-ink" />
        </div>
      </PhoneFrame>

      <PhoneFrame className="hidden xl:flex">
        <div className="flex-1 bg-gradient-to-b from-periwinkle/30 via-peach/30 to-orange/30 px-5 pt-10">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
            Tuesday, Jul 22
          </p>
          <p className="mt-2 text-2xl font-bold text-white">Your Latest News</p>
        </div>
        <div className="flex items-center justify-around border-t border-ink/5 py-3">
          <Share2 className="h-4 w-4 text-muted-ink" />
          <Bookmark className="h-4 w-4 text-muted-ink" />
          <Pencil className="h-4 w-4 text-muted-ink" />
        </div>
      </PhoneFrame>
    </div>
  );
}
