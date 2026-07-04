import { Search, Moon, Sun, Bell } from "lucide-react";

interface HeaderProps {
  search: string;
  onSearchChange: (val: string) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function Header({ search, onSearchChange, darkMode, onToggleDark }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-8 border-b border-border bg-background flex-shrink-0"
      style={{ height: "64px" }}
    >
      {/* Greeting */}
      <div>
        <h2
          className="text-foreground"
          style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", lineHeight: 1.2 }}
        >
          👋 {getGreeting()}, Priya
        </h2>
        <p className="text-muted-foreground" style={{ fontSize: "0.78rem", marginTop: "1px" }}>
          Capture ideas, tasks, and reminders.
        </p>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 transition-shadow focus-within:ring-2 focus-within:ring-accent/30"
          style={{ width: "220px" }}
        >
          <Search size={14} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search notes…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-full"
            style={{ fontSize: "0.85rem" }}
          />
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="flex items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors"
          style={{ width: "36px", height: "36px" }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={15} className="text-muted-foreground" />
          ) : (
            <Moon size={15} className="text-muted-foreground" />
          )}
        </button>

        {/* Notification bell */}
        <button
          className="flex items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors"
          style={{ width: "36px", height: "36px" }}
          aria-label="Notifications"
        >
          <Bell size={15} className="text-muted-foreground" />
        </button>

        {/* Avatar */}
        <button
          className="flex items-center justify-center rounded-full text-accent-foreground flex-shrink-0 border-2 border-accent/40 hover:border-accent transition-colors"
          style={{ width: "36px", height: "36px", background: "var(--accent)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}
          aria-label="Profile"
        >
          P
        </button>
      </div>
    </header>
  );
}
