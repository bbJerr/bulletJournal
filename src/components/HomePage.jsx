import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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
    console.log("Event Clicked:", info);
    const eventDate = info.event.startStr.split("T")[0];
    navigate(`/journal/${eventDate}`);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    const journalEntry = prompt("Create a new journal entry:");
    if (journalEntry) {
      localStorage.setItem(info.dateStr, journalEntry);
      // Add the new event to the calendar
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: info.dateStr,
          title: "Journal Entry",
          start: info.dateStr,
          end: info.dateStr,
        },
      ]);
      navigate(`/journal/${info.dateStr}`);
    }
  };

  return (
    <div>
      <h1>Daily Journal Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default HomePage;
