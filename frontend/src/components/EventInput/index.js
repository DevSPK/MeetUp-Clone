import { useState, useEffect } from "react";
import "./EventInput.css";
import { useDispatch } from "react-redux";
import { thunkAddEvent, thunkReadAllEvents } from "../../store/events";
import { useHistory, useParams } from "react-router-dom";

// const currencyFormat = new Intl.NumberFormat("en-US", {
// 	style: "currency",
// 	currency: "USD"
// });

const EventInput = () => {
  const { id } = useParams();

  // console.log("this is id from eventInput useParams", id);

  const history = useHistory();

  const [venueId, setVenueId] = useState(1);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState();
  const [type, setType] = useState("In person");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [errors, setErrors] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  //custom validation errors

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const customErrors = [];

    if (name.length < 5)
      customErrors.push("Name must be at least 5 characters");
    if (!description.length) customErrors.push("Description is required");
    if (!startDate.length) customErrors.push("Start date and time is required");
    if (!endDate.length) customErrors.push("End date and time is required");
    if (new Date(startDate) > new Date(endDate))
      customErrors.push("Start time must be before end time");
    if (!imageUrl.length) customErrors.push("Please provide a valid image URL");
    setValidationErrors(customErrors);
  }, [name, description, startDate, endDate, imageUrl]);

  let createdEvent = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    // if (validationErrors.length) {
    //   alert("Cannot Submit, please fix errors");
    // }

    // let compareStart = new Date(startDate);
    // let compareEnd = new Date(endDate);
    // console.log(
    //   "this is startDate lt endDate",
    //   new Date(startDate) < new Date(endDate)
    // );

    let newEvent = {
      venueId,
      groupId: id,
      name,
      capacity,
      type,
      price,
      description,
      startDate,
      endDate,
      imageUrl
    };

    // console.log({ newEvent });

    // useEffect(() => {
    // 	dispatch(addEvent(newEvent));
    // }, [dispatch]);

    // ######## Example of create feature using async await

    if (validationErrors.length !== 0) {
      return setValidationErrors(validationErrors);
    } else {
      createdEvent = await dispatch(thunkAddEvent(newEvent));
      // console.log("this is createdEvent", createdEvent);

      if (!createdEvent) return null;
      if (createdEvent && validationErrors.length !== 0) {
        return setValidationErrors(validationErrors);
      } else if (createdEvent && validationErrors.length === 0) {
        reset();
        dispatch(thunkReadAllEvents());
        // console.log("this is ve", validationErrors);
        history.push(`/events`);
      }
    }
  };

  // return dispatch(thunkAddEvent(newEvent))
  //   .then((res) => {
  //     if (res.ok) {
  //       console.log(
  //         "this is res from thunkAddEvent***********************",
  //         res
  //       );
  //       reset();
  //       history.push("/events");
  //     }
  //   })
  // .catch(async (res) => {
  //   const data = await res.json();
  //   if (data && data.errors) {
  //     return setErrors(data.errors);
  //   }
  // });

  // setErrors([]);

  // return dispatch(thunkAddEvent(newEvent))
  //   .then((res) => {
  //     if (res.ok) {
  //       console.log("this is res in thunkAddevent", res);
  //       reset();
  //       // hideForm();
  //       history.push(`/events`);
  //     }
  //   })
  //   .catch(async (res) => {
  //     const data = await res.json();
  //     // console.log("this is data1 in thunkAddevent", data);
  //     if (data && data.errors) {
  //       // console.log(
  //       // 	"this is data3 in thunkAddevent",
  //       // 	data
  //       // );
  //       return console.log("Cannot Submit, please fix errors");
  //     }
  //   });
  const reset = () => {
    setVenueId(1);
    setName("");
    setCapacity();
    setType("In person");
    setPrice();
    setDescription("");
    setStartDate("");
    setEndDate("");
    setImageUrl("");
    setValidationErrors([]);
    setHasSubmitted(false);
    // setErrors([]);
  };

  const handleCapacity = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setCapacity(result);
  };

  // const handlePrice = (event) => {
  // 	const { key } = event;

  // 	setPrice((prevPrice) =>
  // 		key !== "Backspace"
  // 			? !Number.isNaN(parseInt(key)) ||
  // 			  key === "," ||
  // 			  key === "."
  // 				? prevPrice + key
  // 				: prevPrice
  // 			: prevPrice.substring(0, prevPrice.length - 1)
  // 	);
  // };

  const handleStartDate = (event) => {
    if (!event.target["validity"].valid) return;
    const start = event.target.value;
    setStartDate(start);
  };

  const handleEndDate = (event) => {
    if (!event.target["validity"].valid) return;
    const end = event.target.value;
    setEndDate(end);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // console.log("this is handle event cancel click");
    // console.log("this is id", id);
    history.push(`/events`);
    // <Redirect to='/groups' />;
    // hideForm();
  };

  useEffect(() => {
    dispatch(thunkReadAllEvents());
  }, [
    dispatch,
    venueId,
    id,
    name,
    capacity,
    type,
    price,
    description,
    startDate,
    endDate,
    imageUrl
  ]);

  return (
    <div className='event--form--container event--form__shared'>
      <h1 className='event--form--title'>Create your event</h1>
      <form
        className='event--form__shared event--form'
        onSubmit={handleSubmit}>
        <label
          htmlFor='name'
          className='event--form--labels'>
          Name
        </label>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Name'
          name='name'
          className='form--input event--form__shared'
        />
        <label
          htmlFor='description'
          className='event--form--labels'>
          Event description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name='description'
          placeholder='Describe your Event'
          rows='5'
          className='form--textarea  event--form__shared'></textarea>
        <label
          htmlFor='type'
          className='event--form--labels'>
          Event type
        </label>
        <select
          className='form--select  event--form__shared'
          name='type'
          onChange={(e) => {
            setType(e.target.value);
          }}>
          <option
            value=''
            disabled>
            Select an Event type
          </option>
          <option value='In person'>In Person</option>
          <option value='Online'>Online</option>
        </select>
        <label
          htmlFor='venue'
          className='event--form--labels'>
          Select a Venue
        </label>
        <select
          className='form--select  event--form__shared'
          name='venue'
          onChange={(e) => {
            setVenueId(e.target.value);
          }}>
          <option
            value=''
            disabled>
            Where will your event take place?
          </option>
          <option value={1}>Grand Hotel</option>
          <option value={2}>Grand Theater</option>
          <option value={3}>Grand Arena</option>
          <option value={null}>I'll setup a venue later</option>
        </select>
        <label
          htmlFor='capacity'
          className='event--form--labels'>
          How many people can attend?
        </label>
        <input
          className='form--input  event--form__shared'
          type='number'
          required
          min='1'
          step='1'
          onChange={handleCapacity}
          value={Number(capacity)}
          placeholder='Maximum number of attendees'
          name='capacity'
        />
        <label
          htmlFor='price'
          className='event--form--labels'>
          Price
        </label>
        <input
          className='form--input  event--form__shared'
          type='number'
          min='0'
          step='0.01'
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder='$'
          value={
            Number(price)
            // !== "" ? currencyFormat.format(price) : ""
          }
          name='price'
        />
        <label
          htmlFor='startDate'
          className='event--form--labels'>
          Start date and time
        </label>
        <input
          className='form--input  event--form__shared'
          type='datetime-local'
          value={(startDate || "").toString().substring(0, 16)}
          onChange={handleStartDate}
          placeholder='Please enter the date and time your event starts'
          name='startDate'
        />
        <label
          htmlFor='endDate'
          className='event--form--labels'>
          End date and time
        </label>
        <input
          className='form--input  event--form__shared'
          type='datetime-local'
          value={(endDate || "").toString().substring(0, 16)}
          onChange={handleEndDate}
          placeholder='Please enter the date and time your event ends'
          name='endDate'
        />
        <label
          htmlFor='imageUrl'
          className='event--form--labels'>
          Image URL
        </label>
        <input
          type='text'
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          // defaultValue={"https://picsum.photos/225/125"}
          placeholder='Image Url'
          name='imageUrl'
          className='form--input  event--form__shared'
          required
        />
        <div className='error--item  errors  event--form__shared  errors--container '>
          <ul className='event--form__shared   errors'>
            {/* {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} */}
            {hasSubmitted && validationErrors.length > 0 && (
              <div>
                <ul>
                  {validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </ul>
        </div>
        <div className='form--button--container'>
          <button
            type='submit'
            className='form--button  event--form__shared'>
            Submit
          </button>
          <button
            type='button'
            onClick={handleCancelClick}
            className='form--button  event--form__shared'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventInput;
