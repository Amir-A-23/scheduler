import React from 'react';

import 'components/InterviewerListItem.scss';

import classNames from 'classnames';

function InterviewerListItem(props) {
	const { name, avatar, selected, setInterviewer } = props;

	let interviewerClass = classNames('interviewers__item', {
		'interviewers__item--selected': selected,
	});

	return (
		<li className={interviewerClass} onClick={setInterviewer}>
			<img
				className='interviewers__item-image'
				src={props.avatar}
				alt={props.name}
			/>
			{props.selected && props.name}
		</li>
	);
}

export default InterviewerListItem;
