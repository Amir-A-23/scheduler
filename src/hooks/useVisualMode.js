import { useState } from 'react';

function useVisualMode(initial) {
	const [mode, setmode] = useState(initial);
	return { mode };
}

export default useVisualMode;
