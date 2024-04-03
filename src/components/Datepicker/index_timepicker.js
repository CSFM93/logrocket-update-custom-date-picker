
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "../Calendar/index";
import * as Styled from "./styles";
import { isDate, getDateISO } from "../../helpers/calendar";

import TimePicker from "../Timepicker";

export default function Datepicker(props) {
  const [dateState, setDateState] = useState();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { label } = props;


  const [timeState, setTimeState] = useState({
    hour: 12,
    minutes: 0,
    period: 'AM',
  });

  const handleTimeChange = (time) => {
    const newTime = time ? time : null;
    if (newTime !== null && JSON.stringify(timeState) !== JSON.stringify(newTime)) {
      setTimeState(newTime)
    }
  };


  const formatTime = (time) => {
    const hour = time.hour < 10 ? '0' + time.hour : time.hour
    const minutes = time.minutes < 10 ? '0' + time.minutes : time.minutes

    const formattedTime = hour + ' : ' + minutes + ' ' + time.period
    return formattedTime
  }

  const toggleCalendar = () => setCalendarOpen(!calendarOpen);
  const handleChange = (evt) => evt.preventDefault();
  const handleDateChange = (date) => {
    const newDate = date ? getDateISO(date) : null;
    dateState !== newDate && setDateState(newDate)
  };

  useEffect(() => {
    const newDate = new Date();
    console.log('new date', newDate)
    setDateState(getDateISO(newDate));
  }, []);

  const closeCalendar = () => {
    setCalendarOpen(false)
  }



  return (
    <Styled.DatePickerContainer >
      <Styled.DatePickerFormGroup>
        <Styled.DatePickerLabel>{label || "Enter Date"}</Styled.DatePickerLabel>
        <Styled.DatePickerInput
          type="text"
          value={dateState ? dateState.split("-").join(" / ") : ""}
          onChange={handleChange}
          readOnly="readonly"
          placeholder="YYYY / MM / DD"
        />
        <Styled.DatePickerInput
          type="text"
          value={timeState ? formatTime(timeState) : ""}
          onChange={handleChange}
          readOnly="readonly"
          placeholder="12 : 00 AM"
        />
      </Styled.DatePickerFormGroup>
      <Styled.DatePickerDropdown isOpen={calendarOpen} toggle={toggleCalendar}>
        <Styled.DatePickerDropdownToggle color="transparent" />
        <Styled.DatePickerDropdownMenu>
          {calendarOpen && (
            <div >
              <div className="row">
                <div className="col-9">
                  <Calendar
                    date={dateState && new Date(dateState)}
                    onDateChanged={handleDateChange}
                  />
                </div>
                <div className="col-3  pe-4">
                  <TimePicker handleTimeChange={handleTimeChange} className="border border-primary" />
                </div>
              </div>
              <Styled.DatePickerButton onClick={closeCalendar}>Save</Styled.DatePickerButton>
            </div>
          )}
        </Styled.DatePickerDropdownMenu>
      </Styled.DatePickerDropdown>
    </Styled.DatePickerContainer>
  );
}

Datepicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onDateChanged: PropTypes.func,
};