export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4 mb-6">
      <div className="container flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-semibold tracking-tight">
          PostHog AI Chart Assistant
        </h1>
      </div>
    </header>
  );
}
