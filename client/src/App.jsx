import MoodHistory from "./MoodHistory";
import { useState, useEffect } from "react";
import "./App.css";
import MoodCheckin from "./MoodCheckin";
import CalmMode from "./CalmMode";

function App() {
  const [showCheckin, setShowCheckin] = useState(false);
  const [historyUpdated, setHistoryUpdated] = useState(false);
  const [showCalmMode, setShowCalmMode] = useState(false);
  useEffect(() => {
  if (showCheckin) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [showCheckin]);


if (showCheckin) {

  return (
    <>
      <MoodCheckin
        onBack={() => setShowCheckin(false)}
        onHistoryUpdate={() =>
          setHistoryUpdated((prev) => !prev)
        }
      />

      <MoodHistory
        historyUpdated={historyUpdated}
      />
    </>
  );
}
if (showCalmMode) {
  return (
    <CalmMode
      onBack={() => setShowCalmMode(false)}
    />
  );
}
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🧠 MindMate
        </div>

       <div className="nav-links">
  <a href="#home">Home</a>
  <a href="#features">Features</a>

  <button
    className="nav-checkin-btn"
    onClick={() => setShowCheckin(true)}
  >
    Check-in
  </button>
</div>

        <button className="login-btn">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="hero" id="home">

        <div className="hero-content">

          <div className="badge">
            ✨ AI-powered wellness companion
          </div>

          <h1>
            Understand your mood.
            <br />
            <span>Take your next step.</span>
          </h1>

          <p>
            MindMate helps you understand how you're feeling,
            discover what's affecting your mood, and take a
            small positive step toward feeling better.
          </p>

          <button
  className="primary-btn"
  onClick={() => setShowCheckin(true)}
>
  Start Your Check-in →
</button>
          <p className="privacy-text">
            🔒 Your wellness journey is private and personal.
          </p>

        </div>                           

        {/* Hero Card */}
        <div className="hero-card">

          <div className="card-header">
            <div>
              <p className="small-text">Today's check-in</p>
              <h2>How are you feeling?</h2>
            </div>

            <div className="date">
              Today
            </div>
          </div>

          <div className="mood-container">

            <button
  className="mood"
  onClick={() => setShowCheckin(true)}
>
  <span>😊</span>
  <small>Great</small>
</button>

<button
  className="mood"
  onClick={() => setShowCheckin(true)}
>
  <span>🙂</span>
  <small>Good</small>
</button>

<button
  className="mood"
  onClick={() => setShowCheckin(true)}
>
  <span>😐</span>
  <small>Okay</small>
</button>

<button
  className="mood"
  onClick={() => setShowCheckin(true)}
>
  <span>😟</span>
  <small>Low</small>
</button>

<button
  className="mood"
  onClick={() => setShowCheckin(true)}
>
  <span>😫</span>
  <small>Stressed</small>
</button>
          </div>

          <div className="ai-preview">

            <div className="ai-icon">
              ✨
            </div>

            <div>
              <p className="ai-title">
                AI Wellness Insight
              </p>

              <p className="ai-text">
                Your check-in helps MindMate understand
                your emotional patterns and suggest
                helpful next steps.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Features */}
    {/* Features */}
<section className="features" id="features">

  <div className="section-heading">
    <p>HOW MINDMATE HELPS</p>

    <h2>
      Small steps can make a difference.
    </h2>
  </div>

  <div className="feature-grid">

    {/* Mood Check-ins */}
    <div
      className="feature-card"
      onClick={() => setShowCheckin(true)}
      style={{ cursor: "pointer" }}
    >
      <div className="feature-icon">
        📝
      </div>

      <h3>
        Mood Check-ins
      </h3>

      <p>
        Quickly record how you're feeling
        and keep track of your emotional
        patterns over time.
      </p>
    </div>


    {/* AI Insights */}
    <div
      className="feature-card"
      onClick={() => setShowCheckin(true)}
      style={{ cursor: "pointer" }}
    >
      <div className="feature-icon">
        🤖
      </div>

      <h3>
        AI Insights
      </h3>

      <p>
        Get personalized wellness suggestions
        based on what you share with MindMate.
      </p>
    </div>


    {/* Calm Mode */}
    <div
      className="feature-card"
      onClick={() => setShowCalmMode(true)}
      style={{ cursor: "pointer" }}
    >
      <div className="feature-icon">
        🫁
      </div>

      <h3>
        Calm Mode
      </h3>

      <p>
        Use simple breathing and relaxation
        activities whenever you need a reset.
      </p>
    </div>

  </div>

</section>
{/* Wellness Snapshot */}

<section className="wellness-snapshot">

  <div className="section-heading">

    <p>
      YOUR WELLNESS SNAPSHOT
    </p>

    <h2>
      Your journey, one small step at a time.
    </h2>

  </div>

  <div className="snapshot-grid">

    <div className="snapshot-card">

      <div className="snapshot-icon">
        🧠
      </div>

      <div>
        <span>AI-powered</span>
        <h3>Mood Insights</h3>
      </div>

    </div>

    <div className="snapshot-card">

      <div className="snapshot-icon">
        📊
      </div>

      <div>
        <span>Track over time</span>
        <h3>Mood Patterns</h3>
      </div>

    </div>

    <div className="snapshot-card">

      <div className="snapshot-icon">
        🌿
      </div>

      <div>
        <span>Take a moment</span>
        <h3>2-Minute Resets</h3>
      </div>

    </div>

  </div>

</section>
      {/* Mood History */}

      <MoodHistory
        historyUpdated={historyUpdated}
      />
      {/* Footer */}
      <footer>
        <div className="logo">
          🧠 MindMate
        </div>

        <p>
          AI-powered wellness support for everyday life.
        </p>
      </footer>

    </div>
  );
}

export default App;

