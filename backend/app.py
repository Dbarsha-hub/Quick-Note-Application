from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "database.db"

# Create database table
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        body TEXT,
        color TEXT,
        folder TEXT,
        favorite INTEGER DEFAULT 0,
        createdAt TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

# Home
@app.route("/")
def home():
    return "Backend is running!"

# Get all notes
@app.route("/notes", methods=["GET"])
def get_notes():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notes ORDER BY id DESC")

    rows = cursor.fetchall()

    conn.close()

    notes = []

    for row in rows:
        notes.append(dict(row))

    return jsonify(notes)

# Save note
@app.route("/notes", methods=["POST"])
def save_note():

    data = request.json

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO notes
        (title, body, color, folder, favorite, createdAt)
        VALUES (?, ?, ?, ?, ?, ?)
    """,(
        data["title"],
        data["body"],
        data["color"],
        data.get("folder"),
        0,
        data["createdAt"]
    ))

    conn.commit()
    conn.close()

    return jsonify({"message":"Saved Successfully"})


    
 # Delete note
@app.route("/notes/<int:id>", methods=["DELETE"])
def delete_note(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("DELETE FROM notes WHERE id = ?", (id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Note Deleted"})


# Toggle Favorite
@app.route("/notes/<int:id>/favorite", methods=["PUT"])
def toggle_favorite(id):

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE notes SET favorite = CASE WHEN favorite = 1 THEN 0 ELSE 1 END WHERE id = ?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Favorite Updated"})


# Update Note
@app.route("/notes/<int:id>", methods=["PUT"])
def update_note(id):

    data = request.json

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE notes
        SET title = ?, body = ?, color = ?, folder = ?
        WHERE id = ?
    """, (
        data["title"],
        data["body"],
        data["color"],
        data.get("folder"),
        id
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Note Updated"})

if __name__ == "__main__":
    app.run(debug=True)   

