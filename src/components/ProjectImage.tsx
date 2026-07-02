import Image from "next/image";

export function ProjectImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1024px) 55vw, 100vw"
      className="h-auto w-full rounded-2xl shadow-sm ring-1 ring-ink/5"
    />
  );
}
