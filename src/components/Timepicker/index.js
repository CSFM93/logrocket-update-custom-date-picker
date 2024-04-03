
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import * as Styled from "./styles";
const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const dayPeriods = ["AM", "PM"];

export default function TimePicker({ handleTimeChange }) {
  const [timeState, setTimeState] = useState({
    hour: 12,
    minutes: 0,
    period: 'AM',
  });

  const handleHourChange = (event, hour) => {
    console.log('hour change', hour)
    const newState = {
      hour: hour,
      minutes: timeState.minutes,
      period: timeState.period,
    }
    setTimeState(newState)
    setTimeout(() => {
      handleTimeChange(newState)
    }, 100);
  }

  const handleMinutesChange = (event, minutes) => {
    console.log('minutes change', minutes)
    const newState = {
      hour: timeState.hour,
      minutes: minutes,
      period: timeState.period,
    }
    setTimeState(newState)
    handleTimeChange(newState)
  }

  const handlePeriodChange = (event, period) => {
    console.log('minutes change', period)
    const newState = {
      hour: timeState.hour,
      minutes: timeState.minutes,
      period: period,
    }
    setTimeState(newState)
    handleTimeChange(newState)
  }

  return (
    <div className="d-flex flex-row">
      <Styled.TimePickerListContainer className="border-end border-primary ">
        <ListGroup className="" >
          {hours.map((hour, index) => (
            <ListGroupItem key={index} tag="button" action className="border-0" onClick={(event) => handleHourChange(event, hour)}>{hour}</ListGroupItem>
          ))}
        </ListGroup>
      </Styled.TimePickerListContainer>
      <Styled.TimePickerListContainer className="border-end border-primary">
        <ListGroup className="" >
          {minutes.map((minute, index) => (
            <ListGroupItem key={index} tag="button" action className="border-0" onClick={(event) => handleMinutesChange(event, minute)}>{minute}</ListGroupItem>
          ))}
        </ListGroup>
      </Styled.TimePickerListContainer>
      <Styled.TimePickerListContainer className="">
        <ListGroup className="" >
          {dayPeriods.map((period, index) => (
            <ListGroupItem key={index} tag="button" action className="border-0 pe-4" onClick={(event) => handlePeriodChange(event, period)}>{period}</ListGroupItem>
          ))}
        </ListGroup>
      </Styled.TimePickerListContainer>
    </div >
  )
}

TimePicker.propTypes = {
  handleTimeChange: PropTypes.func,
};