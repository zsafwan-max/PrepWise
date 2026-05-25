function calculatePriorityScore(topic) {
  return (topic.importance * 3) + (topic.difficulty * 2) + ((6 - topic.confidence) * 2);
}

function buildSelectionReason(topic) {
  return `${topic.name} was selected because it has importance ${topic.importance}/5, difficulty ${topic.difficulty}/5, and confidence ${topic.confidence}/5. Higher importance, harder topics, and lower confidence increase its priority score.`;
}

function optimizeStudyPlan({ examName, examDate, totalHours, topics }) {
  const capacity = totalHours;
  const topicsWithScores = topics.map((topic, index) => ({
    ...topic,
    id: index,
    priorityScore: calculatePriorityScore(topic),
  }));

  const topicCount = topicsWithScores.length;

  // dp[i][hours] stores the best priority score we can get by considering
  // the first i topics with a study-hour limit of "hours".
  const dp = Array.from({ length: topicCount + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= topicCount; i += 1) {
    const topic = topicsWithScores[i - 1];

    for (let hours = 0; hours <= capacity; hours += 1) {
      const skipTopic = dp[i - 1][hours];

      if (topic.estimatedHours > hours) {
        dp[i][hours] = skipTopic;
      } else {
        const takeTopic = topic.priorityScore + dp[i - 1][hours - topic.estimatedHours];
        dp[i][hours] = Math.max(skipTopic, takeTopic);
      }
    }
  }

  const selectedIds = new Set();
  let remainingCapacity = capacity;

  // Walk backward through the table to find which topics created the best score.
  for (let i = topicCount; i > 0; i -= 1) {
    if (dp[i][remainingCapacity] !== dp[i - 1][remainingCapacity]) {
      const topic = topicsWithScores[i - 1];
      selectedIds.add(topic.id);
      remainingCapacity -= topic.estimatedHours;
    }
  }

  const sortByPriority = (a, b) => {
    if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
    if (b.importance !== a.importance) return b.importance - a.importance;
    return a.estimatedHours - b.estimatedHours;
  };

  const selectedTopics = topicsWithScores
    .filter((topic) => selectedIds.has(topic.id))
    .sort(sortByPriority)
    .map((topic) => ({
      name: topic.name,
      estimatedHours: topic.estimatedHours,
      suggestedHours: topic.estimatedHours,
      importance: topic.importance,
      difficulty: topic.difficulty,
      confidence: topic.confidence,
      priorityScore: topic.priorityScore,
      reason: buildSelectionReason(topic),
    }));

  const skippedTopics = topicsWithScores
    .filter((topic) => !selectedIds.has(topic.id))
    .sort(sortByPriority)
    .map((topic) => ({
      name: topic.name,
      estimatedHours: topic.estimatedHours,
      importance: topic.importance,
      difficulty: topic.difficulty,
      confidence: topic.confidence,
      priorityScore: topic.priorityScore,
      reason: `${topic.name} was skipped because the study plan had limited hours and another combination produced a higher total priority score.`,
    }));

  const totalHoursUsed = selectedTopics.reduce((sum, topic) => sum + topic.suggestedHours, 0);
  const totalPriorityScore = dp[topicCount][capacity];

  const explanation = selectedTopics.length > 0
    ? `PrepWise selected ${selectedTopics.length} topic(s) for ${examName} using a dynamic programming approach similar to 0/1 knapsack. The plan uses ${totalHoursUsed} of ${totalHours} available hour(s) and maximizes the total priority score.`
    : `PrepWise could not select any topics for ${examName} because each topic needs more hours than the available study time.`;

  return {
    examName,
    examDate,
    selectedTopics,
    skippedTopics,
    totalHoursUsed,
    remainingHours: totalHours - totalHoursUsed,
    totalPriorityScore,
    explanation,
  };
}

module.exports = {
  calculatePriorityScore,
  optimizeStudyPlan,
};
