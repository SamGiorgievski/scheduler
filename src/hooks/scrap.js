//  const updatedDays = (appointments, appointmentId) => {
//   const apptDay = state.days.find((day) =>
//     day.appointments.includes(appointmentId)
//   );

//   const spots = apptDay.appointments.filter(
//     (id) => appointments[id].interview === null
//   ).length;

//   return state.days.map((x) =>
//     x.appointments.includes(appointmentId) ? { ...x, spots } : x
//   );
// };


// const spotUpdate = (weekday, day, variable) => {
//   let spot = day.spots;
//   if (weekday === 
// day.name
// && variable === "REMOVE_SPOT") {
//     return spot - 1;
//   } else if (weekday === 
// day.name
// && variable === "ADD_SPOT") {
//     return spot + 1;
//   } else {
//     return spot;
//   }
// };

// const updateSpots = (weekday, days, variable) => {
//   if (variable === "REMOVE_SPOT") {
//     const updatedStateDayArray = 
// days.map
// (day => {
//       return {
//         ...day,
//         spots: spotUpdate(weekday, day, variable)
//       };
//     });
//     return updatedStateDayArray;
//   }
//   if (variable === "ADD_SPOT") {
//     const updatedStateDayArray = 
// days.map
// (day => {
//       return {
//         ...day,
//         spots: spotUpdate(weekday, day, variable)
//       };
//     });
//     return updatedStateDayArray;
//   }
// }; 