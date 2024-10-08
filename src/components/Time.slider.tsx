/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Slider, Button, Tooltip, SliderSingleProps } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

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

const TimeSlider = () => {
  const [ranges, setRanges] = useState<any>({});
  const [enabledDays, setEnabledDays] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setRanges(
      weekDays.reduce((acc: any, day: any) => {
        acc[day] = day === "Saturday" || day === "Sunday" ? [] : [[0, 6]];
        return acc;
      }, {})
    );
    setEnabledDays({
      Saturday: false,
      Sunday: false,
    });
    setIsMounted(true);
  }, []);

  const handleAddRange = (day: string) => {
    if (day === "Saturday" || day === "Sunday") {
      setEnabledDays((prev: any) => ({ ...prev, [day]: true }));
      setRanges((prevRanges: any) => ({
        ...prevRanges,
        [day]: [[0, 6]],
      }));
    } else {
      setRanges((prevRanges: any) => ({
        ...prevRanges,
        [day]: [...prevRanges[day], [18, 22]],
      }));
    }
  };

  const handleChange = (day: string, value: number[]) => {
    const newRanges = [...ranges[day]];
    for (let i = 0; i < value.length; i += 2) {
      if (newRanges[i / 2]) {
        newRanges[i / 2] = [value[i], value[i + 1]];
      }
    }
    setRanges((prevRanges: any) => ({ ...prevRanges, [day]: newRanges }));
  };

  const handleDeleteRange = (day: string, index: number) => {
    const newRanges = ranges[day].filter((_: any, i: any) => i !== index);
    setRanges((prevRanges: any) => ({ ...prevRanges, [day]: newRanges }));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {weekDays?.map((day) => (
        <div
          key={day}
          className="lg:flex items-center justify-between pe-2 py-3 my-10"
        >
          <h3 className="font-semibold">{day}</h3>
          <div style={{ zIndex: 2 }} className="w-[85%] relative ">
            <Slider
              range
              className="custom-slider"
              marks={marks}
              value={ranges[day]?.flat() || []}
              onChange={(value) => handleChange(day, value)}
              step={1}
              min={0}
              max={24}
              disabled={
                !(enabledDays[day] || (day !== "Saturday" && day !== "Sunday"))
              }
              style={{ zIndex: 3 }}
              trackStyle={[{ backgroundColor: "transparent" }]}
              tooltip={{
                open: true,
                formatter: (value: number | undefined) =>
                  formatTime(value ?? 0),
              }}
            />

            <div
              className="mx-auto absolute h-2 w-[100%] top-[2px] pointer-events-none"
              style={{
                zIndex: 3,
              }}
            >
              {ranges[day]?.map((range: any, index: number) => (
                <div
                  key={index}
                  className="range-bar absolute top-[10px] shadow-lg rounded flex items-center justify-center h-full pointer-events-auto transition-all duration-300"
                  style={{
                    left: `calc(${(range[0] / 24) * 100}% + 0.5%)`,
                    width: `${((range[1] - range[0]) / 24) * 98}%`,
                    background: "linear-gradient(to right, #36b37e, #5eeb91)",
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
                      className=" opacity-0 transition-opacity duration-300 pointer-events-auto delete-button"
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleAddRange(day)}
            className="bg-green-600 border-green-600 text-white"
          />
        </div>
      ))}
    </div>
  );
};

export default TimeSlider;
