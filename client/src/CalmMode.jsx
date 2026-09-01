import { useEffect, useState } from "react";

function CalmMode({ onBack }) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [phase, setPhase] = useState("Ready");

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          setPhase("Complete 🌿");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const breathing = setInterval(() => {
      setPhase((prev) =>
        prev === "Breathe in" ? "Breathe out" : "Breathe in"
      );
    }, 4000);

    return () => clearInterval(breathing);
  }, [running]);

  const startExercise = () => {
    setSeconds(120);
    setPhase("Breathe in");
    setRunning(true);
  };

  const stopExercise = () => {
    setRunning(false);
    setPhase("Paused");
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="calm-page">

      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="calm-container">

        <p className="calm-label">
          🌿 CALM MODE
        </p>

        <h1>
          Take a moment to reset.
        </h1>

        <p className="calm-description">
          Slow down, focus on your breathing, and give
          yourself a peaceful moment.
        </p>

        <div className={`breathing-circle ${running ? "breathing" : ""}`}>
          <div className="breathing-inner">
            <span>🫁</span>
            <strong>{phase}</strong>
          </div>
        </div>

        <div className="calm-timer">
          {minutes}:{remainingSeconds.toString().padStart(2, "0")}
        </div>

        <div className="calm-controls">

          {!running ? (
            <button
              className="calm-start-btn"
              onClick={startExercise}
            >
              ▶ Start 2-Minute Reset
            </button>
          ) : (
            <button
              className="calm-stop-btn"
              onClick={stopExercise}
            >
              ⏸ Pause
            </button>
          )}

        </div>

        <div className="calm-tip">
          💡 <strong>MindMate tip:</strong> There is no need
          to rush. Focus only on the next breath.
        </div>

      </div>
    </div>
  );
}

export default CalmMode;