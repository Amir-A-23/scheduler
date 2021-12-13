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

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}
	const interviewerData = { ...state.interviewers[interview.interviewer] };
	return {
		...interview,
		interviewer: interviewerData,
	};
}

export function getInterviewersForDay(state, day) {
	const matchedDays = state.days.filter((dayObj) => {
		return dayObj.name === day;
	});

	if (matchedDays.length === 0) {
		return [];
	}

	const interviewers = matchedDays[0].interviewers.map((interviwerID) => {
		return state.interviewers[interviwerID];
	});
	return interviewers;
}
