export function getAppointmentsForDay(state, day) {
  const daysArray = state.days;
  let appointmentsToday = [];
  const appointmentArray = [];
  

daysArray.forEach(dayObject => {
  if (dayObject.name === day) {
    appointmentsToday = dayObject.appointments;
  }
})

  appointmentsToday.forEach((appId) => {
    appointmentArray.push(state.appointments[appId]);
  })

  return appointmentArray;
}