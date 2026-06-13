import { useState } from "react";
import { PenLine, ChevronDown } from "lucide-react";
import { NOTE_COLORS } from "./NoteCard";
import type { NoteColor } from "./types";

interface ComposePanelProps {
  folders: string[];
  onSave: (title: string, body: string, color: NoteColor, folder?: string) => void;
}

export function ComposePanel({ folders, onSave }: ComposePanelProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState<NoteColor>("cream");
  const [folder, setFolder] = useState<string>("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!body.trim()) return;
    onSave(title.trim() || "Untitled", body.trim(), color, folder || undefined);
    setTitle("");
    setBody("");
    setColor("cream");
    setFolder("");
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div
      className="rounded-xl border border-border p-5 mb-6"
      style={{ background: NOTE_COLORS.find((c) => c.id === color)?.bg ?? "#faf7f2", boxShadow: "0 2px 12px rgba(60,40,20,0.07)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <PenLine size={15} className="text-accent" />
        <span
          className="text-muted-foreground"
          style={{ fontSize: "0.72rem", letterSpacing: "0.07em", textTransform: "uppercase" }}
        >
          New note
        </span>
      </div>

      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground mb-2"
        style={{ fontFamily: "'Lora', serif", fontSize: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}
      />

      <textarea
        placeholder="What's on your mind?"
        value={body}
        rows={3}
        onChange={(e) => setBody(e.target.value)}
        className="w-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground mt-2"
        style={{ fontSize: "0.88rem", lineHeight: "1.7" }}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave(); }}
      />

      {/* Toolbar */}
      <div
        className="flex items-center justify-between mt-3 pt-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          {/* Color picker */}
          <div className="flex items-center gap-1.5">
            {NOTE_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                title={c.label}
                className="rounded-full transition-transform duration-100 hover:scale-110"
                style={{
                  width: "16px",
                  height: "16px",
                  background: c.bg,
                  border: color === c.id ? "2px solid var(--accent)" : `1.5px solid ${c.border}`,
                  boxShadow: color === c.id ? "0 0 0 1px var(--accent)" : "none",
                }}
                aria-label={c.label}
              />
            ))}
          </div>

          {/* Folder selector */}
          {folders.length > 0 && (
            <div className="relative flex items-center gap-1 text-muted-foreground" style={{ fontSize: "0.78rem" }}>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="bg-transparent outline-none cursor-pointer appearance-none pr-4 text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: "0.78rem" }}
              >
                <option value="">No folder</option>
                {folders.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <ChevronDown size={11} className="absolute right-0 pointer-events-none" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground hidden sm:block" style={{ fontSize: "0.72rem" }}>⌘ Enter</span>
          <button
            onClick={handleSave}
            disabled={!body.trim()}
            className="px-4 py-1.5 rounded-lg text-primary-foreground transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: saved ? "var(--accent)" : "var(--primary)",
              fontSize: "0.83rem",
            }}
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
