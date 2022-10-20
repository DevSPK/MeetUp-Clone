import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./GroupUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllGroups, thunkUpdateGroup } from "../../store/groups";

const GroupUpdate = () => {
  const history = useHistory();
  const { id } = useParams();
  let editedGroup;

  const dispatch = useDispatch();

  console.log("this is id in groupupdate", id);
  useEffect(() => {
    dispatch(thunkReadAllGroups());
  }, [dispatch]);
  const groupsList = useSelector((state) => Object.values(state.groups));

  let paramId = id;

  let normalizedGroups = {};

  groupsList.forEach((group) => (normalizedGroups[group.id] = group));

  const group = normalizedGroups[paramId];

  // const [previewImage, setPreviewImage] = useState(editedGroup.previewImage)

  // // console.log("this is editedGroup prop", editedGroup);
  // // console.log("this is privateVal", privateVal);
  // // console.log(
  // 	"this is editedGroup.privateVal",
  // 	editedGroup.privateVal
  // );

  // useEffect(() => {
  //   dispatch(thunkReadAllGroups());
  // }, [dispatch]);

  editedGroup = group;

  const [name, setName] = useState(editedGroup.name);
  const [about, setAbout] = useState(editedGroup.about);
  const [type, setType] = useState(editedGroup.type);
  const [privateVal, setPrivateVal] = useState(editedGroup.private);
  const [city, setCity] = useState(editedGroup.city);
  const [state, setState] = useState(editedGroup.state);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!editedGroup) {
      return;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newInfo = {
      name,
      about,
      type,
      privateVal,
      city,
      state,
      id: editedGroup.id
    };

    setErrors([]);

    console.log({ editedGroup });

    // console.log({ newInfo });

    return dispatch(thunkUpdateGroup(newInfo))
      .then((res) => {
        // console.log(
        //   "***********************this is res from thunkUpdateGroup",
        //   res
        // );
        if (res) {
          handleUpdate(res);
          // console.log("inside the if.......");
          // hideForm();
          // return <Redirect to='/groups/' />;
          // history.push("/");
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        // console.log("this is data1", data);
        if (data && data.errors) {
          // console.log("this is data3", data);
          return setErrors(data.errors);
        }
      });

    // const updatedGroup = dispatch(
    // 	thunkUpdateGroup(newInfo)
    // );

    // // console.log(
    // 	"this is updatedGroup from thunkUpdateGroup",
    // 	updatedGroup
    // );

    // if (updatedGroup) {
    // 	history.push(`/groups/${updatedGroup.id}`);
    // 	hideForm();
    // }
    //reset();
  };

  function handleUpdate(res) {
    // console.log("inside handle update$$$$$$$$$$$$$");
    // hideForm();
    // return <Redirect to='/' />;
    history.push(`/groups`);
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);

    history.push(`/groups`);
  };

  return (
    <div className='group--form--container  group--form__shared'>
      <h1 className='group--form--title'>Edit Group</h1>
      <form
        onSubmit={handleSubmit}
        className='group--form__shared  group--form'>
        <label
          htmlFor='name'
          className='group--form--labels'>
          Name
        </label>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Name'
          name='name'
          className='form--input  group--form__shared'
        />
        <label
          htmlFor='about'
          className='group--form--labels'>
          About your group
        </label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          name='about'
          placeholder='Please provide at least 50 characters'
          rows='10'
          className='form--textarea  group--form__shared'></textarea>
        <label
          htmlFor='type'
          className='group--form--labels'>
          Group type
        </label>
        <select
          name='type'
          className='form--select  group--form__shared'
          onChange={(e) => {
            setType(e.target.value);
          }}>
          <option
            value=''
            disabled>
            Select a group type
          </option>
          <option value='In person'>In Person</option>
          <option value='Online'>Online</option>
        </select>
        <label
          htmlFor='private'
          className='group--form--labels'>
          Private?
        </label>

        <select
          className='form--select  group--form__shared'
          name='private'
          onChange={(e) => {
            setPrivateVal(e.target.value);
          }}>
          <option
            value=''
            disabled>
            Is this a private group?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <label
          htmlFor='city'
          className='group--form--labels'>
          City
        </label>
        <input
          type='text'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder='City'
          name='city'
          className='form--input  group--form__shared'
        />
        <label
          htmlFor='state'
          className='group--form--labels'>
          State
        </label>
        <input
          type='text'
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder='State'
          name='state'
          className='form--input  group--form__shared'
        />
        <div className='error--item  errors  group--form__shared  errors--container '>
          <ul className='group--form__shared   errors'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div className='form--button--container'>
          <button
            type='submit'
            className='form--button  group--form__shared'>
            Submit
          </button>
          <button
            type='button'
            onClick={handleCancelClick}
            className='form--button  group--form__shared'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupUpdate;
