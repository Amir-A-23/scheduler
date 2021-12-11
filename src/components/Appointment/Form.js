import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
function Form(props) {
	const [student, setStudent] = useState(props.student || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

	const reset = () => {
		setStudent('');
		setInterviewer(null);
	};

	function cancel() {
		reset();
		props.onCancel();
	}

	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
					<input
						className='appointment__create-input text--semi-bold'
						name={props.name}
						type='text'
						placeholder='Enter Student Name'
						onChange={(event) => setStudent(event.target.value)}
						value={student}
						/*
          This must be a controlled component
          your code goes here
        */
					/>
				</form>
				<InterviewerList
					/* your code goes here */
					interviewers={props.interviewers}
					onChange={(event) => setInterviewer(event)}
					value={interviewer}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					{/* Bug where onClick is firing at every key input, like onChange */}
					<Button confirm onClick={props.onSave(student, interviewer)}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}

export default Form;
