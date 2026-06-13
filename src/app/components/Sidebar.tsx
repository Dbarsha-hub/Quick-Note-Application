import { useState } from "react";
import {
  StickyNote,
  Clock,
  Star,
  Folder,
  FolderPlus,
  Archive,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export type SidebarView = "all" | "recent" | "favorites" | string;

interface SidebarProps {
  activeView: SidebarView;
  onViewChange: (view: SidebarView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  folders: string[];
  onAddFolder: (name: string) => void;
  darkMode: boolean;
}

export function Sidebar({
  activeView,
  onViewChange,
  collapsed,
  onToggleCollapse,
  folders,
  onAddFolder,
  darkMode,
}: SidebarProps) {
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [addingFolder, setAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  function submitFolder() {
    const name = newFolderName.trim();
    if (name) onAddFolder(name);
    setNewFolderName("");
    setAddingFolder(false);
  }

  const navItem = (
    view: SidebarView,
    Icon: React.ElementType,
    label: string
  ) => {
    const active = activeView === view;
    return (
      <button
        key={view}
        onClick={() => onViewChange(view)}
        className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-colors duration-100 text-left ${
          active
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
        style={{ fontSize: "0.88rem" }}
        title={collapsed ? label : undefined}
      >
        <Icon size={16} className="flex-shrink-0" />
        {!collapsed && <span>{label}</span>}
      </button>
    );
  };

  return (
    <aside
      className="flex flex-col border-r border-border bg-card transition-all duration-200 relative flex-shrink-0"
      style={{ width: collapsed ? "60px" : "220px", minHeight: "100%" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 border-b border-border"
        style={{ height: "64px" }}
      >
        <div
          className="flex items-center justify-center rounded-lg bg-accent flex-shrink-0"
          style={{ width: "30px", height: "30px" }}
        >
          <StickyNote size={15} className="text-accent-foreground" />
        </div>
        {!collapsed && (
          <span
            className="text-foreground"
            style={{ fontFamily: "'Lora', serif", fontSize: "1rem" }}
          >
            NoteKeep
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {!collapsed && (
          <p
            className="text-muted-foreground px-3 mb-1"
            style={{ fontSize: "0.7rem", letterSpacing: "0.07em", textTransform: "uppercase" }}
          >
            Notes
          </p>
        )}
        {navItem("all", StickyNote, "All Notes")}
        {navItem("recent", Clock, "Recent")}
        {navItem("favorites", Star, "Favorites")}

        <div className="my-2 border-t border-border" />

        {/* Folders section */}
        {!collapsed && (
          <button
            onClick={() => setFoldersOpen((o) => !o)}
            className="flex items-center justify-between w-full px-3 py-1 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "0.7rem", letterSpacing: "0.07em", textTransform: "uppercase" }}
          >
            <span>My Folders</span>
            <ChevronDown
              size={13}
              style={{ transform: foldersOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.15s" }}
            />
          </button>
        )}

        {(foldersOpen || collapsed) &&
          folders.map((folder) => navItem(`folder:${folder}`, Folder, folder))}

        {/* Add folder */}
        {!collapsed && foldersOpen && (
          <>
            {addingFolder ? (
              <div className="px-3 py-1">
                <input
                  autoFocus
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitFolder();
                    if (e.key === "Escape") setAddingFolder(false);
                  }}
                  onBlur={submitFolder}
                  placeholder="Folder name"
                  className="w-full bg-secondary rounded-md px-2 py-1 text-foreground outline-none border border-border"
                  style={{ fontSize: "0.83rem" }}
                />
              </div>
            ) : (
              <button
                onClick={() => setAddingFolder(true)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-secondary transition-colors"
                style={{ fontSize: "0.83rem" }}
              >
                <FolderPlus size={14} />
                <span>New Folder</span>
              </button>
            )}
          </>
        )}

        <div className="flex-1" />

        <div className="my-2 border-t border-border" />
        {navItem("archive", Archive, "Archive")}
        {navItem("settings", Settings, "Settings")}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 z-10 flex items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-secondary transition-colors"
        style={{ width: "22px", height: "22px" }}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
