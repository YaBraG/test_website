"use client";

import { FormEvent, useState } from "react";
import { testUser } from "@/data/test-user";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValidLogin =
      email.trim().toLowerCase() === testUser.email &&
      password === testUser.password;

    if (!isValidLogin) {
      setIsSignedIn(false);
      setErrorMessage("Enter the test student email and password to continue.");
      return;
    }

    setErrorMessage("");
    setIsSignedIn(true);
  }

  if (isSignedIn) {
    return (
      <section className="w-full max-w-xl rounded-lg border border-emerald-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Signed in
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Welcome, {testUser.name}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          You are signed in to the SAS course planner. The next step will be
          choosing a discipline.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          SAS Course Planner
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Student sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use the test student account to preview the course planning
          experience.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-800"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-800"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            required
          />
        </div>

        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-md bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
