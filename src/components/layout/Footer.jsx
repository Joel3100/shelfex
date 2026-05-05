export default function Footer() {
  return (
    <footer className="py-8 mt-16 text-center border-t border-gray-200 bg-slate-900">
      <p className="text-sm text-slate-400">
        Shelfex © {new Date().getFullYear()} - Reformed Library
      </p>
    </footer>
  );
}
