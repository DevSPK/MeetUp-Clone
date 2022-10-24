<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DevSPK/MeetUp-Clone">
    <img src="./frontend/public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Treffenklon</h3>

  <p align="center">
    A clone of Meetup.com.
    <br />
    <a href="https://github.com/DevSPK/MeetUp-Clone"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://treffenklon.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/DevSPK/MeetUp-Clone/issues">Report Bug</a>
    ·
    <a href="https://github.com/DevSPK/MeetUp-Clone/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://treffenklon.herokuapp.com/)

This is a clone of the popular website meetup.com to demonstrate my ability to create a functioning website using the below technologies.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- 

<p align="center">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="height: 100px; width:100px;" />
</p>
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" style="height: 100px; width:100px;" />
</p>
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" style="height: 100px; width:100px;" />
</p>
<p align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg"
 style="height: 100px; width:100px;"
/>

<p align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="height: 100px; width:100px;"/>
</p>

<p align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" style="height: 100px; width:100px;"/>
</p>
</p>


 --> 
 ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
 ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
 ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
 ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
 ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
 ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
 ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
 ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
 ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/DevSPK/MeetUp-Clone.git
   ```
2. Install NPM packages in root directory, backend directory, and frontend directory
   ```sh
   npm install
   ```
3. In the background directory, create a .env file the following:

   ```sh
   PORT=8000
   DB_FILE=db/dev.db
   JWT_SECRET=«generate_strong_secret_here»
   JWT_EXPIRES_IN=604800
   ```

4. In the backend directory, migrate the production database

   ```sh
   dotenv npx sequelize db:migrate
   ```

5. In the backend directory, seed the database

   ```sh
   dotenv npx sequelize db:seed:all
   ```

6. In the backed directory, start the backend server

   ```sh
   npm start
   ```

7. In a different terminal window, in the frontend directory, start the frontend server

   ```sh
   npm start
   ```

8. Open [http:/localhost:3000](http:/localhost:3000) to see the application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- Either create a new user and login or click on the demo user option to get started
- Logging in allows you to create a group by clicking the "Start a new group" option in the upper right
- Once you've created a group, you can see it on the groups page which is accessible from the dropdown menu in the upper right
- From the groups page you can select an individual group to get more details
- From the individual group page you can edit the group (if you created it), add an event, or even delete the group(if you created it)
- Once you've created an event, you can see it on the events page which is accessible from the dropdown menu in the upper right
- From the events page you can select an individual event to get more details
- From the individual event page you can delete the event (if you created it)

<!--
_For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Can read, create, edit, and delete groups
- [x] Can read, create, and delete events
- [ ] Can create, read, update, and delete additional group and event pictures
<!--
See the [open issues](https://github.com/DevSPK/MeetUp-Clone/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
<!--
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->
<!--
<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- LICENSE -->
<!--
## License

Distributed under the MIT License. See `LICENSE.txt` for more information. -->
<!--
<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTACT -->

## Contact

Sean Kennedy - seankennedy75@gmail.com

Project Link: [https://github.com/DevSPK/MeetUp-Clone](https://github.com/DevSPK/MeetUp-Clone)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
<!--
## Acknowledgments

- []()
- []()
- []() -->
<!--
<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/DevSPK/MeetUp-Clone.svg?style=for-the-badge
[contributors-url]: https://github.com/DevSPK/MeetUp-Clone/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DevSPK/MeetUp-Clone.svg?style=for-the-badge
[forks-url]: https://github.com/DevSPK/MeetUp-Clone/network/members
[stars-shield]: https://img.shields.io/github/stars/DevSPK/MeetUp-Clone.svg?style=for-the-badge
[stars-url]: https://github.com/DevSPK/MeetUp-Clone/stargazers
[issues-shield]: https://img.shields.io/github/issues/DevSPK/MeetUp-Clone.svg?style=for-the-badge
[issues-url]: https://github.com/DevSPK/MeetUp-Clone/issues
[license-shield]: https://img.shields.io/github/license/DevSPK/MeetUp-Clone.svg?style=for-the-badge
[license-url]: https://github.com/DevSPK/MeetUp-Clone/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: ./assets/treffenklon.readme.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com

<!--
```

``` -->
