
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WEEKS = ["1st", "2nd", "3rd", "4th", "5th"];
const OPTIONS = ["Full Day", "1st Half", "2nd Half"];

const createInitialCalendar = () =>
  Object.fromEntries(
    DAYS.map((day) => [
      day,
      {
        all: day === "Saturday",
        weeks: Object.fromEntries(
          WEEKS.map((week) => [
            week,
            {
              checked: day === "Saturday",
              timing: "Full Day",
            },
          ])
        ),
      },
    ])
  );

export default function App() {
  const [halfMode, setHalfMode] = useState(false);
  const [calendar, setCalendar] = useState(createInitialCalendar);
  const [message, setMessage] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);

  function toggleAll(day, checked) {
    setCalendar((current) => ({
      ...current,
      [day]: {
        all: checked,
        weeks: Object.fromEntries(
          WEEKS.map((week) => [
            week,
            {
              ...current[day].weeks[week],
              checked,
            },
          ])
        ),
      },
    }));
    setMessage("");
  }

  function toggleWeek(day, week, checked) {
    setCalendar((current) => {
      const weeks = {
        ...current[day].weeks,
        [week]: {
          ...current[day].weeks[week],
          checked,
        },
      };

      return {
        ...current,
        [day]: {
          all: WEEKS.every((w) => weeks[w].checked),
          weeks,
        },
      };
    });
    setMessage("");
  }

  function changeTiming(day, week, timing) {
    setCalendar((current) => ({
      ...current,
      [day]: {
        ...current[day],
        weeks: {
          ...current[day].weeks,
          [week]: {
            ...current[day].weeks[week],
            timing,
          },
        },
      },
    }));
  }

  function handleSave() {
    const selected = {};

    DAYS.forEach((day) => {
      const row = calendar[day];
      const weeks = {};

      WEEKS.forEach((week) => {
        const item = row.weeks[week];

        if (item.checked) {
          weeks[week] = halfMode ? item.timing : true;
        }
      });

      if (Object.keys(weeks).length) {
        selected[day] = weeks;
      }
    });

    console.log("Work calendar:", {
      halfWorkingDayAndHalfWeekend: halfMode,
      calendar: selected,
    });

    setMessage("Calendar saved successfully.");
  }

  if (!showCalendar) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <button
          onClick={() => setShowCalendar(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Open Work Calendar
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-2 sm:p-5">
      <section className="mx-auto flex h-[calc(100vh-16px)] max-w-[1400px] flex-col overflow-hidden border border-slate-200 bg-white shadow-sm sm:h-[calc(100vh-40px)]">
        {/* Modal header */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
          <h1 className="text-base font-medium text-slate-800">
            Add Work Calendar
          </h1>

          <button
            type="button"
            aria-label="Close calendar"
            onClick={() => setShowCalendar(false)}
            className="rounded bg-slate-200 p-1 text-slate-600 hover:bg-slate-300"
          >
            <X size={16} />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto px-4 py-3 sm:px-6">
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Define weekend
          </label>

          <label className="mb-5 flex w-fit cursor-pointer items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={halfMode}
              onChange={(event) => {
                setHalfMode(event.target.checked);
                setMessage("");
              }}
              className="h-3.5 w-3.5 accent-blue-500"
            />
            Half working day &amp; half weekend
          </label>

          {/* Calendar grid */}
          <div className="w-full overflow-x-auto rounded-md bg-slate-100 p-2 sm:p-3">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[155px_repeat(6,minmax(0,1fr))] gap-1">
                {/* Column headers */}
                <div />

                {["All", ...WEEKS].map((week) => (
                  <div
                    key={week}
                    className="flex h-8 items-center justify-center text-xs text-slate-600"
                  >
                    {week}
                  </div>
                ))}

                {/* Day rows */}
                {DAYS.map((day) => {
                  const row = calendar[day];

                  return (
                    <div
                      key={day}
                      className="contents"
                    >
                      <div className="flex min-h-[36px] items-center rounded-sm border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm">
                        {day}
                      </div>

                      {/* All checkbox */}
                      <div className="flex min-h-[36px] items-center justify-center rounded-sm border border-slate-200 bg-white">
                        <input
                          type="checkbox"
                          aria-label={`Select all weeks for ${day}`}
                          checked={row.all}
                          onChange={(event) =>
                            toggleAll(day, event.target.checked)
                          }
                          className="h-3.5 w-3.5 accent-blue-500"
                        />
                      </div>

                      {/* Individual week cells */}
                      {WEEKS.map((week) => {
                        const item = row.weeks[week];

                        return (
                          <div
                            key={week}
                            className="flex min-h-[36px] items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-2"
                          >
                            {halfMode && (
                              <input
                                type="checkbox"
                                aria-label={`${day}, ${week}`}
                                checked={item.checked}
                                onChange={(event) =>
                                  toggleWeek(
                                    day,
                                    week,
                                    event.target.checked
                                  )
                                }
                                className="h-3.5 w-3.5 shrink-0 accent-blue-500"
                              />
                            )}

                            {halfMode && (
                              <div className="relative min-w-0 flex-1">
                                <select
                                  aria-label={`${day}, ${week} working time`}
                                  value={item.timing}
                                  onChange={(event) =>
                                    changeTiming(
                                      day,
                                      week,
                                      event.target.value
                                    )
                                  }
                                  className="w-full appearance-none rounded-sm border border-slate-200 bg-white py-1 pl-2 pr-5 text-[11px] text-slate-700 outline-none focus:border-blue-400"
                                >
                                  {OPTIONS.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>

                                <ChevronDown
                                  size={12}
                                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                              </div>
                            )}

                            {!halfMode && (
                              <input
                                type="checkbox"
                                aria-label={`${day}, ${week}`}
                                checked={item.checked}
                                onChange={(event) =>
                                  toggleWeek(
                                    day,
                                    week,
                                    event.target.checked
                                  )
                                }
                                className="h-3.5 w-3.5 accent-blue-500"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <section className="mt-6 border-t border-slate-200 pt-4">
            <h2 className="mb-2 text-xs font-semibold text-slate-700">
              Calendar year definition
            </h2>
            <p className="text-xs text-slate-500">
              Configure the calendar year settings here when the full
              assignment requirements are confirmed.
            </p>
          </section>

          {message && (
            <p role="status" className="mt-4 text-sm text-green-700">
              {message}
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 items-center gap-3 border-t border-slate-200 bg-slate-50 px-3 py-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-sm bg-sky-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-600"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => {
              setCalendar(createInitialCalendar());
              setHalfMode(false);
              setMessage("");
            }}
            className="rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
        </footer>
      </section>
    </main>
  );
}
