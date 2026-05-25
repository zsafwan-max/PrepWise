import { useState } from 'react';

const initialTopic = {
  name: '',
  estimatedHours: 1,
  importance: 3,
  difficulty: 3,
  confidence: 3,
};

function TopicForm({ onAddTopic }) {
  const [topic, setTopic] = useState(initialTopic);

  function handleChange(event) {
    const { name, value, type } = event.target;

    setTopic((currentTopic) => ({
      ...currentTopic,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!topic.name.trim()) {
      return;
    }

    onAddTopic({
      ...topic,
      name: topic.name.trim(),
    });

    setTopic(initialTopic);
  }

  return (
    <form className="topic-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Topic name
          <input
            name="name"
            type="text"
            value={topic.name}
            onChange={handleChange}
            placeholder="Chapter 4 review"
            required
          />
        </label>

        <label>
          Estimated hours
          <input
            name="estimatedHours"
            type="number"
            min="1"
            value={topic.estimatedHours}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Importance
          <select name="importance" value={topic.importance} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>

        <label>
          Difficulty
          <select name="difficulty" value={topic.difficulty} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>

        <label>
          Confidence
          <select name="confidence" value={topic.confidence} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button className="secondary-button" type="submit">
        Add topic
      </button>
    </form>
  );
}

export default TopicForm;
