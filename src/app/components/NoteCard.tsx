import { Trash2, Star } from "lucide-react";
import type { Note, NoteColor } from "./types";

export const NOTE_COLORS: { id: NoteColor; label: string; bg: string; border: string }[] = [
  { id: "cream",   label: "Cream",      bg: "#faf7f2", border: "rgba(60,40,20,0.12)" },
  { id: "blue",    label: "Light Blue", bg: "#e8f1fb", border: "rgba(50,90,180,0.15)" },
  { id: "green",   label: "Light Green",bg: "#e6f4ea", border: "rgba(40,130,80,0.15)" },
  { id: "pink",    label: "Light Pink", bg: "#fce8ef", border: "rgba(180,60,100,0.15)" },
  { id: "lavender",label: "Lavender",   bg: "#ede8f9", border: "rgba(100,60,200,0.15)" },
];

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NoteCard({ note, onDelete, onToggleFavorite }: NoteCardProps) {
  const colorDef = NOTE_COLORS.find((c) => c.id === note.color) ?? NOTE_COLORS[0];

  return (
    <div
      className="rounded-xl p-4 group transition-shadow duration-150 hover:shadow-md"
      style={{
        background: colorDef.bg,
        border: `1px solid ${colorDef.border}`,
        boxShadow: `0 1px 6px rgba(60,40,20,0.05)`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className="text-foreground truncate flex-1"
          style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem" }}
        >
          {note.title}
        </h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleFavorite(note.id)}
            className="p-1 rounded-md hover:bg-black/8 transition-colors"
            aria-label="Toggle favorite"
          >
            <Star
              size={13}
              className={note.favorite ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}
            />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1 rounded-md hover:bg-black/8 transition-colors text-muted-foreground hover:text-destructive"
            aria-label="Delete note"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <p
        className="text-foreground whitespace-pre-wrap line-clamp-4"
        style={{ fontSize: "0.85rem", lineHeight: "1.65", opacity: 0.78 }}
      >
        {note.body}
      </p>

      <div className="flex items-center justify-between mt-3 pt-2" style={{ borderTop: `1px solid ${colorDef.border}` }}>
        <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
          {formatDate(note.createdAt)}
        </span>
        {note.folder && (
          <span
            className="text-muted-foreground rounded-full px-2 py-0.5"
            style={{ fontSize: "0.68rem", background: "rgba(0,0,0,0.06)" }}
          >
            {note.folder}
          </span>
        )}
      </div>
    </div>
  );
}
