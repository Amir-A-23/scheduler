import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData(props) {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {
			1: {
				id: 1,
				time: '12pm',
				interview: null,
			},
		},
		interviewers: {},
	});

	//bookOrCancel is a boolean that handles incrementing or decrementing spots
	//look for a day in the days array in state that matches the current day in state
	//return new array as days, either with updated spots count or without
	const updateSpots = (bookOrCancel, edit) => {
		const days = state.days.map((day) => {
			if (day.name === state.day) {
				if (bookOrCancel && !edit) {
					return { ...day, spots: day.spots - 1 };
				} else if (!bookOrCancel && !edit) {
					return { ...day, spots: day.spots + 1 };
				} else if (!bookOrCancel && edit) {
					return { ...day, spots: day.spots };
				}
			} else {
				return { ...day };
			}
		});
		return days;
	};

	const setDay = (day) => setState((prev) => ({ ...prev, day }));
	useEffect(() => {
		const dayURL = '/api/days';
		const appointmentURL = '/api/appointments';
		const interviewersURL = '/api/interviewers';
		Promise.all([
			axios.get(dayURL),
			axios.get(appointmentURL),
			axios.get(interviewersURL),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	//update api to add new interview booking and then update state with new booking
	//days array updated with new spots value
	function bookInterview(id, interview, edit) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		let days = [];
		if (edit) {
			days = updateSpots(false, true);
		} else {
			days = updateSpots(true, false);
		}
		return axios
			.put(`/api/appointments/${id}`, { interview: interview })
			.then(() => {
				setState({ ...state, appointments, days });
			});
	}

	//delete an interview from api and update state
	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const days = updateSpots(false);

		return axios.delete(`/api/appointments/${id}`).then(() => {
			setState({ ...state, appointments, days });
		});
	}
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
