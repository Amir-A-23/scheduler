import React from 'react';

import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

function Appointment(props) {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY,
	);
	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && props.interview && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
				/>
			)}
			{/* Add    onSave={} */}
			{mode === CREATE && <Form interviewers={[]} onCancel={back} />}
		</article>
	);
}

export default Appointment;
