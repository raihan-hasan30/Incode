import { CheckCircle, ChevronDown, Gift, Globe, Heart, Terminal } from "lucide-react";

export default function Home() {
  const faqs = [
    {
      q: "Is Incode free to use?",
      a: "Yes! You can start practicing for free. Some advanced features may require an account.",
    },
    {
      q: "What topics can I practice?",
      a: "You can practice Docker, Git, Bash, and more. We’re adding new topics regularly.",
    },
    {
      q: "How does Incode help me learn?",
      a: "By typing real commands and code, you build muscle memory and confidence—much faster than passive reading.",
    },
    {
      q: "Can I track my progress?",
      a: "Yes! You’ll see your XP, badges, streaks, and detailed session stats.",
    },
  ];
  return (
    <div>
      <section className="px-4 pt-8 pb-12 mx-auto">
        <div className="text-center sm:text-left">
          <p className="text-amber-400 mb-2 font-semibold tracking-wide">Practice. Type. Master.</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Build Muscle Memory for Real-World Coding
            <br />
            <span className="text-amber-400">with Incode</span>
          </h1>

          <p className="text-lg mb-8 max-w-2xl text-zinc-300 mx-auto sm:mx-0">
            Forget syntax anxiety. Incode helps you master programming and CLI commands by{" "}
            <span className="text-amber-400 font-semibold">typing and practicing real-world code</span>—making you
            faster, more confident, and job-ready. Perfect for developers, DevOps, and anyone who wants to level up
            their command-line and coding skills.
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-6 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>Practice Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>Battle Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>Instant Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>XP, Badges & Streaks</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <a
              href="/register"
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-full px-6 py-2 flex items-center gap-2 shadow-lg transition-all"
            >
              Get Started Free <span className="ml-1">→</span>
            </a>
            <a
              href="/quest-list"
              className="border border-zinc-700 rounded-full px-6 py-2 hover:bg-zinc-800 text-white transition-all"
            >
              Browse Quests
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Who is Incode for?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Terminal size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">Junior Developers</h3>
            <p className="text-zinc-400 text-sm text-center">
              Learning new tech stacks or tools? Build confidence by practicing real code and commands.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Gift size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">Career Switchers</h3>
            <p className="text-zinc-400 text-sm text-center">
              Need rapid, muscle memory-based training? Incode makes it engaging and effective.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Globe size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">DevOps Enthusiasts</h3>
            <p className="text-zinc-400 text-sm text-center">
              Practice CLI tools like Docker, Git, Bash, and more—no more forgetting commands.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Heart size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">Instructors</h3>
            <p className="text-zinc-400 text-sm text-center">
              Recommend a modern, interactive training method to your students.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Practice Mode</h3>
            <p className="text-zinc-300 text-sm">
              Type real commands and code snippets. Get instant feedback and build muscle memory.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Battle Mode</h3>
            <p className="text-zinc-300 text-sm">Challenge yourself with no hints. Compete for XP and badges.</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Result Summary</h3>
            <p className="text-zinc-300 text-sm">
              See your typing speed, accuracy, XP, and mistakes after every session.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Profile & Streaks</h3>
            <p className="text-zinc-300 text-sm">
              Track your XP, badges, and recent practice results. Keep your streak alive!
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Topic Selection</h3>
            <p className="text-zinc-300 text-sm">
              Choose from topics like Docker, Git, Bash, and more. New topics added regularly.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Modern UI</h3>
            <p className="text-zinc-300 text-sm">Beautiful, distraction-free interface designed for focus and speed.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Why Incode?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ul className="space-y-4 text-zinc-300">
              <li>
                <span className="text-amber-400 font-bold">Forget syntax anxiety:</span> Practice real code, not just
                theory.
              </li>
              <li>
                <span className="text-amber-400 font-bold">Engaging, not boring:</span> Interactive, gamified practice
                beats static cheat sheets.
              </li>
              <li>
                <span className="text-amber-400 font-bold">Track your growth:</span> See your progress, XP, and streaks.
              </li>
              <li>
                <span className="text-amber-400 font-bold">For all levels:</span> Whether you’re a beginner or pro,
                Incode adapts to you.
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="/logo.svg" alt="Incode Logo" className="w-32 h-32 mb-4" />
            <a
              href="/register"
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-full px-6 py-2 shadow-lg transition-all"
            >
              Start Practicing Free
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-zinc-900 rounded-lg p-4">
              <button className="flex justify-between items-center w-full text-left text-white">
                <span>{item.q}</span>
                <ChevronDown size={20} />
              </button>
              <div className="text-zinc-400 text-sm mt-2">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-sm text-zinc-400">&copy; {new Date().getFullYear()} Incode</div>
          <div className="text-sm text-zinc-400 flex gap-4">
            <a href="/terms" className="hover:text-amber-400">
              Terms of Use
            </a>
            <a href="/privacy" className="hover:text-amber-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
