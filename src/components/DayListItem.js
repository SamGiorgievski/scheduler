import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {

  const FormatSpots = () => {
    return(
      <div>
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      </div>
    );
  };

  const dayListClass = classNames(
    'day-list',
    'day-list__item',
    {'day-list__item--selected': props.selected},
    {'day-list__item--full': !props.spots}
  );

  return (
    <li className = {dayListClass} 
    onClick={() => {props.setDay(props.name)}}>
      <h2 className="text--regular">{props.name}</h2> 
      <FormatSpots/>
    </li>
  );
}