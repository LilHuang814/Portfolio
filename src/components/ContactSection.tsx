export function ContactSection() {
  return (
    <section className="relative mx-3 my-6 overflow-hidden rounded-[2rem] sm:mx-6 sm:my-10">
      <div className="gradient-mesh relative flex min-h-[420px] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
        <div className="grain-overlay" />

        <div className="relative z-10 flex flex-1 items-center justify-center py-16 text-center">
          <h2 className="text-5xl font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl">
            contact me
          </h2>
        </div>

        <div className="relative z-10 flex flex-col gap-6 text-white sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-white/70">Email</p>
            <a href="mailto:sh835@cornell.edu" className="mt-1 block text-lg font-medium">
              sh835@cornell.edu
            </a>
          </div>
          <div>
            <p className="eyebrow text-white/70">Location</p>
            <p className="mt-1 text-lg font-medium">Bay Area · Shanghai</p>
          </div>
          <div>
            <p className="eyebrow text-white/70">Currently</p>
            <p className="mt-1 text-lg font-medium">Open to product design roles</p>
          </div>
        </div>
      </div>
    </section>
  );
}
