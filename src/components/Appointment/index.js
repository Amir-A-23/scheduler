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

	function save(name, interviewer, edit = false) {
		if (name && interviewer) {
			transition(SAVING);
			const interview = {
				student: name,
				interviewer,
			};
			Promise.resolve(props.bookInterview(props.id, interview, edit))
				.then(() => transition(SHOW))
				.catch(() => transition(ERROR_SAVE, true));
		}
	}

	function deleteInterview() {
		transition(CONFIRM);
	}
	function confirmDelete() {
		transition(DELETING, true);

		Promise.resolve(props.cancelInterview(props.id))
			.then(() => transition(EMPTY))
			.catch(() => transition(ERROR_DELETE, true));
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
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
					edit={false}
				/>
			)}
			{mode === SAVING && <Status message={'Saving'} />}
			{mode === DELETING && <Status message={'Deleting'} />}
			{mode === CONFIRM && (
				<Confirm
					message={'Please confirm you wish to delete your appointment.'}
					onCancel={back}
					onConfirm={confirmDelete}
				/>
			)}
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interview={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
					edit={true}
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error message={'Error saving changes'} onClose={() => back(CREATE)} />
			)}
			{mode === ERROR_DELETE && (
				<Error
					message={'Error deleting appointment'}
					onClose={() => back(SHOW)}
				/>
			)}
		</article>
	);
}

export default Appointment;
