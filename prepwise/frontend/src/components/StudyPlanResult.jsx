function TopicResultCard({ topic }) {
  return (
    <article className="result-topic-card">
      <div>
        <h4>{topic.name}</h4>
        <p>{topic.reason}</p>
      </div>
      <div className="score-pill">
        Focus level {topic.priorityScore}
      </div>
      {topic.suggestedHours && (
        <div className="hours-pill">
          Study {topic.suggestedHours} hour(s)
        </div>
      )}
    </article>
  );
}

function StudyPlanResult({ result }) {
  if (!result) {
    return null;
  }

  return (
    <section className="card results-card">
      <div className="section-heading">
        <p className="eyebrow">Your study plan</p>
        <h2>{result.examName}</h2>
        {result.examDate && <p>Exam date: {result.examDate}</p>}
      </div>

      <div className="summary-grid">
        <div>
          <span>Readiness score</span>
          <strong>{result.totalPriorityScore}</strong>
        </div>
        <div>
          <span>Hours used</span>
          <strong>{result.totalHoursUsed}</strong>
        </div>
        <div>
          <span>Remaining hours</span>
          <strong>{result.remainingHours}</strong>
        </div>
      </div>

      <p className="result-explanation">{result.explanation}</p>

      <div className="result-columns">
        <div>
          <h3>Prioritized topics</h3>
          {result.selectedTopics.length === 0 ? (
            <p className="muted-text">No topics fit within the available study time.</p>
          ) : (
            <div className="result-list">
              {result.selectedTopics.map((topic) => (
                <TopicResultCard key={topic.name} topic={topic} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h3>Skipped topics</h3>
          {result.skippedTopics.length === 0 ? (
            <p className="muted-text">No topics were skipped.</p>
          ) : (
            <div className="result-list">
              {result.skippedTopics.map((topic) => (
                <TopicResultCard key={topic.name} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StudyPlanResult;
