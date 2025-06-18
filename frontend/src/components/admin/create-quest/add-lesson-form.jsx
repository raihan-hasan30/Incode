import { useParams } from "react-router";
import createLessonAPI from "../../../repository/create-lesson-api";

export default function AddLessonForm() {
  const { questId } = useParams();

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name")?.trim();
    const summary = formData.get("summary")?.trim();
    const command = formData.get("command")?.trim();

    if (!name || !summary || !command) {
      alert("Please fill in all fields.");
      return;
    }

    const params = { name, summary, command };
    createLessonAPI(questId, params)
      .then((response) => {
        if (response) {
          alert("Lesson created successfully!");
        } else {
          alert("Error creating lesson.");
          console.error("Error creating lesson:", response);
        }
      })
      .catch((error) => {
        alert("Error creating lesson: " + error.message);
        console.error("Error creating lesson:", error);
      })
      .finally(() => {
        // Reset the form fields
        e.target.reset();
      });
  }

  return (
    <div className="mt-6">
      <div className="">
        <h3 className="font-medium">Add New Lesson</h3>

        <form onSubmit={handleFormSubmit} className="space-y-3">
          {/* Lesson Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Lesson Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Enter lesson name"
              name="name"
              required
            />
          </div>

          {/* Lesson Summary */}
          <div>
            <label htmlFor="summary" className="block text-sm font-medium mb-1">
              Lesson Summary
            </label>
            <textarea
              id="summary"
              rows="3"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Enter lesson summary"
              name="summary"
              required
            />
          </div>

          {/* Command */}
          <div>
            <label htmlFor="command" className="block text-sm font-medium mb-1">
              Command
            </label>
            <input
              id="command"
              type="text"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Enter command"
              name="command"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              Add Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
