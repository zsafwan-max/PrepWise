import { useState } from 'react';
import TopicForm from './components/TopicForm.jsx';
import TopicList from './components/TopicList.jsx';
import StudyPlanResult from './components/StudyPlanResult.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [totalHours, setTotalHours] = useState(10);
  const [topics, setTopics] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function addTopic(topic) {
    setTopics((currentTopics) => [...currentTopics, topic]);
    setResult(null);
    setError('');
  }

  function removeTopic(topicIndex) {
    setTopics((currentTopics) => currentTopics.filter((topic, index) => index !== topicIndex));
    setResult(null);
  }

  async function generatePlan() {
    setError('');

    if (!examName.trim()) {
      setError('Please enter an exam name.');
      return;
    }

    if (!Number.isInteger(totalHours) || totalHours <= 0) {
      setError('Total available hours must be a positive whole number.');
      return;
    }

    if (topics.length === 0) {
      setError('Please add at least one topic.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/optimize-study-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examName: examName.trim(),
          examDate,
          totalHours,
          topics,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.join(' ') || 'Unable to generate the study plan.');
      }

      setResult(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Simple exam study planner</p>
        <h1>PrepWise</h1>
        <p>
          Build a clear study plan before your exam. Add your topics, rate how
          important they are, and PrepWise will suggest what to review first
          based on the time you have.
        </p>
      </section>

      <div className="layout-grid">
        <section className="card">
          <div className="section-heading">
            <p className="eyebrow">Step 1</p>
            <h2>Exam details</h2>
          </div>

          <div className="form-grid">
            <label>
              Exam name
              <input
                type="text"
                value={examName}
                onChange={(event) => setExamName(event.target.value)}
                placeholder="Biology Midterm"
              />
            </label>

            <label>
              Exam date
              <input
                type="date"
                value={examDate}
                onChange={(event) => setExamDate(event.target.value)}
              />
            </label>

            <label>
              Total available study hours
              <input
                type="number"
                min="1"
                value={totalHours}
                onChange={(event) => setTotalHours(Number(event.target.value))}
              />
            </label>
          </div>
        </section>

        <section className="card">
          <div className="section-heading">
            <p className="eyebrow">Step 2</p>
            <h2>Add topics</h2>
            <p>Rate each topic from 1 to 5 so PrepWise can understand what needs the most attention.</p>
          </div>

          <TopicForm onAddTopic={addTopic} />
        </section>
      </div>

      <section className="card">
        <div className="section-heading">
          <p className="eyebrow">Step 3</p>
          <h2>Topics to consider</h2>
        </div>

        <TopicList topics={topics} onRemoveTopic={removeTopic} />

        {error && <div className="error-message">{error}</div>}

        <button
          className="primary-button"
          type="button"
          onClick={generatePlan}
          disabled={isLoading}
        >
          {isLoading ? 'Generating plan...' : 'Generate Study Plan'}
        </button>
      </section>

      <StudyPlanResult result={result} />
    </main>
  );
}

export default App;
