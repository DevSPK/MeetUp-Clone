import { useParams } from "react-router-dom";

import React from "react";

export const SingleGroup = ({ groupsList }) => {
	const { id } = useParams();

	console.log("this is id", id);

	console.log("this is singleGroup groupsList", groupsList);

	let group = groupsList[id];

	//const groupChoice = groupList.find(({id}) => id === groupId)

	return (
		<div>
			<h1>{group.name}</h1>
			<h2>{group.about}</h2>
		</div>
	);
};
