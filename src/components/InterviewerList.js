import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

function InterviewerList(props) {
	const { interviewers, setInterviewer } = props;
	const listOfInterviewers = interviewers.map((interviewer) => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				{...interviewer}
				selected={interviewer.id === props.interviewer}
				setInterviewer={setInterviewer}
			/>
		);
	});
	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>{listOfInterviewers}</ul>
		</section>
	);
}

export default InterviewerList;
