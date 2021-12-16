import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
function Form(props) {
	const [name, setName] = useState(props.name || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState('');

	function validate() {
		if (name === '') {
			setError('Student name cannot be blank');
			return;
		}

		setError('');
		props.onSave(name, interviewer);
	}
	const reset = () => {
		setName('');
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
						name='name'
						type='text'
						placeholder='Enter Student Name'
						onChange={(event) => setName(event.target.value)}
						value={name}
						data-testid='student-name-input'
					/>
				</form>
				<section className='appointment__validation'>{error}</section>
				<InterviewerList
					/* your code goes here */
					interviewers={props.interviewers}
					onChange={setInterviewer}
					value={interviewer}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					{/* Bug where onClick is firing at every key input, like onChange */}
					{/* Add back in for booking ....    */}
					<Button confirm onClick={() => validate()}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}

export default Form;
