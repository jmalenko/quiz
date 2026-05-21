export async function fetchQuestions() {
  const response = await fetch('/api/questions');
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
}

export async function submitAnswer(questionId, selectedOption) {
  const response = await fetch('/api/answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, selectedOption }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }
  return response.json();
}
