import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData(props) {
	const [state, setState] = useState({
		day: '',
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

	async function bookInterview(id, interview) {
		//console.log(id, interview);
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		//setState({ ...state, appointments });
		try {
			await axios.put(`/api/appointments/${id}`, { interview: interview });
			return setState({ ...state, appointments });
		} catch (err) {
			console.log('Axios Put error', err);
		}
	}

	async function cancelInterview(id) {
		const appointments = { ...state.appointments };

		try {
			await axios.delete(`/api/appointments/${id}`);
			return (appointments[id].interview = null);
		} catch (err) {
			console.log('Error Deleting Appointment', err);
		}
	}
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
