
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "../Calendar/index";
import * as Styled from "./styles";
import { isDate, getDateISO } from "../../helpers/calendar";

export default function Datepicker(props) {
  const [dateState, setDateState] = useState();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { label } = props;

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
      </Styled.DatePickerFormGroup>
      <Styled.DatePickerDropdown isOpen={calendarOpen} toggle={toggleCalendar}>
        <Styled.DatePickerDropdownToggle color="transparent" />
        <Styled.DatePickerDropdownMenu>
          {calendarOpen && (
            <div>
              <Calendar
                date={dateState && new Date(dateState)}
                onDateChanged={handleDateChange}
              />
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