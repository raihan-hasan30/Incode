import { useEffect, useState } from "react";
import Card from "../components/card";
import Searchbar from "../components/searchbar";
import { fetchQuests } from "../repository/quest-api";

function QuestListing() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredQuests, setFilteredQuests] = useState([]);

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

  useEffect(() => {
    setFilteredQuests(
      quests.filter(
        (q) =>
          q.questName?.toLowerCase().includes(search.toLowerCase()) ||
          q.description?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, quests]);

  if (loading) return <div className="p-6 text-zinc-300">Loading quests...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!filteredQuests.length && search == "") return <div className="p-6 text-zinc-400">No quests available yet.</div>;

  return (
    <>
      <Searchbar value={search} onChange={setSearch} />
      <div className="flex gap-4 justify-center flex-wrap">
        {filteredQuests.map((quest) => (
          <Card key={quest.id} quest={quest} />
        ))}
        {search !== "" && !filteredQuests.length && (
          <div className="bg-zinc-800/50 p-8 text-center text-red-600">
            <p>Nothing found with your Query ({search})</p>
          </div>
        )}
      </div>
    </>
  );
}

export default QuestListing;
