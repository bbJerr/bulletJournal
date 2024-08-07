import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaGrin,
  FaSadTear,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import "./journalPage.css";
import Header from "../header/Header";

const JournalPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showNewNoteInput, setShowNewNoteInput] = useState(false);
  const [mood, setMood] = useState(3);
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [showNewHabitInput, setShowNewHabitInput] = useState(false);
  const [editingHabitIndex, setEditingHabitIndex] = useState(null);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  const MAX_CHARACTERS = 69; // Set your desired character limit here

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

  useEffect(() => {
    // Auto-resize textarea
    document.querySelectorAll('.note-input').forEach(textarea => {
      textarea.style.height = 'auto'; // Reset height to auto to measure scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    });
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [...notes, newNote.trim()];
      setNotes(updatedNotes);
      localStorage.setItem(`${date}_notes`, JSON.stringify(updatedNotes));
    }
    setNewNote("");
    setShowNewNoteInput(false);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const handleNoteBlur = (index) => {
    if (notes[index].trim() === "") {
      handleRemoveNote(index);
    } else {
      localStorage.setItem(`${date}_notes`, JSON.stringify(notes));
    }
  };

  const handleNoteKeyPress = (event, index) => {
    if (event.key === "Enter") {
      handleNoteBlur(index);
    }
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem(`${date}_notes`, JSON.stringify(updatedNotes));
  };

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      if (newHabit.trim().length <= MAX_CHARACTERS) {
        if (habits.length < 9) { // Check if there are fewer than 9 habits
          const updatedHabits = [
            ...habits,
            { text: newHabit.trim(), completed: false },
          ];
          setHabits(updatedHabits);
          localStorage.setItem(`${date}_habits`, JSON.stringify(updatedHabits));
          setNewHabit("");
          setShowNewHabitInput(false);
        } else {
          alert("You can only create up to 9 habits.");
        }
      } else {
        alert(`Habit text must be less than or equal to ${MAX_CHARACTERS} characters.`);
      }
    } else {
      setShowNewHabitInput(false);
      setNewHabit("");
    }
  };

  const handleToggleHabit = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem(`${date}_habits`, JSON.stringify(updatedHabits));
  };

  const handleRemoveHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    localStorage.setItem(`${date}_habits`, JSON.stringify(updatedHabits));
  };

  const handleMoodClick = (num) => {
    setMood(num);
    localStorage.setItem(`${date}_mood`, num);
  };

  const renderMoodIcon = (num) => {
    switch (num) {
      case 1:
        return <FaGrin />;
      case 2:
        return <FaSmile />;
      case 3:
        return <FaMeh />;
      case 4:
        return <FaFrown />;
      case 5:
        return <FaSadTear />;
      default:
        return null;
    }
  };

  const handleHabitEdit = (index) => {
    setEditingHabitIndex(index);
  };

  const handleHabitChange = (index, value) => {
    if (value.length <= MAX_CHARACTERS) {
      const updatedHabits = [...habits];
      updatedHabits[index].text = value;
      setHabits(updatedHabits);
    } else {
      alert(`Habit text must be less than or equal to ${MAX_CHARACTERS} characters.`);
    }
  };

  const handleHabitBlur = (index) => {
    if (editingHabitIndex !== null) {
      if (habits[index].text.trim() === "") {
        handleRemoveHabit(index);
      } else {
        localStorage.setItem(`${date}_habits`, JSON.stringify(habits));
      }
      setEditingHabitIndex(null);
    }
  };

  const handleHabitKeyPress = (event, index) => {
    if (event.key === "Enter") {
      handleHabitBlur(index);
    }
  };

  const handleJournalEntryChange = (value) => {
    if (value.trim() !== "") {
      setJournalEntry(value);
    } else {
      alert("Journal entry cannot be empty.");
    }
  };

  const handleJournalEntryBlur = () => {
    if (journalEntry.trim() === "") {
      alert("Journal entry cannot be empty.");
    } else {
      localStorage.setItem(date, journalEntry);
    }
  };

  return (
    <div className="whole-page">
      <Header />
      <div className="journal-page">
        <div className="journal-title">
          <input
            value={journalEntry}
            onChange={(e) => handleJournalEntryChange(e.target.value)}
            onBlur={handleJournalEntryBlur}
            rows="10"
            cols="30"
          />
          <h3>Journal Entry for {date}</h3>
        </div>
        <div className="journal-content">
          <div className="column notes-section">
            <label className="heading">My Notes</label>
            <ul>
              {notes.map((note, index) => (
                <li key={index} className="note-item">
                  <div className="note-input-container">
                    <textarea
                      value={note}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      onBlur={() => handleNoteBlur(index)}
                      onKeyPress={(e) => handleNoteKeyPress(e, index)}
                      className="note-input"
                    />
                    <FaTrash
                      size={20}
                      onClick={() => handleRemoveNote(index)}
                      className="trash-icon"
                    />
                  </div>
                </li>
              ))}
              {showNewNoteInput && (
                <li className="new-note-input">
                  <textarea
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note"
                    onBlur={() => {
                      if (!newNote.trim()) {
                        setShowNewNoteInput(false);
                        return;
                      }
                      handleAddNote();
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (!newNote.trim()) {
                          setShowNewNoteInput(false);
                          return;
                        }
                        handleAddNote();
                      }
                    }}
                  />
                </li>
              )}
              <li>
                <FaPlus
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowNewNoteInput(true)}
                />
              </li>
            </ul>
          </div>
          <div className="column mood-habits-section">
            <div className="mood-tracker">
              <label className="heading">Mood Tracker</label>
              <div className="mood-icons">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className={`mood-icon ${mood === num ? "selected" : ""}`}
                    onClick={() => handleMoodClick(num)}
                  >
                    {renderMoodIcon(num)}
                  </span>
                ))}
              </div>
            </div>
            <div className="habit-tracker">
              <label className="heading">Habit Tracker</label>
              <ul>
                {habits.map((habit, index) => (
                  <li key={index} className="habit-item">
                    {editingHabitIndex === index ? (
                      <textarea
                        value={habit.text}
                        onChange={(e) =>
                          handleHabitChange(index, e.target.value)
                        }
                        onBlur={() => handleHabitBlur(index)}
                        onKeyPress={(e) => handleHabitKeyPress(e, index)}
                        className="habit-input"
                      />
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          checked={habit.completed}
                          onChange={() => handleToggleHabit(index)}
                        />
                        <span
                          onClick={() => handleHabitEdit(index)}
                          style={{ cursor: "pointer" }}
                        >
                          {habit.text}
                        </span>
                        <FaTrash
                          size={20}
                          className="trash-icon"
                          onClick={() => handleRemoveHabit(index)}
                        />
                      </>
                    )}
                  </li>
                ))}
                {showNewHabitInput && habits.length < 9 && (
                  <li className="new-habit-input">
                    <textarea
                      type="text"
                      value={newHabit}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_CHARACTERS) {
                          setNewHabit(e.target.value);
                        }
                      }}
                      placeholder="Add new habit"
                      onBlur={handleAddHabit}
                    />
                  </li>
                )}
                {!showNewHabitInput && habits.length < 9 && (
                  <li>
                    <FaPlus
                      size={24}
                      className="add-habit-icon"
                      onClick={() => setShowNewHabitInput(true)}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <button onClick={() => navigate("/home")} className="btn-2">
          Back to Calendar
        </button>
      </div>
    </div>
  );
};

export default JournalPage;
