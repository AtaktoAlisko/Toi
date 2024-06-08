"use client";
import { useState, useEffect } from "react";
import left from "../../../public/images/left.png";
import right from "../../../public/images/right.png";
import Img from "next/image";

export default function Calendar() {

  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 7, 1));

  const weddingDate = new Date(2024, 8, 2);

  const daysOfWeek = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жк"];
  const months = [
    "Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", 
    "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"
  ];

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <div key={index} className="day-name">
        {day}
      </div>
    ));
  };

  const renderDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const days = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isWeddingDay =
        year === weddingDate.getFullYear() &&
        month === weddingDate.getMonth() &&
        day === weddingDate.getDate();

      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate();

      days.push(
        <div
          key={day}
          className={`day ${isWeddingDay ? "wedding-day" : ""} ${isToday ? "today" : ""}`}
          title={isWeddingDay ? "Wedding Day" : ""}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
    setCurrentDate(newDate);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        changeMonth(-1);
      } else if (event.key === "ArrowRight") {
        changeMonth(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentDate]);

  return (
    <div className="calendar ">
      <div className="header">
        <button onClick={() => changeMonth(-1)}> <Img src={left} alt="Previous" width={20} height={20} /> </button>
        <h2>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}> <Img src={right} width={20} height={20} alt="Next" /> </button>
      </div>
      <div className="days-of-week">{renderDaysOfWeek()}</div>
      <div className="days">{renderDaysInMonth()}</div>

      <style jsx>{`
        .calendar {
          width: 100%;
          max-width: 350px;
          margin: 15px auto;
          margin-top: 50px;
          margin-bottom: 25px;
          text-align: center;
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .days-of-week,
        .days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .day-name,
        .day,
        .empty-day {
          padding: 10px;
          border: 1px solid #ddd;
          margin: 2px;
        }
        .day-name {
          background-color: #e9e9e9;
          font-weight: bold;
        }
        .day {
          background-color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .day:hover {
          background-color: #f1f1f1;
        }
        .empty-day {
          background-color: #f9f9f9;
        }
        .wedding-day {
          background-color: transparent;
          border-color: red;
          border-radius: 50%;
          color: red;
          font-weight: bold;
        }
        .today {
          background-color: #d1e7dd;
          border-color: #0f5132;
        }
      `}</style>
    </div>
  );
}
