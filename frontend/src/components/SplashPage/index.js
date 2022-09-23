import React from "react";
import "./SplashPage.css";
import videoMeeting from "../../assets/groupvideo.png";

const SplashPage = () => {
	return (
		<main className='flexContainer'>
			<div className='welcomeDiv'>
				<div className='textDiv'>
					<h1 id='headline'>
						Celebrating a week of fake connections on
						Treffenklon
					</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Etiam sed pulvinar purus.
						Quisque vel nisi vel nisi posuere imperdiet.
						Proin ut placerat tortor. Pellentesque habitant.
						Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Etiam sed pulvinar purus.
						Quisque vel nisi vel nisi posuere imperdiet.
						Proin ut placerat tortor. Pellentesque habitant.
					</p>
				</div>
				<div id='imgDiv'>
					<img
						src={videoMeeting}
						alt='online conference call'
						id='videoMeetingImg'
					/>
				</div>
			</div>
			<div className='actionLinks'>Links here</div>
		</main>
	);
};

export default SplashPage;
