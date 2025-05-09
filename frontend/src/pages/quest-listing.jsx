import { useEffect, useState } from "react";
import Card from "../components/card";
import Searchbar from "../components/searchbar";
import { fetchQuests } from "../repository/quest-api";

function QuestListing() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchQuests()
      .then((data) => {
        // Only show published quests
        setQuests(data.filter((q) => q.published));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quests");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-zinc-300">Loading quests...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!quests.length) return <div className="p-6 text-zinc-400">No quests available yet.</div>;

  return (
    <>
      <Searchbar />
      <div className="flex gap-4 justify-center flex-wrap">
        {quests.map((quest) => (
          <Card key={quest.id} quest={quest} />
        ))}
      </div>
    </>
  );
}

export default QuestListing;
