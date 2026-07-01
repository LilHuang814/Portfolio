export function Hero() {
  return (
    <section className="relative mx-3 mt-3 overflow-hidden rounded-[2rem] sm:mx-6 sm:mt-6">
      <div className="gradient-mesh relative flex min-h-[560px] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
        <div className="grain-overlay" />

        <nav className="relative z-10 flex items-center justify-between">
          <span className="rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-ink shadow-sm">
            LH
          </span>
          <a
            href="/resume"
            className="rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-periwinkle shadow-sm transition hover:bg-white"
          >
            Resume
          </a>
        </nav>

        <div className="relative z-10 flex flex-1 items-center justify-center py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl">
            lily&rsquo;s portfolio
          </h1>
        </div>
      </div>
    </section>
  );
}
