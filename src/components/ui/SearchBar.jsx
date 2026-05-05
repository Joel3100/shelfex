export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search books or authors ..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-64 px-4 py-2 text-sm border border-gray-200 rounded-lg"
    />
  );
}
