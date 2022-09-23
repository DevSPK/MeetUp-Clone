import {
	useParams,
	useHistory,
	Route
} from "react-router-dom";
// import { Link } from "react-router-dom";
import {
	thunkGetOneGroup,
	thunkRemoveGroup
} from "../../store/groups";

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupUpdate from "../GroupUpdate";
import EventInput from "../EventInput";
import * as sessionActions from "../../store/session";

export const SingleGroup = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const [showEditGroupForm, setShowEditGroupForm] =
		useState(false);
	const [showCreateEventForm, setShowCreateEventForm] =
		useState(false);

	const sessionUser = useSelector(
		(state) => state.session.user
	);

	console.log(
		"this is sessionUser in singleGroup",
		sessionUser
	);

	// console.log("this is id", id);

	// console.log("this is singleGroup groupsList", groupsList);

	let group = useSelector((state) => state.groups[id]);

	// console.log(group);

	useEffect(() => {
		dispatch(thunkGetOneGroup(id));
	}, [dispatch, id]);

	//const groupChoice = groupList.find(({id}) => id === groupId)

	console.log("this is group from singlegroup", group);

	async function handleDelete(groupId) {
		await dispatch(thunkRemoveGroup(groupId));
		history.push("/");
	}

	console.log("this is group from singleGroup", group);

	let content = null;

	if (
		showEditGroupForm &&
		sessionUser.id === group.organizerId
	) {
		content = (
			<GroupUpdate
				group={group}
				hideForm={() => setShowEditGroupForm(false)}
			/>
		);
	}

	if (showCreateEventForm) {
		content = (
			<EventInput
				group={group}
				hideForm={() => setShowCreateEventForm(false)}
			/>
		);
	}

	if (!group) {
		return null;
	}

	let previewImgUrl;

	// if return group has a group images array, find the preview image or set a placeholder
	if (group.GroupImages) {
		const { GroupImages } = group;

		console.log(
			"this is previewImg if group.GroupImages",
			GroupImages
		);
		if (GroupImages.length === 1) {
			const [groupImageData] = GroupImages;

			previewImgUrl = groupImageData.url;

			console.log("this is groupImageData", groupImageData);
		}

		if (GroupImages.length > 2) {
			const previewImg = GroupImages.find(
				({ preview }) => preview === true
			);
			previewImgUrl = previewImg.url;
		}
	}

	// console.log(
	// 	"this is previewImg.url for the group image",
	// 	previewImg.url
	// );

	// if returned group doesn't have a groupimgages object, display the preview url or return a placeholder
	// if (group.previewImage && group.GroupImages) {
	// 	console.log(
	// 		"this is group.previewImage data for the group image",
	// 		group.previewImage
	// 	);
	// 	previewImgUrl = group.previewImage;
	// } else {
	// 	previewImgUrl =
	// 		"https://via.placeholder.com/255x125?text=Image+not+found";
	// }

	return (
		<div>
			<h1>Group Name: {group.name}</h1>
			<h2>About this group: {group.about}</h2>
			<h3>Type of Group: {group.type}</h3>
			<h3>Is Group Private: {`${group.private}`}</h3>
			<h3>City: {group.city}</h3>
			<h3>State: {group.state}</h3>
			<img
				id='groupPreviewImg'
				src={previewImgUrl}
				alt='a depiction of this group'
				loading='lazy'
			/>
			<div className='buttons'>
				<button onClick={() => handleDelete(group.id)}>
					Delete Group
				</button>
				<button onClick={() => setShowEditGroupForm(true)}>
					Edit Group
				</button>
				<button
					onClick={() => setShowCreateEventForm(true)}>
					Create New Event
				</button>
			</div>
			{content}
		</div>
	);
};
