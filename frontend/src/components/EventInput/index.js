import { useState, useEffect } from "react";
import "./EventInput.css";
import { useDispatch } from "react-redux";
import {
	thunkAddEvent,
	thunkReadAllEvents
} from "../../store/events";
import { useHistory, Redirect } from "react-router-dom";

// const currencyFormat = new Intl.NumberFormat("en-US", {
// 	style: "currency",
// 	currency: "USD"
// });

const EventInput = ({ hideForm, group }) => {
	const { id } = group;

	// console.log("this is group in EventInput", group);
	const history = useHistory();

	const [venueId, setVenueId] = useState(1);
	const [name, setName] = useState("");
	const [capacity, setCapacity] = useState(10);
	const [type, setType] = useState("In person");
	const [price, setPrice] = useState(18.5);
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [errors, setErrors] = useState([]);
	const [imageUrl, setImageUrl] = useState("");

	const dispatch = useDispatch();

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
		endDate
	]);

	const handleSubmit = async (e) => {
		e.preventDefault();

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

		// 	const createdEvent = await dispatch(
		// 		thunkAddEvent(newEvent)
		// 	);

		// 	if (!createdEvent) return null;

		// 	if (createdEvent) {
		// 		reset();
		// 		history.push(`/events`);
		// 		hideForm();
		// 	}
		// };

		setErrors([]);

		return dispatch(thunkAddEvent(newEvent))
			.then((res) => {
				if (res.ok) {
					// console.log("this is res in thunkAddevent", res);
					reset();
					hideForm();
					history.push(`/events`);
				}
			})
			.catch(async (res) => {
				const data = await res.json();
				// console.log("this is data1 in thunkAddevent", data);
				if (data && data.errors) {
					// console.log(
					// 	"this is data3 in thunkAddevent",
					// 	data
					// );
					return setErrors(data.errors);
				}
			});
	};

	const reset = () => {
		setVenueId(1);
		setName("");
		setCapacity(10);
		setType("In person");
		setPrice(18.5);
		setDescription("");
		setStartDate("");
		setEndDate("");
		setImageUrl("");
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
		console.log("this is handle event cancel click");
		console.log("this is id", id);
		history.push(`/events`);
		// <Redirect to='/groups' />;
		// hideForm();
	};

	return (
		<div className='inputBox'>
			<h1>Create Event</h1>
			<form onSubmit={handleSubmit}>
				<ul className='login-errors-ul errors-ul'>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<input
					type='text'
					onChange={(e) => setName(e.target.value)}
					value={name}
					placeholder='Name'
					name='name'
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					name='description'
					placeholder='Describe your Event'
					rows='5'></textarea>
				<select
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
				<select
					name='type'
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
					<option value={null}>
						I'll setup a venue later
					</option>
				</select>

				<input
					type='text'
					onChange={handleCapacity}
					value={Number(capacity)}
					placeholder='Maximum number of attendees'
					name='Capacity'
				/>
				<input
					type='text'
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
				<input
					type='datetime-local'
					value={(startDate || "")
						.toString()
						.substring(0, 16)}
					onChange={handleStartDate}
					placeholder='Please enter the date and time your event starts'
					name='startDate'
				/>
				<input
					type='datetime-local'
					value={(endDate || "")
						.toString()
						.substring(0, 16)}
					onChange={handleEndDate}
					placeholder='Please enter the date and time your event ends'
					name='endDate'
				/>
				<input
					type='text'
					onChange={(e) => setImageUrl(e.target.value)}
					value={imageUrl}
					// defaultValue={"https://picsum.photos/225/125"}
					placeholder='Image Url'
					name='imageUrl'
				/>
				<button type='submit'>Submit</button>
				<button
					type='button'
					onClick={handleCancelClick}>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default EventInput;
