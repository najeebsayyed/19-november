import { useState, useEffect } from 'react';
import type { ElapsedTime } from '../types';

// The start instant as defined in product.md:
// "Start instant: 19 November 2023, 00:00:00 in Asia/Kolkata"
const START_INSTANT_MS = new Date('2023-11-19T00:00:00+05:30').getTime();

export function calculateTimeDifference(now: Date = new Date()): ElapsedTime {
  const start = new Date(START_INSTANT_MS);
  
  // Accurate calendar difference
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // Days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  const safeYears = Math.max(0, years);
  const safeMonths = Math.max(0, months);
  const safeDays = Math.max(0, days);
  const safeHours = Math.max(0, hours);
  const safeMinutes = Math.max(0, minutes);
  const safeSeconds = Math.max(0, seconds);

  const formattedText = `${safeYears}Y ${safeMonths}M ${safeDays}D ${safeHours}H ${safeMinutes}M ${safeSeconds}S`;

  return {
    years: safeYears,
    months: safeMonths,
    days: safeDays,
    hours: safeHours,
    minutes: safeMinutes,
    seconds: safeSeconds,
    formattedText,
  };
}

export function useElapsedTime(): ElapsedTime {
  const [elapsed, setElapsed] = useState<ElapsedTime>(() => calculateTimeDifference());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateTimeDifference());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return elapsed;
}
