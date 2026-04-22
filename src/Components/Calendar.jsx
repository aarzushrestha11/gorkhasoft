import React, { useState, useEffect } from "react";
//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CalendarIcon from "lucide-react/dist/esm/icons/calendar";
import useFetch from "../hooks/useFetch";

const COLOR_STYLES = {
  red:    { badge: "bg-red-100 text-red-700",       day: "bg-red-600 text-black border-red-500" },
  yellow: { badge: "bg-yellow-100 text-yellow-700", day: "bg-yellow-500 text-black border-yellow-400" },
  blue:   { badge: "bg-blue-100 text-blue-700",     day: "bg-blue-500 text-black border-blue-500" },
};

// When a day has multiple event colours, this determines which wins
const PRIORITY = ["red", "blue", "yellow"];

const getDayColor = (colors) => PRIORITY.find((c) => colors.includes(c)) ?? null;

//eslint-disable-next-line no-unused-vars
export default function EventCalendar({ SectionHeading, AnimSection }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const { data: rawEvents, loading, error } = useFetch("events");

  // Group by date: { "YYYY-MM-DD": [event, ...] }
  const events = rawEvents.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === month && today.getFullYear() === year) {
      setSelectedDate(today);
    } else {
      setSelectedDate(new Date(year, month, 1));
    }
  }, [year, month]);

  const formatKey = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const isToday = (d) => {
    const t = new Date();
    return t.getDate() === d && t.getMonth() === month && t.getFullYear() === year;
  };

  const isSelected = (d) =>
    selectedDate &&
    selectedDate.getDate() === d &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year;

  const colorsForDay = (d) => {
    const evs = events[formatKey(year, month, d)] || [];
    return [...new Set(evs.map((e) => e.color))];
  };

  const getDayClassName = (day, isSat) => {
    const colors     = colorsForDay(day);
    const eventColor = getDayColor(colors);

    // ── Event day — colour takes full priority, even when selected ──
    if (eventColor) {
      const selected = isSelected(day) ? "ring-2 ring-offset-1 ring-gray-700" : "";
      return `${COLOR_STYLES[eventColor].day} ${selected}`;
    }

    // ── Normal days ──
    if (isSelected(day)) return "bg-emerald-600 text-white border-emerald-600";
    if (isToday(day))    return "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold";
    if (isSat)           return "text-red-500 bg-white border";
    return "text-gray-700 bg-white border";
  };

  const selectedKey =
    selectedDate &&
    formatKey(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

  const selectedEvents = selectedKey ? (events[selectedKey] || []) : [];

  return (
    <section className="py-24 bg-[#f0f7f4]">
      <div className="max-w-5xl mx-auto px-6">

        <SectionHeading
          label="Stay Organized"
          title="Event"
          accent="Calendar"
          subtitle="Plan ahead with our interactive calendar — today's date is automatically selected."
        />

        <AnimSection>
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 px-6 py-5 flex justify-between text-white">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>

              <div className="flex items-center gap-3">
                <CalendarIcon size={22} />
                <h3 className="text-xl font-bold">
                  {monthNames[month]} {year}
                </h3>
                {loading && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
              </div>

              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 bg-emerald-50/40 px-4 pt-4 pb-2">
              {weekDays.map((d, i) => (
                <div
                  key={d}
                  className={`text-center text-xs font-semibold uppercase
                    ${i === 6 ? "text-red-500" : "text-emerald-700"}`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 p-4 pt-2">
              {Array.from({ length: startWeekday }).map((_, i) => (
                <div key={i} className="h-12" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day      = i + 1;
                const dayIndex = (startWeekday + i) % 7;
                const isSat    = dayIndex === 6;

                return (
                  <motion.button
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    whileHover={{ scale: 1.02 }}
                    className={`h-12 rounded-xl text-sm font-semibold flex items-center justify-center transition-all
                      ${getDayClassName(day, isSat)}`}
                  >
                    {day}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected:{" "}
                <span className="font-semibold text-emerald-700">
                  {selectedDate?.toDateString()}
                </span>
              </p>

              {error && <p className="text-xs text-red-400">{error}</p>}

              {selectedEvents.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedEvents.map((ev) => (
                    <span
                      key={ev.id}
                      className={`text-xs px-3 py-1 rounded-full font-medium
                        ${COLOR_STYLES[ev.color]?.badge ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {ev.title}
                    </span>
                  ))}
                </div>
              ) : (
                !loading && <p className="text-xs text-gray-400">No events</p>
              )}
            </div>

          </div>
        </AnimSection>
      </div>
    </section>
  );
}