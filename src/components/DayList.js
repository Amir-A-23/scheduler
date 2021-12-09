import React from 'react';

import DayListItem from 'components/DayListItem';

function DayList(props) {
	const days = props.days;
	const listDays = days.map((day) => (
		<DayListItem
			key={day.id}
			//name={day.name}
			//spots={day.spots}
			{...day}
			setDay={props.setDay}
		/>
	));
	return <ul>{listDays}</ul>;
}

export default DayList;
