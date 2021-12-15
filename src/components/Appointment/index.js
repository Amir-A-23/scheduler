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
	const DELETING = 'DELETING';
	const EDIT = 'EDIT';
	const CONFIRM = 'CONFIRM';
	const ERROR_SAVE = 'ERROR_SAVE';
	const ERROR_DELETE = 'ERROR_DELETE';
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
			.catch((error) => transition(ERROR_SAVE, true));
	}

	function deleteInterview() {
		transition(CONFIRM);
	}
	function deleteConfirm() {
		transition(DELETING, true);

		Promise.resolve(props.cancelInterview(props.id))
			.then(() => transition(EMPTY))
			.catch((error) => transition(ERROR_DELETE, true));
	}

	function edit() {
		transition(EDIT);
	}
	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onDelete={deleteInterview}
					onEdit={edit}
				/>
			)}
			{/* Add    onSave={} */}
			{mode === CREATE && (
				<Form interviewers={props.interviewers} onSave={save} onCancel={back} />
			)}
			{mode === SAVING && <Status message={'Saving'} />}
			{mode === DELETING && <Status message={'Deleting'} />}
			{mode === CONFIRM && (
				<Confirm
					message={'Please confirm you wish to delete your appointment.'}
					onCancel={back}
					onConfirm={deleteConfirm}
				/>
			)}
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interview={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error message={'Error saving changes'} oneClose={() => back()} />
			)}
			{mode === ERROR_DELETE && (
				<Error
					message={'Error deleting appointment'}
					oneClose={() => back(SHOW)}
				/>
			)}
		</article>
	);
}

export default Appointment;
