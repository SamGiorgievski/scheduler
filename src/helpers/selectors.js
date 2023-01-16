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


export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  } else {

    const interviewObject = {};
    interviewObject.student = interview.student;
    const interviewerId = interview.interviewer;
    interviewObject.interviewer = state.interviewers[interviewerId];

    return interviewObject;
  }

}


export function getInterviewersForDay(state, day) {
  const daysArray = state.days;
  let interviewersToday = [];
  const interviewerArray = [];


daysArray.forEach(dayObject => {
  if (dayObject.name === day) {
    interviewersToday = dayObject.interviewers;
  }
})

  interviewersToday.forEach((interviewerId) => {
    interviewerArray.push(state.interviewers[interviewerId]);
  })

  return interviewerArray;
}