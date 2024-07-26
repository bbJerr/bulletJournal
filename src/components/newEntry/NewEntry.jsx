import React from "react";
import "./newentry.css";

const NewEntry = ({ isOpen, onClose, onSave }) => {
  const [journalEntry, setJournalEntry] = React.useState("");

  const handleSave = () => {
    onSave(journalEntry);
    setJournalEntry(""); // Clear input
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Journal Entry</h2>
        <input
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Write your journal entry here..."
        />
        <div className="buttons">
          <button onClick={handleSave}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
