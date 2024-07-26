import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "../newEntry/NewEntry";
import "./homepage.css";
import Header from "../header/Header";

const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    const eventsFromLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const entry = localStorage.getItem(key);
      if (entry) {
        eventsFromLocalStorage.push({
          id: key,
          title: entry,
          start: key,
          end: key,
        });
      }
    }
    setEvents(eventsFromLocalStorage);
  }, []);

  const handleEventClick = (info) => {
    const eventDate = info.event.startStr.split("T")[0];
    if (isDeleteMode) {
      handleDeleteEntry(eventDate);
    } else {
      navigate(`/journal/${eventDate}`);
    }
  };

  const handleDateClick = (info) => {
    if (isDeleteMode) return;

    const existingEntry = localStorage.getItem(info.dateStr);
    if (existingEntry) {
      alert("A journal entry already exists for this date.");
    } else {
      setSelectedDate(info.dateStr);
      setIsModalOpen(true);
    }
  };

  const handleSave = (journalEntry) => {
    if (journalEntry) {
      localStorage.setItem(selectedDate, journalEntry);

      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: selectedDate,
          title: journalEntry,
          start: selectedDate,
          end: selectedDate,
        },
      ]);
      setIsModalOpen(false); // Close the modal
      navigate(`/journal/${selectedDate}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleDeleteEntry = (date) => {
    localStorage.removeItem(date);
    localStorage.removeItem(`${date}_notes`);
    localStorage.removeItem(`${date}_mood`);
    localStorage.removeItem(`${date}_habits`);

    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== date));
    setIsDeleteMode(false);
    alert(`Journal entry for ${date} deleted.`);
  };

  return (
    <div className="homepage">
      <Header />
      <button onClick={toggleDeleteMode} className="delete-button btn">
        {isDeleteMode ? "Cancel Delete" : "Delete Entry"}
      </button>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default HomePage;
