import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  // set state "mode" to new state, and keep track of history
  // replace T/F determines whether or not to skip a temporary state "mode" in history
  function transition(next, replace = false) {

    if (replace) {
      history.pop();
    }

    history.push(next);
    setHistory(history);
    setMode(next);
  }

  // set state "mode" to previous state
  function back() {

    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}