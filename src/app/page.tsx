export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">
            Full-Stack Website
          </div>

          <nav className="hidden gap-6 text-sm text-slate-300 sm:flex">
            <a className="transition hover:text-white" href="#about">
              About
            </a>
            <a className="transition hover:text-white" href="#features">
              Features
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        <div className="flex flex-1 items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
              Project foundation
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              A clean starting point for a full-stack web app.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This project is set up with Next.js, React, TypeScript, and
              Tailwind CSS. The next step is defining what the website should
              do, then building the front end and backend around that goal.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#features"
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                View structure
              </a>

              <a
                href="#about"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Project notes
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}