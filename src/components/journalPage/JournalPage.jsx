import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSmile, FaMeh, FaFrown, FaGrin, FaSadTear, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import "./journalPage.css";
import Header from "../header/Header";

const JournalPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [mood, setMood] = useState(3);
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [showNewHabitInput, setShowNewHabitInput] = useState(false);
  const [isEditingHabits, setIsEditingHabits] = useState(false);

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
    setIsEditingHabits(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsEditingHabits(false);
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
      const updatedHabits = [...habits, { text: newHabit.trim(), completed: false }];
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

  return (
    <div className="whole-page">
      <Header />
      <div className="journal-page">
        <h3>Journal Entry for {date}</h3>
        <div className="journal-content">
          <div className="column notes-section">
            {isEditing ? (
              <>
                <input
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  rows="10"
                  cols="30"
                />      
                <label className="heading">My Notes</label>         
                <ul>
                  {notes.map((note, index) => (
                    <li key={index}>
                      {note}
                      <button onClick={() => handleRemoveNote(index)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows="3"
                  cols="30"
                  placeholder="Add a new note"
                />
                <button onClick={handleAddNote}>Add Note</button>
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
                    className={`mood-icon ${mood === num ? 'selected' : ''}`}
                    onClick={() => handleMoodClick(num)}
                  >
                    {renderMoodIcon(num)}
                  </span>
                ))}
              </div>
            </div>
            <div className="habit-tracker">
              <label className="heading">
                Habit Tracker
                <FaEdit
                  size={20}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => setIsEditingHabits(!isEditingHabits)}
                />
              </label>
              <ul>
                {habits.map((habit, index) => (
                  <li key={index}>
                    {isEditingHabits ? (
                      <>
                        <FaTrash
                          size={20}
                          style={{ marginRight: '10px', cursor: 'pointer' }}
                          onClick={() => handleRemoveHabit(index)}
                        />
                        {habit.text}
                      </>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          checked={habit.completed}
                          onChange={() => handleToggleHabit(index)}
                        />
                        {habit.text}
                      </>
                    )}
                  </li>
                ))}
                {showNewHabitInput && (
                  <li className="new-habit-input">
                    <input
                      type="text"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      placeholder="Add new habit"
                      onBlur={handleAddHabit} // Save habit on blur
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
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn-2">Save Entry</button>
            <button onClick={handleCancel} className="btn-2">Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit} className="btn-2">Edit</button>
        )}
        <button onClick={() => navigate("/home")} className="btn-2">Back to Calendar</button>
      </div>
    </div>
  );
};

export default JournalPage;
