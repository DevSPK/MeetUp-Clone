import { useState } from "react";
import "./EventInput.css";
import { useDispatch } from "react-redux";
import { thunkAddEvent } from "../../store/events";
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

	const dispatch = useDispatch();

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
			endDate
		};

		// console.log({ newEvent });

		// useEffect(() => {
		// 	dispatch(addEvent(newEvent));
		// }, [dispatch]);

		const createdEvent = await dispatch(
			thunkAddEvent(newEvent)
		);

		if (!createdEvent) return null;

		if (createdEvent) {
			reset();
			history.push(`/events`);
			hideForm();
		}
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
		history.push(`/groups`);
		// <Redirect to='/groups' />;
		// hideForm();
	};

	return (
		<div className='inputBox'>
			<h1>Create Event</h1>
			<form onSubmit={handleSubmit}>
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
