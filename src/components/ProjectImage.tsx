import Image from "next/image";

export function ProjectImage({
  src,
  alt,
  width,
  height,
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  rounded?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1024px) 55vw, 100vw"
      className={`h-auto w-full ${rounded}`}
    />
  );
}
