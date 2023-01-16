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


// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }