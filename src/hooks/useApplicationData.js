import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

 const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviwers: {}
});

const setDay = (day) => setState({ ...state, day });

const setSpots = (day, num) => {
  let dayName = day;
  let daysArray = [...state.days];

  for (let i = 0; i < daysArray.length; i++) {
    if (daysArray[i].name === dayName) {
      daysArray[i].spots += num;
    }
  }

  return daysArray;
}


const updatedDays = (appointments, appointmentId) => {
  const apptDay = state.days.find((day) =>
    day.appointments.includes(appointmentId)
  );

  const spots = apptDay.appointments.filter(
    (id) => appointments[id].interview === null
  ).length;

  return state.days.map((x) =>
    x.appointments.includes(appointmentId) ? { ...x, spots } : x
  );
};

function cancelInterview (id) {

  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios
  .delete(`/api/appointments/${id}`, {
  })
  .then((response) => {
    setState({
      ...state,
      appointments,
      days: updatedDays(appointments, id)
    });

    
  })

}

function bookInterview(id, interview) {

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
        appointments,
        days: updatedDays(appointments, id)
      });
      
    })
    
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      // console.log(`all: ${all}`);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    });
  }, [])

  return {state, setDay, bookInterview, cancelInterview}
}