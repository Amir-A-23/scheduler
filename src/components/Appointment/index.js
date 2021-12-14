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
	const SAVING = 'SAVING';

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY,
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};

		transition(SAVING);
		Promise.resolve(props.bookInterview(props.id, interview))
			.then(() => transition(SHOW))
			.catch((err) =>
				console.log('Error coming from appointment not saving', err),
			);
		//	props.bookInterview(props.id, interview);
		//console.log('Inside save function', interview);

		//transition(SHOW);
	}
	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
				/>
			)}
			{/* Add    onSave={} */}
			{mode === CREATE && (
				<Form interviewers={props.interviewers} onSave={save} onCancel={back} />
			)}
			{mode === SAVING && <Status />}
		</article>
	);
}

export default Appointment;
