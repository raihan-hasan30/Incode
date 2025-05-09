import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import createQuestAPI from "../../../repository/create-quest-api";

export default function QuestForm() {
  const fileInputRef = useRef(null);
  const [published, setPublished] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  let navigate = useNavigate();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  };

  function togglePublish() {
    setPublished(!published);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("published", published);
    if (logoFile) {
      formData.set("logo", logoFile);
    }

    createQuestAPI(formData)
      .then((response) => {
        navigate(`/admin/${response.id}/lesson`);
        console.log("Quest created successfully:", response);
      })
      .catch((error) => {
        console.error("Error creating quest:", error);
        alert("Error creating quest: " + error.message);
      });
  }

  return (
    <div className="border border-zinc-700/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Quest Details</h2>

      <form className="space-y-4 flex gap-8" onSubmit={handleSubmit}>
        {/* Quest Name */}
        <div className="w-full">
          <label htmlFor="questName" className="block text-sm font-medium mb-1">
            Quest Name
          </label>
          <input
            type="text"
            id="questName"
            name="questName"
            className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            placeholder="Enter quest name"
            required
          />

          <div className="flex justify-between my-4">
            {/* Publish Toggle */}
            <div className="flex items-center mt-4">
              <button
                type="button"
                onClick={togglePublish}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                  published ? "bg-amber-600" : "bg-zinc-500"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    published ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm">{published ? "Published" : "Unpublished"}</span>
            </div>

            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Save Quest
            </button>
          </div>
        </div>

        <div className="w-full">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Quest Logo</label>

            <div className="flex items-start space-x-4">
              {/* Logo Preview */}
              <div className="flex-shrink-0">
                {logoPreview ? (
                  <div className="relative w-24 h-24 bg-zinc-700 rounded-md overflow-hidden">
                    <img src={logoPreview} alt="Quest logo preview" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-zinc-700 rounded-md flex items-center justify-center">
                    <span className="text-zinc-400 text-xs text-center">No logo uploaded</span>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-grow">
                <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="inline-flex items-center px-4 py-2 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-zinc-100 bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Upload Logo
                </button>
                <p className="mt-1 text-xs text-zinc-400">Upload a square image (SVG, PNG, or JPG)</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
