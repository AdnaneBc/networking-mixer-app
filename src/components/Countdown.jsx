import { useState, useEffect } from "react";

const Countdown = ({
  initialTimer,
  constantTimer,
  isTimerRunning,
  resetTimer,
}) => {
  const [timer, setTimer] = useState(initialTimer);
  const [isPaused, setIsPaused] = useState(false);

  // Convert mm:ss to total seconds
  const convertToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  // Convert total seconds back to mm:ss format
  const convertToMMSS = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    let totalSeconds = convertToSeconds(timer);

    const interval = setInterval(() => {
      if (isTimerRunning && !isPaused) {
        totalSeconds -= 1;
        if (totalSeconds <= 0) {
          totalSeconds = convertToSeconds(constantTimer); // Reset when timer reaches 0
        }
        setTimer(convertToMMSS(totalSeconds));
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [constantTimer, isPaused, isTimerRunning, timer]);

  // Sync with external initialTimer changes
  useEffect(() => {
    setTimer(initialTimer);
  }, [initialTimer]);

  // Reset timer when resetTimer prop changes
  useEffect(() => {
    setTimer(initialTimer);
    setIsPaused(false); // Resume timer automatically after reset
  }, [resetTimer]);

  // Handle Reset
  const handleReset = () => {
    setTimer(constantTimer);
    setIsPaused(true); // Automatically pause when reset
  };

  // Toggle Pause/Resume
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="inline-block px-8 py-4 text-3xl font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-red-500 to-orange-400">
        Next Group Change In: {timer}
      </div>
      <p className="text-sm text-gray-500">
        Groups will automatically refresh every {constantTimer}.
      </p>
      <div className="space-x-4">
        <button
          onClick={togglePause}
          className="px-6 py-2 font-semibold text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
        >
          {isPaused ? "Resume Timer" : "Pause Timer"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 font-semibold text-white transition duration-200 bg-gray-700 rounded-lg shadow-lg hover:bg-gray-800"
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
};

export default Countdown;
