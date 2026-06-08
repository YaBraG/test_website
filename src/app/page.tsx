import { LoginCard } from "@/components/auth/login-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            Course Planner
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Plan a clear path through your courses.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-700">
            Sign in to organize your completed courses, review upcoming
            requirements, and begin building a semester-by-semester pathway.
          </p>
        </section>

        <LoginCard />
      </div>
    </main>
  );
}
