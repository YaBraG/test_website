"use client";

import { useState } from "react";
import { LoginCard } from "@/components/auth/login-card";

export function CoursePlannerExperience() {
  const [isPlannerVisible, setIsPlannerVisible] = useState(false);

  return (
    <div
      className={`mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col gap-10 ${
        isPlannerVisible
          ? "justify-start"
          : "justify-center lg:flex-row lg:items-center lg:justify-between"
      }`}
    >
      {!isPlannerVisible ? (
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
      ) : null}

      <LoginCard onPlannerViewChange={setIsPlannerVisible} />
    </div>
  );
}
