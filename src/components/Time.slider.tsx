"use client";
import { Slider, SliderSingleProps, Tooltip, Button } from "antd";
import { useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"; // Import the delete icon

// Marks for the time range (12AM to 12PM)
const marks: SliderSingleProps["marks"] = {
  0: "12AM",
  2: "2AM",
  4: "4AM",
  6: "6AM",
  8: "8AM",
  10: "10AM",
  12: "12PM",
  14: "2PM",
  16: "4PM",
  18: "6PM",
  20: "8PM",
  22: "10PM",
  24: "12AM",
};

// Array of weekdays
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Helper function to format time from slider value
const formatTime = (value: number) => {
  const isAM = value < 12 || value === 24;
  const time = value % 12 === 0 ? 12 : value % 12;
  const suffix = isAM ? "AM" : "PM";
  return `${time}${suffix}`;
};

const TimeSlider = () => {
  const initialRanges = weekDays.reduce(
    (acc, day) => ({ ...acc, [day]: [2, 12] }),
    {}
  );

  const [timeRanges, setTimeRanges] = useState(initialRanges);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // Handle slider value change
  const handleSliderChange = (day: string, value: [number, number]) => {
    setTimeRanges((prevRanges) => ({ ...prevRanges, [day]: value }));
  };

  // Handle delete action to set range to [0, 0]
  const handleDelete = (day: string) => {
    setTimeRanges((prevRanges) => ({ ...prevRanges, [day]: [0, 0] }));
  };
  console.log("time", timeRanges);
  const handleAdd = (day: string) => {
    setTimeRanges((prevRanges) => ({ ...prevRanges, [day]: [20, 22] }));
  };

  return (
    <div>
      {weekDays.map((day) => (
        <div
          key={day}
          style={{ marginBottom: 20 }}
          className="lg:flex items-center justify-between pe-2 py-3 my-10"
          onMouseEnter={() => setHoveredDay(day)} // Set hovered day on mouse enter
          onMouseLeave={() => setHoveredDay(null)} // Reset hovered day on mouse leave
        >
          <h3 className="font-semibold">{day}</h3>
          <p className="relative w-[93%]">
            {timeRanges[day][0] === 0 && timeRanges[day][1] === 0 ? (
              <span className="text-gray-500">
                <Tooltip title="I'm offline (hover to add Operating hours)">
                  <Slider
                    range
                    marks={marks}
                    value={timeRanges[day]} // Changed from defaultValue to value
                    min={0}
                    max={24}
                    step={2}
                    disabled
                    style={{ marginBottom: 15 }}
                  />
                </Tooltip>
              </span>
            ) : day === "Saturday" || day === "Sunday" ? (
              <Tooltip title="I'm offline (hover to add Operating hours)">
                <Slider
                  range
                  marks={marks}
                  value={timeRanges[day]} // Changed from defaultValue to value
                  min={0}
                  max={24}
                  step={2}
                  disabled
                  style={{ marginBottom: 15 }}
                />
              </Tooltip>
            ) : (
              <Slider
                range
                marks={marks}
                value={timeRanges[day]} // Changed from defaultValue to value
                min={0}
                max={24}
                step={2}
                onChange={(value) =>
                  handleSliderChange(day, value as [number, number])
                }
                tooltip={{
                  open: true,
                  formatter: (value: number | undefined) =>
                    formatTime(value ?? 0),
                }}
                style={{ marginBottom: 15 }}
              />
            )}

            {/* {hoveredDay === day &&
              timeRanges[day][0] !== 0 &&
              timeRanges[day][1] !== 0 && (
                <Button
                  type="danger"
                  icon={<DeleteOutlined />} // Icon for delete button
                  onClick={() => handleDelete(day)} // Delete the time range
                  style={{
                    position: "absolute",
                    right: 50, // Adjust position as needed
                    top: "50%",
                    transform: "translateY(-50%)",
                    marginLeft: 10,
                  }}
                />
              )} */}
            <Button
              icon={<PlusOutlined />} // Icon for delete button
              onClick={() => handleAdd(day)} // Delete the time range
              style={{
                position: "absolute",
                right: 80, // Adjust position as needed
                top: "50%",
                transform: "translateY(-50%)",
                marginLeft: 20,
              }}
            />
          </p>
        </div>
      ))}
    </div>
  );
};

export default TimeSlider;
