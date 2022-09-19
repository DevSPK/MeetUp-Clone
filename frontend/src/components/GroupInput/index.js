import { useState } from "react";

import "./GroupInput.css";
import { useDispatch } from "react-redux";
import { actionCreateGroup } from "../../store/groups";

const GroupInput = () => {
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [type, setType] = useState("In Person");
	const [privateVal, setPrivateVal] = useState(true);
	const [city, setCity] = useState("");
	const [state, setState] = useState("");

	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();

		let newGroup = {
			name,
			about,
			type,
			private: privateVal,
			city,
			state
		};

		// useEffect(() => {
		// 	dispatch(addArticle(newArticle));
		// }, [dispatch]);

		dispatch(actionCreateGroup(newGroup));

		reset();
	};

	const reset = () => {
		setName("");
		setAbout("");
		setType("In person");
		setPrivateVal(true);
		setCity("");
		setState("");
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
				<label htmlFor='privateVal'>Private?</label>
				<div>
					<div className='PrivateVal'>
						<label>
							<input
								checked={privateVal === true}
								id='privateVal'
								type='radio'
								onChange={(e) =>
									setPrivateVal(e.target.value)
								}
								value={true}
							/>
							Yes
						</label>
					</div>
					<div className='PrivateVal'>
						<label>
							<input
								checked={privateVal === false}
								id='privateVal'
								type='radio'
								onChange={(e) =>
									setPrivateVal(e.target.value)
								}
								value={false}
							/>
							No
						</label>
					</div>
				</div>
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
			</form>
		</div>
	);
};

export default GroupInput;
