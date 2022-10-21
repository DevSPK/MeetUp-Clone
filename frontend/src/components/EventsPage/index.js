import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkReadAllEvents } from "../../store/events";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "../EventsPage/EventsPage.css";

const EventsPage = () => {
  const dispatch = useDispatch();

  const eventsList = useSelector((state) => Object.values(state.events));

  useEffect(() => {
    dispatch(thunkReadAllEvents());
  }, [dispatch]);

  console.log("this is events list in eventsPage", eventsList);

  const optionsDate = {
    weekday: "short",
    month: "short",
    day: "numeric"
  };

  const optionsTime = {
    timeZoneName: "short",
    hour: "numeric",
    minute: "2-digit"
  };

  if (!eventsList) {
    return null;
  }

  return (
    <div className='events-page-container'>
      <div className='events-page-header-container'>
        <div className='header-events-link-container  header-links'>
          <div className='header--container__links header-links'>
            <NavLink
              to='/events'
              className='header-selected-link'>
              Events
            </NavLink>
          </div>
          <div className='header-events-link-container  header-links'>
            <NavLink
              to='/groups'
              className='header-groups-link'>
              Groups
            </NavLink>
          </div>
        </div>
      </div>
      <div className='grid--column__middle'>
        {eventsList.map((event) => (
          <div
            style={{ textDecoration: "none" }}
            key={event.id}
            to={`/events/${event.id}`}
            className='grid-card--container top'>
            <Link to={`/events/${event.id}`}>
              <div className='grid-card--text__container--events'>
                <img
                  className='grid-card--image__preview'
                  src={event.previewImage}
                  alt='a depiction of this event'
                />
                <div
                  style={{ textDecoration: "none" }}
                  className='grid-card--text__start-time  uppercase'>
                  {new Date(event.startDate).toLocaleDateString(
                    "en-US",
                    optionsDate
                  )}{" "}
                  ·{" "}
                  {new Date(event.startDate).toLocaleTimeString(
                    "en-US",
                    optionsTime
                  )}
                </div>
                <div
                  className='grid-card--text__event-name'
                  style={{ textDecoration: "none" }}>
                  {event.name}
                </div>
                <div
                  style={{ textDecoration: "none" }}
                  className='grid-card--text__group-name'>
                  {event.Group.name} · {event.Group.city}, {event.Group.state}
                </div>
                <div
                  className='grid-card--text__members'
                  style={{ textDecoration: "none" }}>
                  {`${event.numAttending} attendee(s)`}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
