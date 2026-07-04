export type NoteColor = "cream" | "blue" | "green" | "pink" | "lavender";

export interface Note {
  id: string;
  title: string;
  body: string;
  color: NoteColor;
  folder?: string;
  favorite: boolean;
  createdAt: Date;
}
