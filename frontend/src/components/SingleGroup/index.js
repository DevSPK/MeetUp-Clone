import {
	useParams,
	useHistory,
	Route
} from "react-router-dom";
// import { Link } from "react-router-dom";
import {
	thunkGetOneGroup,
	thunkReadAllGroups,
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
	const [showGroupContent, setShowGroupContent] =
		useState(true);

	const [show, setShow] = useState(true);

	useEffect(() => {
		dispatch(thunkReadAllGroups());
	}, [dispatch, id]);

	const sessionUser = useSelector(
		(state) => state.session.user
	);

	const groupsList = useSelector((state) =>
		Object.values(state.groups)
	);

	// return dispatch(thunkGetOneGroup(id)).then(
	// 	async (res) => {
	// 		await res;
	// 		if (res.ok) {
	// 			// console.log(
	// 				"***********************this is res from thunkGetOneGroup",
	// 				res
	// 			);
	// 			return // console.log("this is end of async with res");
	// 		}
	// 	}
	// );
	// let group = dispatch(thunkGetOneGroup(id));

	// // console.log(
	// 	"this is selected group from thunkGetOneGroup",
	// 	group
	// );

	// console.log(
	// 	"this is groupsList from readAllGroups",
	// 	groupsList
	// );

	// console.log(
	// 	"this is sessionUser in singleGroup",
	// 	sessionUser
	// );

	let paramId = id;

	let normalizedGroups = {};

	groupsList.forEach(
		(group) => (normalizedGroups[group.id] = group)
	);

	// // console.log("this is id", id);

	// // console.log("this is singleGroup groupsList", groupsList);
	//
	// ************** this is not the right return with image info****************
	// let group = useSelector((state) => state.groups[id]);

	// // console.log("this is group from state.gourps", group);

	// useEffect(() => {
	// 	dispatch(thunkGetOneGroup(id));
	// }, [dispatch, id]);

	const group = normalizedGroups[paramId];

	// console.log("this is group from normalizedGroups", group);

	async function handleDelete(groupId) {
		dispatch(thunkRemoveGroup(groupId));

		history.push("/groups");
	}

	// // console.log("this is group from singleGroup", group);

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

	const handleEditGroupForm = () => {
		setShowEditGroupForm(true);
		setShowGroupContent(false);
		setShow((prev) => !prev);
	};

	const handleCreateEventFormClick = (e) => {
		console.log("this works at least");
		setShowCreateEventForm(true);
		setShowGroupContent(false);
		setShow((prev) => !prev);
	};

	if (showCreateEventForm) {
		content = (
			<EventInput
				group={group}
				hideForm={() => setShowCreateEventForm(false)}
			/>
		);
	}

	if (!group || !group.previewImage) {
		return null;
	}

	let groupContent = null;

	if (showGroupContent) {
		groupContent = (
			<div className='group-content'>
				<h1>Group Name: {group.name}</h1>
				<h2>About this group: {group.about}</h2>
				<h3>Type of Group: {group.type}</h3>
				<h3>Is Group Private: {`${group.private}`}</h3>
				<h3>City: {group.city}</h3>
				<h3>State: {group.state}</h3>
				<img
					id='groupPreviewImg'
					src={group.previewImage}
					alt='a depiction of this group'
				/>
			</div>
		);
	}
	// if return group has a group images array, find the preview image or set a placeholder
	// if (group.GroupImages) {
	// 	const { GroupImages } = group;

	// 	// console.log(
	// 		"this is previewImg if group.GroupImages",
	// 		GroupImages
	// 	);
	// 	if (GroupImages.length === 1) {
	// 		const [groupImageData] = GroupImages;

	// 		previewImgUrl = groupImageData.url;

	// 		// console.log("this is groupImageData", groupImageData);
	// 	}

	// 	if (GroupImages.length > 2) {
	// 		const previewImg = GroupImages.find(
	// 			({ preview }) => preview === true
	// 		);
	// 		previewImgUrl = previewImg.url;
	// 	}
	// }

	// // console.log(
	// 	"this is previewImg.url for the group image",
	// 	previewImg.url
	// );

	// if returned group doesn't have a groupimgages object, display the preview url or return a placeholder
	// if (group.previewImage) {
	// 	// console.log(
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
			{groupContent}
			<div className='buttons'>
				{show && (
					<button onClick={() => handleDelete(group.id)}>
						Delete Group
					</button>
				)}
				{show && (
					<button
						className='edit-group-button button'
						onClick={() => handleEditGroupForm()}>
						Edit Group
					</button>
				)}
				{show && (
					<button
						className='create-event-button button'
						onClick={() => handleCreateEventFormClick()}>
						Create New Event
					</button>
				)}
			</div>
			{content}
			<>
				<button onClick={() => setShow((prev) => !prev)}>
					Click
				</button>
				{show && <button>This is your component</button>}
			</>
		</div>
	);
};
