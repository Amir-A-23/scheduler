import { useState } from 'react';

function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	//transition to new mode and save to history stack
	function transition(newMode, replace = false) {
		if (replace) {
			setMode(newMode);
		} else {
			setMode(newMode);
			setHistory((prev) => [...prev, newMode]);
		}
	}

	//return to previous mode by setting state to second last element in history stack
	//then remove the last element of the history stack
	function back() {
		if (history.length === 1) {
			return;
		}
		setMode(history[history.length - 2]);
		setHistory(history.slice(0, -1));
	}

	return { mode, transition, back };
}

export default useVisualMode;
