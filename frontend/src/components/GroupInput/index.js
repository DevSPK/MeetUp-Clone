import { useState } from "react";

import "./GroupInput.css";
import { useDispatch } from "react-redux";
import { addGroup } from "../../store/groups";

const GroupInput = () => {
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [type, setType] = useState("In person");
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
			privateVal,
			city,
			state
		};

		console.log({ newGroup });

		// useEffect(() => {
		// 	dispatch(addArticle(newArticle));
		// }, [dispatch]);

		dispatch(addGroup(newGroup));

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
				{/* <label htmlFor='privateVal'>Private?</label>
				<div>
					<div className='PrivateVal'>
						<label>
							<input
								onChange={(e) =>
									setPrivateVal(e.target.value)
								}
								checked={privateVal === true}
								id='privateVal'
								type='radio'
								value={true}
								name='privateVal'
							/>
							Yes
						</label>
					</div>
					<div className='PrivateVal'>
						<label>
							<input
								onChange={(e) =>
									setPrivateVal(e.target.value)
								}
								checked={privateVal === false}
								id='privateVal'
								type='radio'
								value={false}
								name='privateVal'
							/>
							No
						</label>
					</div>
				</div> */}
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
