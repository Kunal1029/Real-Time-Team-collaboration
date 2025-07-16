import { useState } from "react";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; description: string }) => void;
}

export const TeamModel: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ name, description });
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative p-4 w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Team
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Team Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Avengers"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief about the team..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg"
            >
              Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
