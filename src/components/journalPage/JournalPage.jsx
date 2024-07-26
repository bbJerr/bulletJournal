import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSmile, FaMeh, FaFrown, FaGrin, FaSadTear } from "react-icons/fa";
import "./journalPage.css";

const JournalPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [mood, setMood] = useState(4);
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

  const renderMoodIcon = (num) => {
    switch (num) {
      case 1:
        return <FaGrin size={70} />;
      case 2:
        return <FaSmile size={70} />;
      case 3:
        return <FaMeh size={70} />;
      case 4:
        return <FaFrown size={70} />;
      case 5:
        return <FaSadTear size={70} />;
      default:
        return null;
    }
  };

  return (
    <div className="journal-page">
      <h3>Journal Entry for {date}</h3>
      <div className="journal-content">
        <div className="column notes-section">
          {isEditing ? (
            <>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                rows="10"
                cols="30"
              />
              <label>My Notes</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows="3"
                cols="30"
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
            </>
          ) : (
            <>
              <p>{journalEntry}</p>
              <div>
                <label className="heading">My Notes</label>
                <ul>
                  {notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="column mood-habits-section">
          <div className="mood-tracker">
            <label className="heading">Mood Tracker</label>
            <div className="mood-icons">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`mood-icon ${mood === num ? "selected" : ""}`}
                  onClick={() => setMood(num)}
                >
                  {renderMoodIcon(num)}
                </span>
              ))}
            </div>
          </div>
          <div className="habit-tracker">
            {isEditing ? (
              <>
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
              </>
            ) : (
              <div>
                <label className="heading">Habit Tracker</label>
                <ul>
                  {habits.map((habit, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        checked={habit.completed}
                        readOnly
                      />
                      {habit.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save Entry</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
      <button onClick={() => navigate("/home")}>Back to Calendar</button>
    </div>
  );
};

export default JournalPage;
