import { useReadingStatus } from "../../context/ReadingStatusContext";

const STATUSES = [
  { value: "reading", label: "📖 Reading" },
  { value: "completed", label: "✔️ Completed" },
  { value: "planned", label: "🕐 Planned" },
];

export default function ReadingStatusSelector({ bookId }) {
  const { statuses, updateStatus } = useReadingStatus();
  const current = statuses[bookId];

  return (
    <div className="flex gap-2 mt-6">
      {STATUSES.map((s) => (
        <button
          key={s.value}
          onClick={() => updateStatus(bookId, s.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
            ${current === s.value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
