import { createContext, useContext, useState } from "react";

const NotesContext = createContext(null);

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const savedData = localStorage.getItem("notes");
    return savedData ? JSON.parse(savedData) : [];
  });

  function handleAddNote(title, body) {
    const newNote = {
      id: crypto.randomUUID(),
      title,
      body,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function handleDeleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((notes) => notes.id !== id));
  }

  function handleEditNote(id, newTitle, newBody) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title: newTitle, body: newBody } : note,
      ),
    );
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        onHandleAddNote: handleAddNote,
        onHandleDeleteNote: handleDeleteNote,
        onHandleEditNote: handleEditNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
