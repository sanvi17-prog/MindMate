import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MoodHistory({ historyUpdated }) { 
  const [history, setHistory] = useState([]);
  

  const moodValues = {
  Great: 5,
  Good: 4,
  Okay: 3,
  Low: 2,
  Stressed: 1,
};
const totalCheckins = history.length;

const moodCounts = history.reduce((counts, item) => {
  counts[item.mood] = (counts[item.mood] || 0) + 1;
  return counts;
}, {});

const mostCommonMood =
  Object.keys(moodCounts).length > 0
    ? Object.keys(moodCounts).reduce((a, b) =>
        moodCounts[a] > moodCounts[b] ? a : b
      )
    : "—";

const averageMood =
  history.length > 0
    ? (
        history.reduce(
          (total, item) => total + (moodValues[item.mood] || 3),
          0
        ) / history.length
      ).toFixed(1)
    : "—";

const latestMood =
  history.length > 0
    ? history[0].mood
    : "—";
    const getWellnessMessage = () => {
  if (history.length === 0) {
    return "Your wellness journey starts with your first check-in.";
  }

  if (latestMood === "Great" || latestMood === "Good") {
    return "You've had some positive check-ins recently. Keep taking small moments to understand how you're feeling.";
  }

  if (latestMood === "Stressed" || latestMood === "Low") {
    return "Your recent check-in suggests you may be having a challenging time. Consider taking a short reset with Calm Mode.";
  }

  return "Keep checking in with yourself. Understanding your emotions is an important part of your wellness journey.";
};



  const chartData = [...history]
    .slice(0, 7)
    .reverse()
    .map((item) => ({
      date: item.date,
      mood: moodValues[item.mood] || 3,
      label: item.mood,
    }));

 useEffect(() => {
  const savedHistory =
    JSON.parse(localStorage.getItem("mindmateHistory")) || [];

  setHistory(savedHistory);
}, [historyUpdated]);

  const clearHistory = () => {
  const confirmed = window.confirm(
    "Are you sure you want to clear your mood history?"
  );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem("mindmateHistory");
  setHistory([]);
};

  const getMoodEmoji = (mood) => {
    const moodMap = {
      Happy: "😊",
      Calm: "😌",
      Neutral: "😐",
      Sad: "😔",
      Stressed: "😫",
      Angry: "😠",
      Anxious: "😟",
      Tired: "😴",
    };

    return moodMap[mood] || "🙂";
  };

  return (
    <section className="history-section">

      <div className="history-header">

        <div>
          <p className="history-label">
            YOUR WELLNESS JOURNEY
          </p>

          <h2>Mood History 📊</h2>

          <p>
            A simple look at your recent check-ins.
          </p>
        </div>

        {history.length > 0 && (
          <button
            className="clear-history-btn"
            onClick={clearHistory}
          >
            Clear History
          </button>
        )}

      </div>
      {/* Wellness Summary */}

{history.length > 0 && (
  <div className="wellness-summary">

    <div className="summary-card">
      <span className="summary-icon">📝</span>
      <div>
        <span>Total Check-ins</span>
        <h3>{totalCheckins}</h3>
      </div>
    </div>

    <div className="summary-card">
      <span className="summary-icon">😊</span>
      <div>
        <span>Most Common Mood</span>
        <h3>{mostCommonMood}</h3>
      </div>
    </div>

    <div className="summary-card">
      <span className="summary-icon">📊</span>
      <div>
        <span>Average Mood</span>
        <h3>{averageMood} / 5</h3>
      </div>
    </div>

    <div className="summary-card">
      <span className="summary-icon">🌱</span>
      <div>
        <span>Latest Mood</span>
        <h3>{latestMood}</h3>
      </div>
    </div>

  </div>
)}
{history.length > 0 && (
  <div className="wellness-message">
    <div className="wellness-message-icon">
      🌱
    </div>

    <div>
      <p>YOUR MINDMATE REFLECTION</p>
      <h3>One small step at a time.</h3>
      <span>{getWellnessMessage()}</span>
    </div>
  </div>
)}

      {history.length === 0 ? (

        /* Empty state */

        <div className="empty-history">

          <div className="empty-icon">
            🌱
          </div>

          <h3>
            Your journey starts here
          </h3>

          <p>
            Complete your first check-in and your mood
            history will appear here.
          </p>

        </div>

      ) : (

        /* History exists */

        <>
          {/* Mood Trend */}

          <div className="mood-chart-card">

            <div className="chart-title">

              <div>
                <h3>Mood Trend</h3>

                <p>
                  Your last 7 check-ins
                </p>
              </div>

            </div>

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={240}
              >

                <LineChart data={chartData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(value) => {
                      const labels = {
                        1: "Low",
                        2: "Low",
                        3: "Okay",
                        4: "Good",
                        5: "Great",
                      };

                      return labels[value];
                    }}
                    tick={{ fontSize: 10 }}
                  />

                  <Tooltip
                    formatter={(value, name, props) => [
                      props.payload.label,
                      "Mood",
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="mood"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* History List */}

          <div className="history-list">

            {history.map((item) => (

              <div
                className="history-card"
                key={item.id}
              >

                <div className="history-mood">

                  <span className="mood-emoji">
                    {getMoodEmoji(item.mood)}
                  </span>

                  <div>

                    <h3>
                      {item.mood}
                    </h3>

                    <p>
                      {item.date}
                    </p>

                  </div>

                </div>

                <div className="history-details">

                  <div>
                    <span>
                      Emotion
                    </span>

                    <strong>
                      {item.emotion}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Intensity
                    </span>

                    <strong>
                      {item.intensity}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Trigger
                    </span>

                    <strong>
                      {item.possibleTrigger}
                    </strong>
                  </div>

                </div>

              </div>

            ))}

          </div>
        </>

      )}

    </section>
  );
}

export default MoodHistory;