export function getAppointmentsForDay(state, day) {
	const matchedDays = state.days.filter((dayObj) => {
		return dayObj.name === day;
	});

	if (matchedDays.length === 0) {
		return [];
	}

	const appointments = matchedDays[0].appointments.map((appointmentID) => {
		return state.appointments[appointmentID];
	});
	return appointments;
}
