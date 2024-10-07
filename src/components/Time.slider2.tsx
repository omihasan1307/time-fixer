"use client";
import { Slider, Button, Tooltip, SliderSingleProps } from "antd";
import { useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

// Full-width marks (0 to 24 to cover a full day)
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

const formatTime = (value: number) => {
  const isAM = value < 12 || value === 24;
  const time = value % 12 === 0 ? 12 : value % 12;
  const suffix = isAM ? "AM" : "PM";
  return `${time}${suffix}`;
};

const TimeSlider2 = () => {
  const [ranges, setRanges] = useState(
    weekDays.reduce((acc, day) => {
      // Initialize ranges for Saturday and Sunday as empty
      acc[day] = day === "Saturday" || day === "Sunday" ? [] : [[0, 6]];
      return acc;
    }, {})
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [enabledDays, setEnabledDays] = useState<any>({
    Saturday: false,
    Sunday: false,
  });

  // Add a new range for a specific day
  const handleAddRange = (day: string) => {
    // Only allow adding ranges for Saturday and Sunday when they are enabled
    if (day === "Saturday" || day === "Sunday") {
      setEnabledDays((prev) => ({ ...prev, [day]: true }));
      setRanges((prevRanges) => ({
        ...prevRanges,
        [day]: [[0, 6]], // Start with a default range
      }));
    } else {
      setRanges((prevRanges) => ({
        ...prevRanges,
        [day]: [...prevRanges[day], [18, 22]], // Add a new default range for weekdays
      }));
    }
  };

  // Update ranges for a specific day when the slider value changes
  const handleChange = (day: string, value: number[]) => {
    const newRanges = [...ranges[day]];
    for (let i = 0; i < value.length; i += 2) {
      if (newRanges[i / 2]) {
        newRanges[i / 2] = [value[i], value[i + 1]];
      }
    }
    setRanges((prevRanges) => ({ ...prevRanges, [day]: newRanges }));
  };

  // Delete a specific range for a specific day
  const handleDeleteRange = (day: string, index: number) => {
    const newRanges = ranges[day].filter((_, i) => i !== index);
    setRanges((prevRanges) => ({ ...prevRanges, [day]: newRanges }));
  };

  return (
    <div>
      {weekDays.map((day) => (
        <div
          key={day}
          style={{ marginBottom: 30 }}
          className="lg:flex items-center justify-between pe-2 py-3 my-10"
        >
          <h3 className="font-semibold">{day}</h3>
          <div style={{ position: "relative", zIndex: 2 }} className="w-[85%]">
            <Slider
              range
              className="custom-slider"
              marks={marks}
              value={ranges[day].flat()}
              onChange={(value) => handleChange(day, value)}
              step={1}
              min={0}
              max={24}
              disabled={
                !(enabledDays[day] || (day !== "Saturday" && day !== "Sunday"))
              } // Disable slider for Saturday and Sunday until activated
              style={{ zIndex: 3 }}
              trackStyle={[{ backgroundColor: "transparent" }]}
              tooltip={{
                open: true,
                formatter: (value: number | undefined) =>
                  formatTime(value ?? 0),
              }}
            />

            <div
              style={{
                position: "absolute",
                height: "8px",
                width: "100%",
                top: "2px",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              {ranges[day].map((range: any, index: number) => (
                <div
                  key={index}
                  className="range-bar"
                  style={{
                    position: "absolute",
                    left: `${(range[0] / 24) * 100}%`,
                    width: `${((range[1] - range[0]) / 24) * 100}%`,
                    height: "100%",
                    top: "10px",
                    background: "linear-gradient(to right, #36b37e, #5eeb91)",
                    borderRadius: "4px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "background 0.3s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "auto",
                  }}
                >
                  <Tooltip title="Delete Range" placement="top">
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      shape="circle"
                      size="small"
                      onClick={() => handleDeleteRange(day, index)}
                      style={{
                        width: "100%",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "auto",
                      }}
                      className="delete-button"
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleAddRange(day)}
            style={{
              marginTop: 10,
              backgroundColor: "#36b37e",
              borderColor: "#36b37e",
              color: "#fff",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TimeSlider2;
