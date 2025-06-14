import { Link } from "react-router";

function Card({ quest }) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 w-72 shadow-xl border border-zinc-700 cursor-pointer group transition-all duration-500 hover:-translate-y-1 flex flex-col items-center relative group">
      {/* Logo */}
      {quest?.logo ? (
        <img
          src={import.meta.env.VITE_API_URL + quest.logo}
          className="w-20 h-20 mb-4 bg-white p-2 rounded-xl  object-contain border-2 border-transparent group-hover:border-amber-600 shadow-lg group-hover:shadow-amber-600/50 transition-all duration-300"
          alt={quest.questName}
        />
      ) : (
        <div className="w-20 h-20 mb-4 bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-400 text-base border-2 border-zinc-600">
          No Logo
        </div>
      )}
      {/* Quest Name */}
      <h2 className="text-white text-2xl font-extrabold mb-2 text-center tracking-tight group-hover:text-amber-600 transition-colors">
        {quest.questName}
      </h2>
      {/* ID badge */}
      <span className="text-xs font-mono text-zinc-400 bg-zinc-700 px-2 py-0.5 rounded mb-3">
        {quest.id.slice(0, 8)}
      </span>
      {/* Lessons & Challenges */}
      <div className="flex justify-center gap-6 w-full mb-4">
        <div className="flex flex-col items-center">
          <span className="text-amber-400 text-lg font-bold">{quest.lessonsCount ?? 0}</span>
          <span className="text-xs text-zinc-400 mt-1">Lessons</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-amber-400 text-lg font-bold">{quest.challenges ?? 0}</span>
          <span className="text-xs text-zinc-400 mt-1">Challenges</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex justify-between w-full mt-auto pt-4 border-t border-zinc-700 gap-2">
        <Link
          to={`/practice/${quest.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-amber-500 text-white font-bold py-2 rounded-lg  text-sm shadow focus:outline-none focus:ring-2 focus:ring-amber-600 hover:shadow-lg hover:shadow-amber-600/50 transition-all duration-300"
        >
          <img src="/link.svg" alt="link" className="w-4 h-4" /> Practice
        </Link>
        <Link
          to={`/battle/${quest.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-amber-500 text-white font-bold py-2 rounded-lg  text-sm shadow focus:outline-none focus:ring-2 focus:ring-amber-600 hover:shadow-lg hover:shadow-amber-600/50 transition-all duration-300"
          disabled
        >
          <img src="/link.svg" alt="link" className="w-4 h-4" /> Battle
        </Link>
      </div>
    </div>
  );
}

export default Card;
