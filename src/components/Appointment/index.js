import React from 'react';

import './styles.scss';

function Appointment(props) {
	return props.time ? (
		<article className='appointment'>Appointments at {props.time}</article>
	) : (
		<article className='appointment'>No Appoinments</article>
	);
}

export default Appointment;
