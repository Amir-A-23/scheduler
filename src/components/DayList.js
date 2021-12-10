import React from 'react';

import DayListItem from 'components/DayListItem';

function DayList(props) {
	const days = props.days;
	const listDays = days.map((day) => {
		return (
			<DayListItem
				key={day.id}
				//name={day.name}
				//spots={day.spots}
				{...day}
				selected={day.name === props.value}
				setDay={props.onChange}
			/>
		);
	});
	return <ul>{listDays}</ul>;
}

export default DayList;
