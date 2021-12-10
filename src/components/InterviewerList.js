import React from 'react';
import 'components/InterviewerList.scss';
function InterviewerList() {
	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'></ul>
		</section>
	);
}

export default InterviewerList;
