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
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

  const groupsList = useSelector((state) => Object.values(state.groups));

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
    <div className='groups-page-container'>
      <div className='groups-page-header-container'>
        <div className='header-groups-link-container  header-links'>
          <div className='header--container__links header-links'>
            <NavLink
              to='/groups'
              className='header-groups-link'>
              Groups
            </NavLink>
          </div>
          <div className='header-events-link-container  header-links'>
            <NavLink
              to='/events'
              className='header-events-link'>
              Events
            </NavLink>
          </div>
          <div className='header-create-groups-link-container  header-links'>
            <NavLink
              to='/start-a-group'
              className='header-create-groups-link'>
              Start a new group
            </NavLink>
          </div>
        </div>
      </div>

      <div className='grid--column__middle'>
        {groupsList.map((group) => (
          <div
            style={{ textDecoration: "none" }}
            key={group.id}
            to={`/groups/${group.id}`}
            className='grid-card--container'>
            <Link to={`/groups/${group.id}`}>
              <div className='grid-card--text__container'>
                <img
                  class='grid-card--image__preview'
                  src={group.previewImage}
                  alt='a depiction of this group'
                />
                <p
                  className='grid-card--text__name'
                  style={{ textDecoration: "none" }}>
                  {group.name}
                </p>
                <p
                  style={{ textDecoration: "none" }}
                  className='grid-card--text__city-state  uppercase'>
                  {`${group.city}, ${group.state}`}
                </p>
                <p
                  style={{ textDecoration: "none" }}
                  className='grid-card--text__about'>
                  {group.about}
                </p>
                <p
                  className='grid-card--text__members-type'
                  style={{ textDecoration: "none" }}>
                  {`${group.numMembers} member(s) · `}
                  {group.private && "Private"}
                  {!group.private && "Public"}
                </p>
              </div>
            </Link>
          </div>
        ))}
        {/* <li>
					<Link to={"/groups"}>Create a Group</Link>
				</li> */}
      </div>
      {/* <button
					onClick={() => setShowCreateGroupForm(true)}>
					Create New Group
				</button>

				<div>{content}</div> */}
    </div>
  );
};

export default GroupsPage;
