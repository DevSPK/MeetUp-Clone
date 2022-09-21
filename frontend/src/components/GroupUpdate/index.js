import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./GroupUpdate.css";
import { useDispatch } from "react-redux";
import { thunkUpdateGroup } from "../../store/groups";

const GroupUpdate = ({ group, hideForm }) => {
	const history = useHistory();
	const [name, setName] = useState(group.name);
	const [about, setAbout] = useState(group.about);
	const [type, setType] = useState(group.type);
	const [privateVal, setPrivateVal] = useState(
		group.private
	);
	const [city, setCity] = useState(group.city);
	const [state, setState] = useState(group.state);

	console.log("this is group prop", group);
	console.log("this is privateVal", privateVal);
	console.log("this is group.privateVal", group.privateVal);

	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();

		let newInfo = {
			name,
			about,
			type,
			privateVal,
			city,
			state,
			id: group.id
		};

		console.log({ newInfo });

		// useEffect(() => {
		// 	dispatch(addGroup(updatedGroup));
		// }, [dispatch]);

		const updatedGroup = await dispatch(
			thunkUpdateGroup(newInfo)
		);

		if (updatedGroup) {
			history.push(`/groups/${updatedGroup.id}`);
			hideForm();
		}
		//reset();
	};

	const handleCancelClick = (e) => {
		e.preventDefault();
		hideForm();
	};

	return (
		<div className='inputBox'>
			<h1>Edit Group</h1>
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
