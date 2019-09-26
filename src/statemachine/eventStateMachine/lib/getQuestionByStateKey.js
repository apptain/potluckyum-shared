import { prompt, newEvent, findEvent, pingEvent } from './constants/States';

const getQuestionByStateKey = (key) => {
  const byKey = {
    [prompt]: 'How may I help you today?',
    [newEvent]: 'What would you like to order?',
    [findEvent]: 'Please enter a event number',
    [pingEvent]: 'What you like to send a ping to this event?'
  };

  return (
    byKey[key] && {
      event: byKey[key],
      key: key
    }
  );
};

export default getQuestionByStateKey;
