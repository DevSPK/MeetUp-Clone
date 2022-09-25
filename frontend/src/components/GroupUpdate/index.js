import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

import "./GroupUpdate.css";
import { useDispatch } from "react-redux";
import {
	thunkReadAllGroups,
	thunkUpdateGroup
} from "../../store/groups";

const GroupUpdate = ({ group, hideForm }) => {
	let editedGroup = group;
	const history = useHistory();
	const [name, setName] = useState(editedGroup.name);
	const [about, setAbout] = useState(editedGroup.about);
	const [type, setType] = useState(editedGroup.type);
	const [privateVal, setPrivateVal] = useState(
		editedGroup.private
	);
	const [city, setCity] = useState(editedGroup.city);
	const [state, setState] = useState(editedGroup.state);
	const [errors, setErrors] = useState([]);
	// const [previewImage, setPreviewImage] = useState(editedGroup.previewImage)
	const dispatch = useDispatch();

	// // console.log("this is editedGroup prop", editedGroup);
	// // console.log("this is privateVal", privateVal);
	// // console.log(
	// 	"this is editedGroup.privateVal",
	// 	editedGroup.privateVal
	// );

	useEffect(() => {
		dispatch(thunkReadAllGroups());
	}, [
		dispatch,
		name,
		about,
		type,
		privateVal,
		city,
		state,
		errors
	]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let newInfo = {
			name,
			about,
			type,
			privateVal,
			city,
			state,
			id: editedGroup.id
		};

		setErrors([]);

		// console.log({ newInfo });

		return dispatch(thunkUpdateGroup(newInfo))
			.then((res) => {
				console.log(
					"***********************this is res from thunkUpdateGroup",
					res
				);
				if (res) {
					handleUpdate(res);
					console.log("inside the if.......");
					// hideForm();
					// return <Redirect to='/groups/' />;
					// history.push("/");
				}
			})
			.catch(async (res) => {
				const data = await res.json();
				// console.log("this is data1", data);
				if (data && data.errors) {
					// console.log("this is data3", data);
					return setErrors(data.errors);
				}
			});

		// const updatedGroup = dispatch(
		// 	thunkUpdateGroup(newInfo)
		// );

		// // console.log(
		// 	"this is updatedGroup from thunkUpdateGroup",
		// 	updatedGroup
		// );

		// if (updatedGroup) {
		// 	history.push(`/groups/${updatedGroup.id}`);
		// 	hideForm();
		// }
		//reset();
	};

	function handleUpdate(res) {
		console.log("inside handle update$$$$$$$$$$$$$");
		// hideForm();
		// return <Redirect to='/' />;
		history.push(`/groups`);
	}

	const handleCancelClick = (e) => {
		e.preventDefault();
		setErrors([]);
		hideForm();
	};

	return (
		<div className='inputBox'>
			<h1>Edit Group</h1>
			<form onSubmit={handleSubmit}>
				<ul className='editInput-errors-ul errors-ul'>
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
					value={about}
					onChange={(e) => setAbout(e.target.value)}
					name='about'
					placeholder='About your group'
					rows='10'></textarea>
				<select
					name='type'
					onChange={(e) => {
						setType(e.target.value);
					}}>
					<option
						value=''
						disabled>
						Select a group type
					</option>
					<option value='In person'>In Person</option>
					<option value='Online'>Online</option>
				</select>
				<select
					name='type'
					onChange={(e) => {
						setPrivateVal(e.target.value);
					}}>
					<option
						value=''
						disabled>
						Private Group?
					</option>
					<option value={true}>Yes</option>
					<option value={false}>No</option>
				</select>
				<input
					type='text'
					onChange={(e) => setCity(e.target.value)}
					value={city}
					placeholder='City'
					name='city'
				/>
				<input
					type='text'
					onChange={(e) => setState(e.target.value)}
					value={state}
					placeholder='State'
					name='state'
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

export default GroupUpdate;
