export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatQuestion(question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = author;
  const answers = [...optionOne.votes, ...optionTwo.votes];

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOne: optionOne,
    optionTwo: optionTwo,
    answers,
    hasAnswerd: answers.includes(authedUser),
  };
}

export function formatUser(user) {
  const { id, name, avatarURL, questions, answers } = user;
  const score = questions.length + Object.keys(answers).length
  return {
    id,
    name,
    avatar: avatarURL,
    nQuestions: questions.length,
    nAnswers: Object.keys(answers).length,
    score,
  };
}
