import React from 'react';

import DayListItem from 'components/DayListItem';

function DayList(props) {
	const days = props.days;
	const listDays = days.map((day) => {
		return (
			<DayListItem
				key={day.id}
				{...day}
				selected={day.name === props.day}
				setDay={props.setDay}
			/>
		);
	});
	return <ul>{listDays}</ul>;
}

export default DayList;
