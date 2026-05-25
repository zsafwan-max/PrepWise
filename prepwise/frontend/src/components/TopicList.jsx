function TopicList({ topics, onRemoveTopic }) {
  if (topics.length === 0) {
    return (
      <div className="empty-state">
        Add a few exam topics to see how PrepWise prioritizes them.
      </div>
    );
  }

  return (
    <div className="topic-list">
      {topics.map((topic, index) => (
        <article className="topic-card" key={`${topic.name}-${index}`}>
          <div>
            <h3>{topic.name}</h3>
            <p>{topic.estimatedHours} hour(s) needed</p>
          </div>

          <div className="topic-meta">
            <span>Importance: {topic.importance}</span>
            <span>Difficulty: {topic.difficulty}</span>
            <span>Confidence: {topic.confidence}</span>
          </div>

          <button
            className="text-button"
            type="button"
            onClick={() => onRemoveTopic(index)}
          >
            Remove
          </button>
        </article>
      ))}
    </div>
  );
}

export default TopicList;
