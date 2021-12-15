import { useState } from 'react';

function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);
	function transition(newMode, replace = false) {
		if (replace) {
			setMode(newMode);
		} else {
			setMode(newMode);
			setHistory((prev) => [...prev, newMode]);
		}
	}
	function back() {
		if (history.length === 1) {
			return;
		}
		setMode(history[history.length - 2]);
		//	console.log('HISTORY', typeof history);
		setHistory(history.slice(0, -1));
	}

	return { mode, transition, back };
}

export default useVisualMode;
