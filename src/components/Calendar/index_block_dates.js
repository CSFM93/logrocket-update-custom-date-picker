import React, { Component, Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles";
import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS,
} from "../../helpers/calendar";

export default function Calendar({ date, onDateChanged, blockedDates }) {
  const [dateState, setDateState] = useState({
    current: new Date(),
    month: 0,
    year: 0,
  });

  const [today, setToday] = useState(new Date());
  useEffect(() => {
    addDateToState(date);
  }, []);

  const addDateToState = (date) => {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();
    setDateState({
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
    });
  };

  const getCalendarDates = () => {
    const { current, month, year } = dateState;
    console.log(typeof current);
    console.log(current);
    const calendarMonth = month || +current?.getMonth() + 1;
    const calendarYear = year || current?.getFullYear();
    return calendar(calendarMonth, calendarYear);
  };


  const renderMonthAndYear = () => {
    const { month, year } = dateState;
    const formatter = new Intl.DateTimeFormat('zh-CN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const formattedDate = formatter.format(dateState.current);
    console.log('formatted date', formattedDate)
    // Resolve the month name from the CALENDAR_MONTHS object map
    const monthname =
      Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];
    return (
      <Styled.CalendarHeader>
        <Styled.ArrowLeft
          onClick={handlePrevious}
          title="Previous Month"
        />
        <Styled.CalendarMonth>
          {monthname} {year}
          {/* {formattedDate} */}
        </Styled.CalendarMonth>
        <Styled.ArrowRight
          onClick={handleNext}
          title="Next Month"
        />
      </Styled.CalendarHeader>
    );
  };
  // Render the label for day of the week
  // This method is used as a map callback as seen in render()
  const renderDayLabel = (day, index) => {
    // Resolve the day of the week label from the WEEK_DAYS object map
    const daylabel = WEEK_DAYS[day].toUpperCase();
    return (
      <Styled.CalendarDay key={daylabel} index={index}>
        {daylabel}
      </Styled.CalendarDay>
    );
  };
  // Render a calendar date as returned from the calendar builder function

  const renderCalendarDate = (date, index) => {
    const { current, month, year } = dateState;
    const _date = new Date(date.join("-"));
    // Check if calendar date is same day as today
    const isToday = isSameDay(_date, today);
    // block date
    const isBlocked = blockedDates.some(blockedDate => isSameDay(_date, blockedDate));
    // Check if calendar date is same day as currently selected date
    const isCurrent = current && isSameDay(_date, current);
    // Check if calendar date is in the same month as the state month and year
    const inMonth =
      month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));

    // The click handler
    const onClick = isBlocked ? null : gotoDate(_date);
    const props = { index, inMonth, onClick, title: _date.toDateString() };
    // Conditionally render a styled date component
    const DateComponent = isCurrent
      ? Styled.HighlightedCalendarDate
      : isToday
        ? Styled.TodayCalendarDate
        : !isBlocked
          ? Styled.CalendarDate
          : Styled.BlockedCalendarDate;
    return (
      <DateComponent key={getDateISO(_date)} {...props}>
        {_date.getDate()}
        {/* {formattedDate} */}
      </DateComponent>
    );
  };



  const gotoDate = (date) => (evt) => {
    evt && evt.preventDefault();
    const { current } = dateState;
    if (!(current && isSameDay(date, current))) {
      addDateToState(date);
      onDateChanged(date);
    }
  };
  const gotoPreviousMonth = () => {
    const { month, year } = dateState;
    const previousMonth = getPreviousMonth(month, year);
    setDateState({
      month: previousMonth.month,
      year: previousMonth.year,
      current: dateState.current,
    });
  };
  const gotoNextMonth = () => {
    const { month, year } = dateState;
    const nextMonth = getNextMonth(month, year);
    setDateState({
      month: nextMonth.month,
      year: nextMonth.year,
      current: dateState.current,
    });
  };
  const handlePrevious = (evt) => {
    gotoPreviousMonth();
  };
  const handleNext = (evt) => {
    gotoNextMonth();
  };


  return (
    <Styled.CalendarContainer>
      {renderMonthAndYear()}
      <Styled.CalendarGrid>
        <Fragment>{Object.keys(WEEK_DAYS).map(renderDayLabel)}</Fragment>
        <Fragment>{getCalendarDates().map(renderCalendarDate)}</Fragment>
      </Styled.CalendarGrid>
    </Styled.CalendarContainer>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChanged: PropTypes.func,
  blockedDates: PropTypes.arrayOf(Date)
};