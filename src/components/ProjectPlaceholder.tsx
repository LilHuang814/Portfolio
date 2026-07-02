import { ImageIcon } from "lucide-react";

/**
 * Placeholder for a project image. Drop a PNG into /public/projects/ and
 * swap this for a next/image, e.g.:
 *   <Image src="/projects/blour.png" alt="Blour" width={1200} height={900} />
 */
export function ProjectPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-dashed border-ink/20 bg-white/40">
      <div className="flex flex-col items-center gap-2 text-center text-muted-ink">
        <ImageIcon className="h-9 w-9" strokeWidth={1.5} />
        <span className="text-sm font-medium text-ink/70">{name}</span>
        <span className="text-xs text-muted-ink/70">
          /public/projects/{name.toLowerCase().replace(/\s+/g, "-")}.png
        </span>
      </div>
    </div>
  );
}
