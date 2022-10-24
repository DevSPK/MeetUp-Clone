import { useParams, useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import { thunkGetOneEvent, thunkRemoveEvent } from "../../store/events";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SingleEvent.css";
//import EventUpdate from "../EventUpdate";

export const SingleEvent = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  let eventImg = null;

  const optionsDate = {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric"
  };

  const optionsTime = {
    timeZoneName: "short",
    hour: "numeric",
    minute: "2-digit"
  };
  // const [showEditEventForm, setShowEditEventForm] =
  // 	useState(false);

  // // console.log("this is id", id);

  // // console.log("this is singleEvent EventsList", EventsList);
  useEffect(() => {
    dispatch(thunkGetOneEvent(id));
  }, [dispatch, id]);

  let event = useSelector((state) => state.events[id]);

  if (!event) return null;

  // console.log({ event });

  if (!event.previewImage) {
    const { EventImages } = event;

    eventImg = EventImages.find(({ preview }) => preview === true);
  } else if (event.previewImage) {
    eventImg = event.previewImage;
  }

  //const EventChoice = EventList.find(({id}) => id === EventId)

  // // console.log("this is Event from singleEvent", Event);

  async function handleDelete(eventId, groupId) {
    await dispatch(thunkRemoveEvent(eventId, groupId));
    history.push("/events");
  }

  // console.log("this is Event from singleEvent", event);

  // if (showEditEventForm) {
  // 	content = (
  // 		<EventUpdate
  // 			event={event}
  // 			hideForm={() => setShowEditEventForm(false)}
  // 		/>
  // 	);
  // }

  if (!event || !eventImg.url) {
    return null;
  }

  let spotsLeft = event.capacity - event.numAttending;

  return (
    <div className='group-page__container event'>
      <div className='group--content__border'>
        <div className='group--content__container'>
          <div className='group--image__container'>
            <img
              className='group--info--image'
              src={eventImg.url}
              alt='a depiction of this group'
            />
          </div>
          <div className='group--details__container event'>
            <span className='group--details--text__name'>{event.name}</span>
            <span className='group--details--text__city-state'>
              <span className='icon--location-dot'>
                <i className='fa-solid fa-location-dot'></i>
              </span>
              {`${event.Group.city}, ${event.Group.state}`}
            </span>
            <h3>
              {event.Group.name} {" · "}
              {event.Group.private && "Private group"}
              {!event.Group.private && "Public group"}
            </h3>
            <span
              className='group--details--text__members-type'
              style={{ textDecoration: "none" }}>
              {" "}
              <span className='icon--user-group'>
                <i className='fa-solid fa-user-group'></i>
              </span>
              {`${event.numAttending} attending · `}
              {event.type}
            </span>

            {/* <p>Capacity: {event.capacity}</p> */}
            <h3>
              {`$${event.price}`} {" · "} {spotsLeft} Spots left
            </h3>
            <div className='event--start--end__wrapper'>
              <div className='event-time-icon'>
                <i className='fa-solid fa-clock'></i>
              </div>
              <div className='event--start--end'>
                {new Date(event.startDate).toLocaleDateString(
                  "en-US",
                  optionsDate
                )}{" "}
                at{" "}
                {new Date(event.startDate).toLocaleTimeString(
                  "en-US",
                  optionsTime
                )}{" "}
                to{" "}
                {new Date(event.endDate).toLocaleDateString(
                  "en-US",
                  optionsDate
                )}{" "}
                at{" "}
                {new Date(event.endDate).toLocaleTimeString(
                  "en-US",
                  optionsTime
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='middle--flexbar__container'>
        <div className='group--aboutbar__container'>
          <div className='group--aboutbar__text'>About</div>
          <div className='group--aboutbar--buttons__container'>
            <div className='aboutbar--buttons'>
              <button
                className='form--button'
                onClick={() => handleDelete(event.id, event.groupId)}>
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='group--about__container'>
        <div className='group--about__details'>
          <h2 className='group--about__header'>Details</h2>
          <p className='group--about__text event'>{event.description}</p>
        </div>
      </div>
    </div>
  );
};
