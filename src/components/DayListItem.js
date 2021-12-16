import React from 'react';

import 'components/DayListItem.scss';

import classNames from 'classnames';

function formatSpots(spots) {
	if (spots === 0) {
		return 'no spots remaining';
	}
	if (spots === 1) {
		return `${spots} spot remaining`;
	}
	if (spots > 1) {
		return `${spots} spots remaining`;
	}
}

function DayListItem(props) {
	const { name, spots, selected, setDay } = props;

	let dayClass = classNames('day-list__item', {
		'day-list__item--selected': selected,
		'day-list__item--full': spots === 0,
	});

	return (
		<li className={dayClass} onClick={() => setDay(name)} data-testid='day'>
			<h2 className='text--regular'>{name}</h2>
			<h3 className='text--light'>{formatSpots(spots)}</h3>
		</li>
	);
}

export default DayListItem;
