import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JournalPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [mood, setMood] = useState(1);
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    const savedEntry = localStorage.getItem(date);
    const savedNotes = JSON.parse(localStorage.getItem(`${date}_notes`)) || [];
    const savedMood = localStorage.getItem(`${date}_mood`);
    const savedHabits =
      JSON.parse(localStorage.getItem(`${date}_habits`)) || [];

    if (savedEntry) {
      setJournalEntry(savedEntry);
    }
    setNotes(savedNotes);
    if (savedMood) {
      setMood(Number(savedMood));
    }
    setHabits(savedHabits);
  }, [date]);

  const handleSave = () => {
    localStorage.setItem(date, journalEntry);
    localStorage.setItem(`${date}_notes`, JSON.stringify(notes));
    localStorage.setItem(`${date}_mood`, mood);
    localStorage.setItem(`${date}_habits`, JSON.stringify(habits));
    alert("Journal entry saved!");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote("");
    }
  };

  const handleRemoveNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { text: newHabit.trim(), completed: false }]);
      setNewHabit("");
    }
  };

  const handleToggleHabit = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  return (
    <div>
      <h3>Journal Entry for {date}</h3>
      <h4>Title</h4>
      {isEditing ? (
        <>
          <br />
          <div>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              rows="10"
              cols="50"
            />
            <h4>My Notes</h4>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows="3"
              cols="50"
              placeholder="Add a new note"
            />
            <button onClick={handleAddNote}>Add Note</button>
            <ul>
              {notes.map((note, index) => (
                <li key={index}>
                  {note}
                  <button onClick={() => handleRemoveNote(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div>
            <label>Mood:</label>
            <select
              value={mood}
              onChange={(e) => setMood(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit"
            />
            <button onClick={handleAddHabit}>Add Habit</button>
            <ul>
              {habits.map((habit, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => handleToggleHabit(index)}
                  />
                  {habit.text}
                </li>
              ))}
            </ul>
          </div>
          <br />
          <button onClick={handleSave}>Save Entry</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>{journalEntry}</p>
          <div>
            <h4>My Notes</h4>
            <ul>
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Mood:</strong> {mood}
          </p>
          <p>
            <strong>Habits:</strong>
          </p>
          <ul>
            {habits.map((habit, index) => (
              <li key={index}>
                <input type="checkbox" checked={habit.completed} readOnly />
                {habit.text}
              </li>
            ))}
          </ul>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <br />
      <button onClick={() => navigate("/")}>Back to Calendar</button>
    </div>
  );
};

export default JournalPage;
