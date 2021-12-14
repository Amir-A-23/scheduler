import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/Appointment';
import 'components/Application.scss';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from 'helpers/selectors';

export default function Application(props) {
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
	console.log('THIS IS THE STATE', state);
	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);
	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
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

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{schedule}
				<Appointment
					key='last'
					time='5pm'
					bookInterview={bookInterview}
					cancelInterview={cancelInterview}
				/>
			</section>
		</main>
	);
}
