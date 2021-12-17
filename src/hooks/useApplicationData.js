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
	const updateSpots = (bookOrCancel) => {
		const days = state.days.map((day) => {
			if (day.name === state.day) {
				if (bookOrCancel) {
					return { ...day, spots: day.spots - 1 };
				} else {
					return { ...day, spots: day.spots + 1 };
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
			console.log(all[0]); // first
			console.log(all[1]); // second
			console.log(all[2]); // third

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
	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const days = updateSpots(true);

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

		return axios
			.delete(`/api/appointments/${id}`)
			.then(() => {
				setState({ ...state, appointments, days });
			})
			.catch((err) => {
				console.log('Error Deleting Appointment', err);
			});
	}
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
