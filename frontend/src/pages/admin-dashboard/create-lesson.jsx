import AddLessonForm from "../../components/admin/create-quest/add-lesson-form";

export default function CreateLesson() {
  return (
    <div className=" text-zinc-100">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-amber-600">Create Quest</h1>

        {/* Lessons Section */}
        <div className=" p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Lessons</h2>

          {/* List of added lessons */}
          {/* <LessonList /> */}

          {/* Add/Edit lesson form */}
          <AddLessonForm />
        </div>
      </div>
    </div>
  );
}
