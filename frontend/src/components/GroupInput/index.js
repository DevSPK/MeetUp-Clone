import { useState, useEffect } from "react";

import "./GroupInput.css";
import { useDispatch } from "react-redux";
import { thunkAddGroup } from "../../store/groups";
import { useHistory } from "react-router-dom";
import { thunkReadAllGroups } from "../../store/groups";

const GroupInput = ({ hideForm }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("In person");
  const [privateVal, setPrivateVal] = useState(true);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadAllGroups());
  }, [dispatch, name, about, type, privateVal, city, state, imageUrl, errors]);

  // useEffect(
  // 	({ hideForm }) => {
  // 		if (!errors) {
  // 			reset();
  // 			hideForm();
  // 			return <Redirect to='/groups/' />;
  // 		}
  // 	},
  // 	[dispatch]
  // );

  useEffect(() => {
    const customErrors = [];

    if (name.length > 255)
      customErrors.push("Name must be less than 255 characters");
    if (!imageUrl.length) customErrors.push("Please provide a valid image URL");
    setErrors(customErrors);
  }, [name, about, type, privateVal, city, state, imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Create Group ran in GroupInput");

    let newGroup = {
      name,
      about,
      type,
      privateVal,
      city,
      state,
      imageUrl
    };

    // have to wait for response from promise, check if it is okay, otherwise will process error

    // ######## Example of create feature using .then promise
    if (errors.length !== 0) {
      return setErrors(errors);
    } else {
      setErrors([]);
      return dispatch(thunkAddGroup(newGroup))
        .then((res) => {
          if (res.ok) {
            // console.log("this is res in thunkAddGroup", res);
            reset();

            history.push("/groups");
          }
        })
        .catch(async (res) => {
          const data = await res.json();
          // console.log("this is data1 in thunkAddGroup", data);
          if (data && data.errors) {
            // console.log(
            // 	"this is data3 in thunkAddGroup",
            // 	data
            // );
            return setErrors(data.errors);
          }
        });
    }

    // let createdGroup

    // try {
    // 	createdGroup = await dispatch(thunkAddGroup(newGroup))
    // } catch()

    // // console.log({ newGroup });

    // // useEffect(() => {
    // // 	dispatch(addGroup(newGroup));
    // // }, [dispatch]);

    // // const createdGroup = dispatch(
    // // 	thunkAddGroup(newGroup)
    // // );

    // if (!createdGroup) return null;

    // if (createdGroup && errors.length === 0) {
    // 	reset();
    // 	hideForm();
    // 	return <Redirect to='/groups/' />;
    // }
  };

  const reset = () => {
    setName("");
    setAbout("");
    setType("In person");
    setPrivateVal(true);
    setCity("");
    setState("");
    setImageUrl("");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);
    reset();
    history.push("/groups");
  };

  return (
    <div className='group--form--container  group--form__shared'>
      <h1 className='group--form--title'>Create your group</h1>
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
        <label
          htmlFor='imageUrl'
          className='group--form--labels'>
          Image URL
        </label>
        <input
          type='text'
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          // defaultValue={"
          // https: //picsum.photos/225/125"}
          placeholder='Place image link here'
          name='imageUrl'
          className='form--input  group--form__shared'
          required
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

export default GroupInput;
