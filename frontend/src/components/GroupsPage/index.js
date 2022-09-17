import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkListAllGroups } from "../../store/groups";
import { useEffect } from "react";

const GroupsPage = () => {
	const groupsList = useSelector(
		(state) =>
			// Object.values(state.groupState)
			state.groupSlice.allGroups
	);
	const dispatch = useDispatch();

	if (!groupsList) {
	}

	useEffect(() => {
		dispatch(thunkListAllGroups());
	}, [dispatch]);

	if (!groupsList) {
		return null;
	}

	//console.log(groupsList.map(group => ));

	console.log("this is groupsList", groupsList);

	return (
		<div>
			<h1 className='groups-page'>Groups Page</h1>
			<ul>
				{groupsList.map(({ id, name }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</div>
	);
};

export default GroupsPage;
