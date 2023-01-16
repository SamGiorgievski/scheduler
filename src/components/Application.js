import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  function renderAppointments () {
    const appointmentData = dailyAppointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
      return(
  
      <Appointment 
        key={appointment.id} 
        {...appointment}
        interview={interview}
        interviewers={interviewersToday}
        bookInterview={bookInterview}
      />
      )
    }) 
    return appointmentData;
  }

  function bookInterview(id, interview) {

  console.log("book interview start");

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then((response) => {
      setState({
        ...state,
        appointments
      });
      console.log("set state");
    })
    
  }



  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  const interviewersToday = getInterviewersForDay(state, state.day);



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {renderAppointments()}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
