import { useState } from "react";

import "./GroupInput.css";
import { useDispatch } from "react-redux";
import { actionCreateGroup } from "../../store/groups";

const GroupInput = () => {
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [type, setType] = useState("In Person");
	const [private, setPrivate] = useState(true);
	const [city, setCity] = useState("");
	const [state, setState] = useState("");

	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();

		let newGroup = {
			name,
			about,
			type,
			private,
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
		setPrivate(true);
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
				<input
					type='text'
					onChange={(e) => setAbout(e.target.value)}
					value={about}
					placeholder='About'
					name='about'
				/>
				<input
					type='text'
					onChange={(e) => setAbout(e.target.value)}
					value={about}
					placeholder='About'
					name='about'
				/>
				<input
					type='text'
					onChange={(e) => setAbout(e.target.value)}
					value={about}
					placeholder='About'
					name='about'
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default ArticleInput;
