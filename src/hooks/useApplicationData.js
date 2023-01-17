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
      appointments
    });
  })

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
    })
    
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  return {state, setDay, bookInterview, cancelInterview}
}