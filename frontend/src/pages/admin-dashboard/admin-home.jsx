import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StatCard({ title, value, icon, to }) {
  return (
    <Link
      to={to}
      className="flex-1 min-w-[180px] bg-zinc-800 rounded-xl p-6 flex flex-col items-center shadow hover:bg-zinc-700 transition-colors"
    >
      <div className="mb-2 text-amber-400">{icon}</div>
      <div className="text-3xl font-bold text-zinc-100">{value}</div>
      <div className="text-zinc-400 mt-1 text-sm">{title}</div>
    </Link>
  );
}

function AdminHome() {
  const [stats, setStats] = useState({ users: 0, quests: 0, lessons: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get("/api/users/stats");
        setStats(res.data);
      } catch {
        setStats({ users: 0, quests: 0, lessons: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <h1 className="text-4xl font-bold text-zinc-100 mb-2">Admin Dashboard</h1>
      <p className="text-zinc-400 mb-8">Welcome! Manage your application at a glance.</p>
      <div className="flex flex-wrap gap-6 w-full max-w-3xl mb-10 justify-center">
        <StatCard
          title="Registered Users"
          value={loading ? "..." : stats.users}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368"
              />
            </svg>
          }
          to="/admin/users"
        />
        <StatCard
          title="Quests"
          value={loading ? "..." : stats.quests}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
          }
          to="/admin/quest"
        />
        <StatCard
          title="Lessons"
          value={loading ? "..." : stats.lessons}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
          }
          to="/admin/lesson"
        />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Link
          to="/admin/quest"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
        >
          Create or Manage Quests
        </Link>
        <Link
          to="/admin/lesson"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
        >
          Create or Manage Lessons
        </Link>
        <Link
          to="/admin/users"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
        >
          View All Users
        </Link>
      </div>
    </div>
  );
}

export default AdminHome;
