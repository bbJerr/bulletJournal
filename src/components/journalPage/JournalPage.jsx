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
  };

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

  const handleNoteBlur = () => {
    if (!newNote.trim()) {
      setShowNewNoteInput(false);
      return;
    }
    handleAddNote();
  };

  const handleNoteKeyPress = (event) => {
    if (event.key === "Enter") {
      handleNoteBlur();
    }
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem(`${date}_notes`, JSON.stringify(updatedNotes));
  };

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      const updatedHabits = [
        ...habits,
        { text: newHabit.trim(), completed: false },
      ];
      setHabits(updatedHabits);
      localStorage.setItem(`${date}_habits`, JSON.stringify(updatedHabits));
      setNewHabit("");
      setShowNewHabitInput(false);
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
        return <FaGrin size={80} />;
      case 2:
        return <FaSmile size={80} />;
      case 3:
        return <FaMeh size={80} />;
      case 4:
        return <FaFrown size={80} />;
      case 5:
        return <FaSadTear size={80} />;
      default:
        return null;
    }
  };

  const handleHabitEdit = (index) => {
    setEditingHabitIndex(index);
  };

  const handleHabitChange = (index, value) => {
    const updatedHabits = [...habits];
    updatedHabits[index].text = value;
    setHabits(updatedHabits);
  };

  const handleHabitBlur = () => {
    if (editingHabitIndex !== null) {
      localStorage.setItem(`${date}_habits`, JSON.stringify(habits));
      setEditingHabitIndex(null);
    }
  };

  const handleHabitKeyPress = (event, index) => {
    if (event.key === "Enter") {
      handleHabitBlur();
    }
  };

  return (
    <div className="whole-page">
      <Header />
      <div className="journal-page">
        <h3>Journal Entry for {date}</h3>
        <div className="journal-content">
          <div className="column notes-section">
            <input
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              onBlur={() => localStorage.setItem(date, journalEntry)}
              rows="10"
              cols="30"
            />
            <label className="heading">My Notes</label>
            <ul>
              {notes.map((note, index) => (
                <li key={index} className="note-item">
                  <div className="note-input-container">
                    <textarea
                      value={note}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      onBlur={() =>
                        localStorage.setItem(
                          `${date}_notes`,
                          JSON.stringify(notes)
                        )
                      }
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
                    onBlur={handleNoteBlur}
                    onKeyPress={handleNoteKeyPress}
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
                  <li key={index}>
                    {editingHabitIndex === index ? (
                      <textarea
                        type="text"
                        value={habits[index].text}
                        onChange={(e) =>
                          handleHabitChange(index, e.target.value)
                        }
                        onBlur={handleHabitBlur}
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
                {showNewHabitInput && (
                  <li className="new-habit-input">
                    <textarea
                      type="text"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      placeholder="Add new habit"
                      onBlur={handleAddHabit}
                    />
                  </li>
                )}
                <li>
                  <FaPlus
                    size={24}
                    className="add-habit-icon"
                    onClick={() => setShowNewHabitInput(true)}
                  />
                </li>
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
