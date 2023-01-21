import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {}
  });

  // Load days, appointments, interviewers into state from scheduler-api database
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // Set day to current day
  const setDay = (day) => setState(prev => ({ ...prev, day }));

  // Update spots in the daylist
  const updateSpots = (appointments, appointmentId) => {
    const apptDay = state.days.find((day) =>
      day.appointments.includes(appointmentId)
    );
    const spots = apptDay.appointments.filter(
      (id) => appointments[id].interview === null
    ).length;
    return state.days.map((day) =>
      day.appointments.includes(appointmentId) ? { ...day, spots } : day
    );
  };

  // cancel interview/appointment, update database, and set state
  function cancelInterview(id) {
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
        setState(prev => ({
          ...prev,
          appointments,
          days: updateSpots(appointments, id)
        }));
      });
  }

  // create/book interview, update database, and set state
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
        setState(prev => ({
          ...prev,
          appointments,
          days: updateSpots(appointments, id)
        }));
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
}