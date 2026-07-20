export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search books or authors ..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}
