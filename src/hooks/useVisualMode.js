import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace = false) {
    
    if (replace) {
      history.pop();
    }

    history.push(next);
    setHistory(history);
    setMode(next);

  }

  function back() {

    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[history.length-1]);
    } 
  }

  return { mode, transition, back };
}