import React from "react";
import './styles.scss';
import Header from './Header';
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRMING";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

// save interview/appointment, transition component 
  function saveAppointment(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE));
  }

  // delete interview/appointment, transition component 
  function deleteAppointment() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          confirmDelete={() => { transition(CONFIRM); }}
          onEdit={() => { transition(EDITING); }}
        />
      )}
      {mode === CREATE && <Form onSave={saveAppointment} onCancel={back} interviewers={props.interviewers} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm onDelete={deleteAppointment} onCancel={() => back()} message="Are you sure you would like to delete?" />}
      {mode === EDITING && <Form onSave={saveAppointment} onCancel={back} interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} />}
      {mode === ERROR_SAVE && <Error message="There was an error saving your request." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="There was an error saving your request." onClose={back} />}

    </article>
  );

}