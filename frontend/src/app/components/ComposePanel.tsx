import { useState, useEffect } from "react";
import { PenLine, ChevronDown } from "lucide-react";
import { NOTE_COLORS } from "./NoteCard";
import type { Note, NoteColor } from "./types";

interface ComposePanelProps {
  folders: string[];
  onSave: (
    title: string,
    body: string,
    color: NoteColor,
    folder?: string
  ) => void;
  editingNote?: Note | null;
  onCancelEdit: () => void;
}

export function ComposePanel({
  folders,
  onSave,
  editingNote,
  onCancelEdit,
}: ComposePanelProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState<NoteColor>("cream");
  const [folder, setFolder] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setBody(editingNote.body);
      setColor(editingNote.color);
      setFolder(editingNote.folder ?? "");
    } else {
      setTitle("");
      setBody("");
      setColor("cream");
      setFolder("");
    }
  }, [editingNote]);

  function handleSave() {
    if (!body.trim()) return;

    onSave(
      title.trim() || "Untitled",
      body.trim(),
      color,
      folder || undefined
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);

    if (!editingNote) {
      setTitle("");
      setBody("");
      setColor("cream");
      setFolder("");
    }
  }

  return (
    <div
      className="rounded-xl border border-border p-5 mb-6"
      style={{
        background:
          NOTE_COLORS.find((c) => c.id === color)?.bg ?? "#faf7f2",
        boxShadow: "0 2px 12px rgba(60,40,20,0.07)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <PenLine size={15} className="text-accent" />

        <span
          className="text-muted-foreground"
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          {editingNote ? "Edit Note" : "New Note"}
        </span>
      </div>

      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground mb-2"
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "1rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "0.4rem",
        }}
      />

      <textarea
        placeholder="What's on your mind?"
        value={body}
        rows={3}
        onChange={(e) => setBody(e.target.value)}
        className="w-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground mt-2"
        style={{
          fontSize: "0.88rem",
          lineHeight: "1.7",
        }}
      />

      <div
        className="flex items-center justify-between mt-3 pt-3"
        style={{
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {NOTE_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                className="rounded-full"
                style={{
                  width: "16px",
                  height: "16px",
                  background: c.bg,
                  border:
                    color === c.id
                      ? "2px solid var(--accent)"
                      : `1px solid ${c.border}`,
                }}
              />
            ))}
          </div>

          {/* Folder */}
          {folders.length > 0 && (
            <div
              className="relative flex items-center"
              style={{ fontSize: "0.78rem" }}
            >
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="bg-transparent outline-none appearance-none pr-4"
              >
                <option value="">No folder</option>

                {folders.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={11}
                className="absolute right-0 pointer-events-none"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {editingNote && (
            <button
              onClick={onCancelEdit}
              className="px-3 py-1.5 rounded-lg border border-border"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={!body.trim()}
            className="px-4 py-1.5 rounded-lg text-primary-foreground disabled:opacity-40"
            style={{
              background: "var(--primary)",
            }}
          >
            {saved
              ? "Saved ✓"
              : editingNote
              ? "Update"
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}