import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // set state "mode" to new state, and keep track of history
  // replace T/F determines whether or not to skip a temporary state "mode" in history
  function transition(next, replace = false) {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(next);
    setHistory(newHistory);
    setMode(next);
  }

  // set state "mode" to previous state
  function back() {
    const newHistory = [...history];
    if (newHistory.length > 1) {
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }
  return { mode, transition, back };
}