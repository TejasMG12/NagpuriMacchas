import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Default styles
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/button";

// Setup moment.js for localizer
const localizer = momentLocalizer(moment);

// Calendar container styles
const calendarContainerStyles: React.CSSProperties = {
  maxWidth: "90%",
  margin: "auto",
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

// Event styling
const eventStyleGetter = () => {
  return {
    style: {
      backgroundColor: "#4CAF50", // Green color for events
      borderRadius: "12px",
      padding: "5px",
      color: "white",
      border: "none",
      fontSize: "14px",
    },
  };
};

// Initial mock events
const initialEvents: Event[] = [
  {
    title: "Meeting with Dr. Smith",
    start: new Date(2025, 2, 12, 10, 0), // March 12, 2025, 10:00 AM
    end: new Date(2025, 2, 12, 11, 0),
  },
  {
    title: "Follow-up with Dr. Johnson",
    start: new Date(2025, 2, 13, 14, 0), // March 13, 2025, 2:00 PM
    end: new Date(2025, 2, 13, 15, 0),
  },
];

const AppointmentsCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<{ title: string; start: Date; end: Date }>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  // Open dialog on date selection
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({ ...newEvent, start: slotInfo.start, end: slotInfo.end });
    setOpenDialog(true);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  // Save new event
  const handleSaveEvent = () => {
    if (newEvent.title.trim() === "") return; // Prevent empty events

    setEvents([...events, newEvent]);
    setOpenDialog(false);
    setNewEvent({ title: "", start: new Date(), end: new Date() }); // Reset fields
  };

  return (
    <div style={calendarContainerStyles}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "10px" }}>📅 Appointments Calendar</h2>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot} // Enables adding events
        defaultView="week"
        views={["month", "week", "day", "agenda"]}
        style={{
          height: "600px",
          borderRadius: "16px",
          padding: "10px",
          backgroundColor: "#fafafa",
        }}
        eventPropGetter={eventStyleGetter}
      />

      {/* Dialog to Add New Appointment */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" style={{ display: "none" }} />
        </DialogTrigger>
        <DialogContent style={{ borderRadius: "12px", padding: "20px", maxWidth: "400px" }}>
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter appointment title..."
            value={newEvent.title}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "15px",
            }}
          />
          <DialogFooter style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSaveEvent}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsCalendar;
