import { useState, useMemo, useEffect } from "react";
import { StickyNote, PenLine } from "lucide-react";
import { Sidebar, type SidebarView } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ComposePanel } from "./components/ComposePanel";
import { NoteCard } from "./components/NoteCard";
import type { Note, NoteColor } from "./components/types";

const DEFAULT_FOLDERS = ["Personal", "Family", "Health", "Travel", "Study", "Recipes"];

const SEED_NOTES: Note[] = [
  {
    id: "1",
    title: "Meeting recap",
    body: "Discussed Q3 roadmap with the team. Key action items: finalize the onboarding flow by Friday, schedule a design review for next Wednesday.",
    color: "cream",
    folder: "Personal",
    favorite: true,
    createdAt: new Date("2026-06-12T14:30:00"),
  },
  {
    id: "2",
    title: "Book recommendations",
    body: "– The Years, Annie Ernaux\n– Educated, Tara Westover\n– A Pattern Language, Christopher Alexander",
    color: "lavender",
    folder: "Study",
    favorite: false,
    createdAt: new Date("2026-06-11T09:15:00"),
  },
  {
    id: "3",
    title: "Weekend trip ideas",
    body: "Look into Ooty or Coorg for July. Check train schedules and book accommodation early — last time everything was booked out.",
    color: "green",
    folder: "Travel",
    favorite: true,
    createdAt: new Date("2026-06-10T18:00:00"),
  },
  {
    id: "4",
    title: "Masala chai recipe",
    body: "2 cups water, 1 cup milk, 2 tsp tea leaves, cardamom, ginger, cinnamon. Boil water with spices 5 min, add tea, simmer 2 min, add milk.",
    color: "pink",
    folder: "Recipes",
    favorite: false,
    createdAt: new Date("2026-06-09T11:00:00"),
  },
  {
    id: "5",
    title: "Doctor's appointment",
    body: "Dr. Mehta — June 20, 11:00 AM. Bring last blood reports. Ask about Vitamin D supplement dosage.",
    color: "blue",
    folder: "Health",
    favorite: false,
    createdAt: new Date("2026-06-08T08:30:00"),
  },
];

function viewLabel(view: SidebarView): string {
  if (view === "all") return "All Notes";
  if (view === "recent") return "Recent";
  if (view === "favorites") return "Favorites";
  if (view === "archive") return "Archive";
  if (view === "settings") return "Settings";
  if (view.startsWith("folder:")) return view.replace("folder:", "");
  return view;
}

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const [notes, setNotes] = useState<Note[]>(SEED_NOTES);
  const [folders, setFolders] = useState<string[]>(DEFAULT_FOLDERS);
  const [activeView, setActiveView] = useState<SidebarView>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showCompose, setShowCompose] = useState(false);

  // Apply dark class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  function addNote(title: string, body: string, color: NoteColor, folder?: string) {
    setNotes((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        body,
        color,
        folder,
        favorite: false,
        createdAt: new Date(),
      },
      ...prev,
    ]);
    setShowCompose(false);
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function toggleFavorite(id: string) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite } : n))
    );
  }

  function addFolder(name: string) {
    setFolders((prev) => (prev.includes(name) ? prev : [...prev, name]));
  }

  const visibleNotes = useMemo(() => {
    let filtered = notes;

    if (activeView === "recent") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 3);
      filtered = notes.filter((n) => n.createdAt >= cutoff);
    } else if (activeView === "favorites") {
      filtered = notes.filter((n) => n.favorite);
    } else if (activeView.startsWith("folder:")) {
      const folderName = activeView.replace("folder:", "");
      filtered = notes.filter((n) => n.folder === folderName);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [notes, activeView, search]);

  const isSpecialView = activeView === "archive" || activeView === "settings";

  return (
    <div
      className="flex size-full min-h-screen bg-background"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        folders={folders}
        onAddFolder={addFolder}
        darkMode={darkMode}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          search={search}
          onSearchChange={setSearch}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
        />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Page heading + New Note button */}
          {!isSpecialView && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  className="text-foreground"
                  style={{ fontFamily: "'Lora', serif", fontSize: "1.3rem" }}
                >
                  {viewLabel(activeView)}
                </h1>
                <p className="text-muted-foreground" style={{ fontSize: "0.78rem", marginTop: "2px" }}>
                  {visibleNotes.length} {visibleNotes.length === 1 ? "note" : "notes"}
                </p>
              </div>
              <button
                onClick={() => setShowCompose((s) => !s)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary-foreground transition-colors hover:opacity-90"
                style={{ background: "var(--primary)", fontSize: "0.85rem" }}
              >
                <PenLine size={14} />
                New Note
              </button>
            </div>
          )}

          {/* Compose */}
          {showCompose && !isSpecialView && (
            <ComposePanel folders={folders} onSave={addNote} />
          )}

          {/* Special views */}
          {activeView === "settings" && (
            <div className="text-muted-foreground text-center py-20" style={{ fontSize: "0.9rem" }}>
              Settings coming soon.
            </div>
          )}
          {activeView === "archive" && (
            <div className="text-muted-foreground text-center py-20" style={{ fontSize: "0.9rem" }}>
              Archive is empty.
            </div>
          )}

          {/* Notes grid */}
          {!isSpecialView && (
            <>
              {visibleNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div
                    className="flex items-center justify-center rounded-2xl"
                    style={{ width: "72px", height: "72px", background: "var(--secondary)" }}
                  >
                    <StickyNote size={32} className="text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p
                      className="text-foreground mb-1"
                      style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem" }}
                    >
                      No notes yet
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                      {search ? "No notes match your search." : "Start writing your first note."}
                    </p>
                  </div>
                  {!search && (
                    <button
                      onClick={() => setShowCompose(true)}
                      className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-lg text-primary-foreground"
                      style={{ background: "var(--primary)", fontSize: "0.85rem" }}
                    >
                      <PenLine size={14} />
                      Create Note
                    </button>
                  )}
                </div>
              ) : (
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  }}
                >
                  {visibleNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={deleteNote}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
