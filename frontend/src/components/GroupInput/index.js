import { useState, useEffect } from "react";

import "./GroupInput.css";
import { useDispatch } from "react-redux";
import { thunkAddGroup } from "../../store/groups";
import { useHistory, Redirect } from "react-router-dom";

const GroupInput = ({ hideForm }) => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [type, setType] = useState("In person");
	const [privateVal, setPrivateVal] = useState(true);
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();

	// useEffect(
	// 	({ hideForm }) => {
	// 		if (!errors) {
	// 			reset();
	// 			hideForm();
	// 			return <Redirect to='/groups/' />;
	// 		}
	// 	},
	// 	[dispatch]
	// );

	const handleSubmit = async (e) => {
		e.preventDefault();

		// console.log("Create Group ran in GroupInput");

		let newGroup = {
			name,
			about,
			type,
			privateVal,
			city,
			state,
			imageUrl
		};

		setErrors([]);

		// have to wait for response from promise, check if it is okay, otherwise will process error

		return dispatch(thunkAddGroup(newGroup))
			.then((res) => {
				if (res.ok) {
					// console.log("this is res in thunkAddGroup", res);
					reset();
					hideForm();
					return <Redirect to='/groups/' />;
				}
			})
			.catch(async (res) => {
				const data = await res.json();
				// console.log("this is data1 in thunkAddGroup", data);
				if (data && data.errors) {
					// console.log(
					// 	"this is data3 in thunkAddGroup",
					// 	data
					// );
					return setErrors(data.errors);
				}
			});

		// let createdGroup

		// try {
		// 	createdGroup = await dispatch(thunkAddGroup(newGroup))
		// } catch()

		// // console.log({ newGroup });

		// // useEffect(() => {
		// // 	dispatch(addGroup(newGroup));
		// // }, [dispatch]);

		// // const createdGroup = dispatch(
		// // 	thunkAddGroup(newGroup)
		// // );

		// if (!createdGroup) return null;

		// if (createdGroup && errors.length === 0) {
		// 	reset();
		// 	hideForm();
		// 	return <Redirect to='/groups/' />;
		// }
	};

	const reset = () => {
		setName("");
		setAbout("");
		setType("In person");
		setPrivateVal(true);
		setCity("");
		setState("");
		setImageUrl("");
	};

	const handleCancelClick = (e) => {
		e.preventDefault();
		setErrors([]);
		reset();
		hideForm();
	};

	return (
		<div className='inputBox'>
			<h1>Create Group</h1>
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

export default GroupInput;
