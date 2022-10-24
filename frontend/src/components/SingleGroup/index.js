import { useParams, useHistory, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { thunkReadAllGroups, thunkRemoveGroup } from "../../store/groups";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SingleGroup.css";

export const SingleGroup = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();
  // console.log(id);
  // const [showEditGroupForm, setShowEditGroupForm] = useState(false);
  // const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  // const [showGroupContent, setShowGroupContent] = useState(true);

  // const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(thunkReadAllGroups());
  }, [dispatch, id]);

  const sessionUser = useSelector((state) => state.session.user);

  const groupsList = useSelector((state) => Object.values(state.groups));

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

  groupsList.forEach((group) => (normalizedGroups[group.id] = group));

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

  // if (showEditGroupForm && sessionUser.id === group.organizerId) {
  //   content = (
  //     <>
  //       <GroupUpdate
  //         group={group}
  //         hideForm={() => setShowEditGroupForm(false)}
  //       />
  //     </>
  //   );
  // }

  // const handleCreateEventFormClick = (e) => {
  //   console.log("this works at least");
  //   setShowCreateEventForm(true);
  //   setShowGroupContent(false);
  //   setShow((prev) => !prev);
  // };

  // const handleCreateEventFormClick = (e) => {};

  // const handleEditGroupForm = (e) => {};

  // if (showCreateEventForm) {
  //   content = (
  //     <EventInput
  //       group={group}
  //       hideForm={() => setShowCreateEventForm(false)}
  //     />
  //   );
  // }

  if (!group || !group.previewImage) {
    return null;
  }

  let groupContent = null;
  // let groupButtons = null;

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

  // console.log(`sessionUser`, { sessionUser });

  // groupButtons = (
  //   <>
  //     <>{content}</>
  //     {/* <>
  //       <button onClick={() => setShow((prev) => !prev)}>Click</button>
  //       {show && <button>This is your component</button>}
  //     </> */}
  //   </>
  // );

  groupContent = (
    <>
      <div className='group--content__border'>
        <div className='group--content__container'>
          <div className='group--image__container'>
            <img
              className='group--info--image'
              src={group.previewImage}
              alt='a depiction of this group'
            />
          </div>
          <div className='group--details__container'>
            <span className='group--details--text__name'>{group.name}</span>
            <span className='group--details--text__city-state'>
              <span className='icon--location-dot'>
                <i className='fa-solid fa-location-dot'></i>
              </span>
              {`${group.city}, ${group.state}`}
            </span>

            <span
              className='group--details--text__members-type'
              style={{ textDecoration: "none" }}>
              {" "}
              <span className='icon--user-group'>
                <i class='fa-solid fa-user-group'></i>
              </span>
              {`${group.numMembers} member(s) · `}
              {group.private && "Private group"}
              {!group.private && "Public group"}
            </span>
          </div>
        </div>
      </div>
      <div className='middle--flexbar__container'>
        <div className='group--aboutbar__container'>
          <div className='group--aboutbar__text'>About</div>
          <div className='group--aboutbar--buttons__container'>
            <div className='aboutbar--buttons'>
              <button
                className='form--button'
                onClick={() => handleDelete(group.id)}>
                Delete Group
              </button>
              <Link to={`/edit-a-group/${group.id}`}>
                <button className='edit-group-button button form--button'>
                  Edit Group
                </button>
              </Link>
              <Link to={`/groups/${group.id}/events`}>
                <button className='create-event-button button form--button'>
                  Create New Event
                </button>
              </Link>

              {/* <Switch>
                <Route path='/edit-a-group/:id'>
                  <GroupUpdate group={group} />
                </Route>
                <Route path='/groups/:groupId/events'>
                  <EventInput group={group} />
                </Route>
              </Switch> */}
            </div>
          </div>
        </div>
      </div>
      <div className='group--about__container'>
        <div className='group--about__details'>
          <h2 className='group--about__header'>What we're about</h2>
          <p className='group--about__text'>{group.about}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className='group-page__container'>
      {groupContent}
      <div>{content}</div>
      <div></div>
    </div>
  );
};
