import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkReadAllGroups } from "../../store/groups";
import { useEffect, useState } from "react";
import {
	Route,
	Switch,
	// NavLink,
	Link,
	NavLink
} from "react-router-dom";
import { SingleGroup } from "../SingleGroup";
import GroupInput from "../GroupInput";
import "./GroupsPage.css";

const GroupsPage = () => {
	const [showCreateGroupForm, setShowCreateGroupForm] =
		useState(false);

	const groupsList = useSelector((state) =>
		Object.values(state.groups)
	);

	// console.log("this is groupsList", groupsList);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkReadAllGroups());
	}, [dispatch]);

	if (!groupsList) {
		return null;
	}

	//// console.log(groupsList.map(group => ));

	// let content = null;

	// if (showCreateGroupForm) {
	// 	content = (
	// 		<Route path=''/start-a-group''>
	// 			<GroupInput
	// 				hideForm={() => setShowCreateGroupForm(false)}
	// 			/>
	// 		</Route>
	// 	);
	// }

	return (
		<div>
			<div className='groups-page'>
				<div className='groups-events-createGroups-links'>
					<div className='top-groups-link-container top-links'>
						<NavLink
							to='/groups'
							className='top-groups-link'>
							Groups
						</NavLink>
					</div>
					<div className='top-events-link-container top-links'>
						<NavLink
							to='/events'
							className='top-events-link'>
							Events
						</NavLink>
					</div>
					<div className='top-create-groups-link-container top-links'>
						<NavLink
							to='/start-a-group'
							className='top-create-groups-link'>
							Start a new group
						</NavLink>
					</div>
				</div>
				<div className='groups-list'>
					<ul className='groups-list-item'>
						{groupsList.map((group) => (
							<Link
								style={{ textDecoration: "none" }}
								key={group.id}
								to={`/groups/${group.id}`}>
								<li>
									<div className='group-image-container'>
										<div>
											<img
												className='group-image'
												src={group.previewImage}
												alt='a depiction of this group'
											/>
										</div>
									</div>
									<div className='group-text-items'>
										<div className='group-name-container'>
											<h1
												className='group-name'
												style={{ textDecoration: "none" }}>
												{group.name}
											</h1>
										</div>
										<div className='group-city-state-container'>
											<h2
												style={{ textDecoration: "none" }}
												className='group-city-state'>{`${group.city}, ${group.state}`}</h2>
										</div>
										<div className='group-about-container'>
											<p
												style={{ textDecoration: "none" }}
												className='group-about'>
												{group.about}
											</p>
										</div>
										<div
											style={{ textDecoration: "none" }}
											className='group-members-type-container'>
											<p className='group-num-members-type'>
												{`${group.numMembers} member(s) · `}
												{group.private && "Private"}
												{!group.private && "Public"}
											</p>
										</div>
									</div>
								</li>
							</Link>
						))}
						{/* <li>
					<Link to={"/groups"}>Create a Group</Link>
				</li> */}
					</ul>
				</div>
				{/* <button
					onClick={() => setShowCreateGroupForm(true)}>
					Create New Group
				</button>

				<div>{content}</div> */}
			</div>
		</div>
	);
};

export default GroupsPage;
