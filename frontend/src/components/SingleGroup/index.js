import {
	useParams,
	Redirect,
	useHistory
} from "react-router-dom";
import { Link } from "react-router-dom";
import {
	thunkGetOneGroup,
	thunkRemoveGroup,
	thunkupdateGroup
} from "../../store/groups";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SingleGroup = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	// console.log("this is id", id);

	// console.log("this is singleGroup groupsList", groupsList);

	let group = useSelector((state) => state.groups[id]);

	// console.log(group);

	useEffect(() => {
		dispatch(thunkGetOneGroup(id));
	}, [dispatch]);

	//const groupChoice = groupList.find(({id}) => id === groupId)

	// console.log("this is group from singlegroup", group);

	async function handleClick(groupId) {
		await dispatch(thunkRemoveGroup(groupId));
		history.push("/groups");
	}

	return (
		<div>
			<h1>Group Name: {group.name}</h1>
			<h2>About this group: {group.about}</h2>
			<h3>Type of Group: {group.type}</h3>
			<h3>Is Group Private: {`${group.private}`}</h3>
			<h3>City: {group.city}</h3>
			<h3>State: {group.state}</h3>
			<button onClick={() => handleClick(group.id)}>
				Delete Group
			</button>
		</div>
	);
};
