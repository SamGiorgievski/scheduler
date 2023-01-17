import React from "react";
import './styles.scss';
import Header from './Header';
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRMING = " CONFIRMING";
  const EDITING = "EDITING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=> {
      console.log("before transition:show")
      transition(SHOW, true);
    })
    
  }

  function onDelete() {
    transition(SAVING)

    props.cancelInterview(props.id)
    .then(()=> {
      transition(EMPTY, true)
    })
  }

  console.log(props)


return (
<article className="appointment">
  <Header time = {props.time}/>
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      confirmDelete={() => {transition(CONFIRMING)}}
      onEdit={()=> {transition(EDITING);}}
    />
  )}
  {mode === CREATE && <Form onSave = {save} onCancel = {back} interviewers={props.interviewers} />}
  {mode === SAVING && <Status message = "Saving.." />}
  {mode === CONFIRMING && <Confirm onDelete={onDelete} onCancel={() => back()} message = "Are you sure you would like to delete?"/>}
  {mode === EDITING && <Form onSave = {save} onCancel = {back} interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} />}

  {/* student = {} interviewer = {} */}

</article>
);

}