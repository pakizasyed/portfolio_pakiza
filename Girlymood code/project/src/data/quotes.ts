import { Quote } from '../types';

export const QUOTES: Quote[] = [
  {
    text: "You are enough just as you are.",
    author: "Meghan Markle"
  },
  {
    text: "I am in charge of how I feel and today I choose happiness.",
    author: "Anonymous"
  },
  {
    text: "Take care of your inner, emotional self first. The rest will come.",
    author: "Brittany Burgunder"
  },
  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia"
  },
  {
    text: "Your emotions make you human. Even the unpleasant ones have a purpose.",
    author: "Sabaa Tahir"
  },
  {
    text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.",
    author: "Lori Deschene"
  },
  {
    text: "Be proud of who you are, and not ashamed of how someone else sees you.",
    author: "Anonymous"
  },
  {
    text: "Your mind is a garden, your thoughts are the seeds. You can grow flowers or you can grow weeds.",
    author: "Anonymous"
  }
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomIndex];
};