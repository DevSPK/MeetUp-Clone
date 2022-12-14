import React from "react";
import "./SplashPage.css";
import videoMeeting from "../../assets/online_events.svg";
import leftImage from "../../assets/handsUp.svg";
import middleImage from "../../assets/ticket.svg";
import rightImage from "../../assets/joinGroup.svg";
import { Link, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

const SplashPage = ({ setShowSignupModal }) => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  let startAGroupLink = null;
  let joinTreffenklonButton = null;

  if (!sessionUser) {
    startAGroupLink = (
      <Link
        to='/'
        onClick={() => setShowSignupModal(true)}
        className='action-link'>
        Start a group
      </Link>
    );
    joinTreffenklonButton = (
      <button
        onClick={() => setShowSignupModal(true)}
        className='action-signup-button'>
        Join Treffenklon
      </button>
    );
  } else if (sessionUser) {
    startAGroupLink = (
      <Link
        to='/start-a-group'
        className='action-link'>
        Start a group
      </Link>
    );
    joinTreffenklonButton = (
      <button
        onClick={() => history.push("/start-a-group")}
        className='action-signup-button'>
        Join Treffenklon
      </button>
    );
  }

  return (
    <main className='flexContainer'>
      <div className='middleVerticalContainer'>
        <div className='topHorzContainer'>
          <div className='text-container'>
            <div className='headline-container'>
              <h1>
                Celebrating 200 hours of made up connections on Treffenklon
              </h1>
            </div>
            <div className='paragraph-container'>
              <p className='splash--text'>
                Whatever you're looking to do this year, Treffenklon can help.
                For 200 hours, made up folks have turned to Meetup to meet other
                made up folks, make friends, find support, grow a business, and
                explore their interests. Thousands of made up events are
                happening every day???join the fun.
              </p>
            </div>
          </div>
          <div className='imgContainer'>
            <img
              src={videoMeeting}
              alt='online conference call'
              id='videoMeetingImg'
            />
          </div>
        </div>
      </div>
      <div className='middle-horz-container'>
        <div className='middle-text-container'>
          <div className='middle-headline-container'>
            <h2>How Treffenklon works</h2>
          </div>
          <div className='middle-paragraph-container'>
            <p className='splash--text'>
              Meet made up people who share your interests through online and
              in-person events. It's free to create an account.
            </p>
          </div>
        </div>
        <div className='middle-action-links-container'>
          <div className='outer-item-container'>
            <div className='image-container'>
              <img
                src={leftImage}
                alt='high-five cartoon'
                className='action-link-images'
              />
            </div>
            <div className='link-container'>
              <Link
                className='action-link'
                to='/groups'>
                Join a group
              </Link>
            </div>
            <div className='paragraph-container'>
              Do what you love, meet others who love it, find your community.
              The rest is history!
            </div>
          </div>
          <div className='outer-item-container'>
            <div className='image-container'>
              <img
                src={middleImage}
                alt='ticket cartoon'
                className='action-link-images'
              />
            </div>
            <div className='link-container'>
              <Link
                className='action-link'
                to='/events'>
                Find an event
              </Link>
            </div>
            <div className='paragraph-container'>
              Events are happening on just about any topic you can think of.
            </div>
          </div>
          <div className='outer-item-container'>
            <div className='image-container'>
              <img
                src={rightImage}
                alt='silhouettes of three cartoon people'
                className='action-link-images'
              />
            </div>
            <div className='link-container'>{startAGroupLink}</div>
            <div className='paragraph-container'>
              You don't have to be an expert to gather people together and
              explore shared interests.
            </div>
          </div>
        </div>
        <div className='middle-bottom-sign-up-button-container'>
          <div className='bottom-space-container'>{joinTreffenklonButton}</div>
        </div>
      </div>
      {/* <footer className='bottom-container'>
				<div className='bottom-horz-container'></div>
			</footer> */}
    </main>
  );
};

export default SplashPage;
