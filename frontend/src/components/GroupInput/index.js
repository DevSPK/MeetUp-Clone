import { useState } from "react";

import "./GroupInput.css";
import { useDispatch } from "react-redux";
import { thunkAddGroup } from "../../store/groups";
import { useHistory } from "react-router-dom";

const GroupInput = ({ hideForm }) => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [type, setType] = useState("In person");
	const [privateVal, setPrivateVal] = useState(true);
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		let newGroup = {
			name,
			about,
			type,
			privateVal,
			city,
			state,
			imageUrl
		};

		console.log({ newGroup });

		// useEffect(() => {
		// 	dispatch(addGroup(newGroup));
		// }, [dispatch]);

		const createdGroup = await dispatch(
			thunkAddGroup(newGroup)
		);

		if (createdGroup) {
			reset();
			history.push(`/groups/${createdGroup.id}`);
			hideForm();
		}
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
		hideForm();
	};

	return (
		<div className='inputBox'>
			<h1>Create Group</h1>
			<form onSubmit={handleSubmit}>
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
