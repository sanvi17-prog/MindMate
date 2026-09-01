import { useState } from "react";

function MoodCheckin({ onBack, onHistoryUpdate }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [journal, setJournal] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const moods = [
    { emoji: "😊", name: "Great" },
    { emoji: "🙂", name: "Good" },
    { emoji: "😐", name: "Okay" },
    { emoji: "😟", name: "Low" },
    { emoji: "😫", name: "Stressed" },
  ];

  const handleAnalyze = async () => {
    if (!selectedMood) {
      alert("Please select how you're feeling.");
      return;
    }

    if (!journal.trim()) {
      alert("Please tell MindMate what's on your mind.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/mood/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mood: selectedMood,
            journal: journal,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      // Show AI analysis
      setAnalysis(data.data);

      // Create history record
      const historyItem = {
        id: Date.now(),
        mood: selectedMood,
        emotion: data.data.emotion,
        intensity: data.data.intensity,
        possibleTrigger: data.data.possibleTrigger,
        date: new Date().toLocaleDateString(),
      };

      // Get existing history
      const existingHistory =
        JSON.parse(localStorage.getItem("mindmateHistory")) || [];

      // Save new record
      localStorage.setItem(
        "mindmateHistory",
        JSON.stringify([historyItem, ...existingHistory])
      );

      // Tell App that history has changed
      if (onHistoryUpdate) {
        onHistoryUpdate();
      }
    } catch (error) {
      console.error("AI analysis error:", error);
      alert("Could not analyze your mood right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkin-page">

      {/* Back Button */}
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="checkin-container">

        {/* Header */}
        <div className="checkin-header">

          <p className="checkin-label">
            DAILY CHECK-IN
          </p>

          <h1>
            How are you feeling today?
          </h1>

          <p>
            Take a moment to check in with yourself.
            There are no right or wrong answers.
          </p>

        </div>

        {/* Mood Selection */}
        <div className="mood-section">

          <h3>
            Choose your mood
          </h3>

          <div className="mood-options">

            {moods.map((mood) => (
              <button
                key={mood.name}
                className={`mood-option ${
                  selectedMood === mood.name
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedMood(mood.name)
                }
              >

                <span>
                  {mood.emoji}
                </span>

                <small>
                  {mood.name}
                </small>

              </button>
            ))}

          </div>

        </div>

        {/* Journal */}
        <div className="journal-section">

          <h3>
            What's on your mind?
          </h3>

          <p>
            Share as much or as little as you'd like.
          </p>

          <textarea
            value={journal}
            onChange={(e) =>
              setJournal(e.target.value)
            }
            placeholder="For example: I've been feeling stressed about my upcoming exams..."
            rows="7"
          />

        </div>

        {/* Analyze Button */}
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading
            ? "MindMate is thinking..."
            : "Analyze My Mood →"}
        </button>

        {/* AI Analysis */}
        {analysis && (
          <div className="analysis-card">

            {/* Analysis Header */}
            <div className="analysis-header">

              <div className="analysis-ai-icon">
                🤖
              </div>

              <div>

                <p className="analysis-label">
                  MINDMATE INSIGHT
                </p>

                <h2>
                  Here's what MindMate noticed
                </h2>

              </div>

            </div>

            {/* Main Analysis */}
            <div className="analysis-main">

              <div className="analysis-item">

                <span>
                  💭 Emotion
                </span>

                <strong>
                  {analysis.emotion}
                </strong>

              </div>

              <div className="analysis-item">

                <span>
                  📊 Intensity
                </span>

                <strong>
                  {analysis.intensity}
                </strong>

              </div>

              <div className="analysis-item">

                <span>
                  🎯 Possible trigger
                </span>

                <strong>
                  {analysis.possibleTrigger}
                </strong>

              </div>

            </div>

            {/* Insight */}
            <div className="insight-box">

              <h3>
                💡 Your insight
              </h3>

              <p>
                {analysis.insight}
              </p>

            </div>

            {/* Suggestions */}
            <div className="suggestions">

              <h3>
                🌱 Your next steps
              </h3>

              {Array.isArray(analysis.suggestions) &&
                analysis.suggestions.map(
                  (suggestion, index) => (
                    <div
                      className="suggestion"
                      key={index}
                    >

                      <span>
                        ✓
                      </span>

                      <p>
                        {suggestion}
                      </p>

                    </div>
                  )
                )}

            </div>

            {/* Mind + Body Reset */}
            {analysis.resetActivity && (
              <div className="reset-card">

                <div className="reset-header">

                  <span className="reset-icon">
                    🌿
                  </span>

                  <div>

                    <p className="reset-label">
                      MIND + BODY RESET
                    </p>

                    <h3>
                      {analysis.resetActivity.title}
                    </h3>

                  </div>

                </div>

                <div className="reset-duration">
                  ⏱️ {analysis.resetActivity.duration}
                </div>

                <p className="reset-instructions">
                  {analysis.resetActivity.instructions}
                </p>

              </div>
            )}

          </div>
        )}

        {/* Privacy */}
        <p className="privacy-note">
          🔒 Your check-in is private and used only to
          provide personalized wellness support.
        </p>

      </div>

    </div>
  );
}

export default MoodCheckin;