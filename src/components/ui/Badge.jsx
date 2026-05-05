export default function Badge({ label, variant = "blue" }) {
  const variants = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`${variants[variant]} text-xs px-3 py-1 rounded-full font-medium`}
    >
      {label}
    </span>
  );
}
