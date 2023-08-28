import { questions, questionsForOthers } from '../utils/questions';

export const useQuestion = (userId, asseesseeId) => {
  if (userId === asseesseeId) {
    return questions
  } else {
    return questionsForOthers
  }
}
