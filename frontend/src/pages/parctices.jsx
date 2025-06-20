import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CongratulationsDialog from "../components/CongratulationsDialog";
import Lessons from "../components/lessons";
import LessonsBody from "../components/lessonsBody";
import LessonsSummary from "../components/lessonsSummary";
import { fetchLessons } from "../repository/lesson-api";
import { fetchQuests } from "../repository/quest-api";

function AllParctices() {
  const { questId } = useParams();
  const [quest, setQuest] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonHistory, setLessonHistory] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typingStats, setTypingStats] = useState({});
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchQuests()
      .then(async (quests) => {
        const published = quests.filter((q) => q.published);
        if (!published.length) {
          setError("No published quests available.");
          setLoading(false);
          return;
        }
        let selected = published[0];
        if (questId) {
          const found = published.find((q) => q.id === questId);
          if (found) selected = found;
          else {
            setError("Quest not found.");
            setLoading(false);
            return;
          }
        }
        setQuest(selected);
        // Fetch lessons for this quest
        try {
          const lessonList = await fetchLessons(selected.id);
          setLessons(lessonList);
          setActiveIndex(lessonList.length ? 0 : -1);
        } catch {
          setLessons([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quest data.");
        setLoading(false);
      });
  }, [questId]);

  useEffect(() => {
    if (lessons.length && activeIndex >= lessons.length) {
      setShowCongrats(true);
    }
  }, [activeIndex, lessons.length]);

  if (loading) return <div className="p-8 text-zinc-300 text-center text-lg">Loading quest and lessons...</div>;
  if (error) return <div className="p-8 text-red-500 text-center text-lg">{error}</div>;
  if (!quest || !lessons.length)
    return <div className="p-8 text-zinc-400 text-center text-lg">No lessons available for this quest.</div>;

  return (
    <div className="flex justify-between py-10 gap-10 max-w-7xl mx-auto">
      {showCongrats && (
        <CongratulationsDialog
          onClose={() => {
            setShowCongrats(false);
            setActiveIndex(0);
          }}
          typingStats={typingStats}
          lessonHistory={lessonHistory}
          lessons={lessons}
        />
      )}
      <div className="w-1/4 min-w-[220px]">
        <Lessons lessons={lessons} activeIndex={activeIndex} quest={quest} setActiveIndex={setActiveIndex} />
      </div>
      <div className="flex-1">
        {activeIndex < lessons.length && (
          <LessonsBody
            lesson={lessons[activeIndex]}
            setActiveIndex={setActiveIndex}
            lessonHistory={lessonHistory}
            setLessonHistory={setLessonHistory}
            lessons={lessons}
            typingStats={typingStats}
            setTypingStats={setTypingStats}
          />
        )}
      </div>
      <div className="w-1/4 min-w-[220px]">
        <LessonsSummary lessons={lessons} lessonHistory={lessonHistory} typingStats={typingStats} quest={quest} />
      </div>
    </div>
  );
}

export default AllParctices;
