import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
	removeGroup,
	updateGroup
} from "../../store/groups";

import React from "react";

export const SingleGroup = ({ groupsList }) => {
	const { id } = useParams();

	// console.log("this is id", id);

	// console.log("this is singleGroup groupsList", groupsList);

	let group = groupsList[id];

	//const groupChoice = groupList.find(({id}) => id === groupId)

	console.log(group);

	return (
		<div>
			<h1>Group Name: {group.name}</h1>
			<h2>About this group: {group.about}</h2>
			<h3>Type of Group: {group.type}</h3>
			<h3>Is Group Private: {`${group.private}`}</h3>
			<h3>City: {group.city}</h3>
			<h3>State: {group.state}</h3>
			<button onClick={() => removeGroup(group.id)}>
				Delete Group{" "}
			</button>
		</div>
	);
};
