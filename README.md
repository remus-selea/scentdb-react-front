# ScentDB UI
ScentDB UI is a React frontend application that aims to serve as an encyclopedia of perfumes, fragrance notes, perfumers and brands. It is a showcase product built in my spare time.

<h3>
  <a href="https://remus-selea.github.io/scentdb-ui/#/">Visit the showcase app</a> |
  <a href="https://github.com/remus-selea/scentdb">Visit the backend app</a>
</h3>

-------

## Features
- Written in modern React, using only functional components and hooks
- Local React state management, without redux
- Usage of [PrimeReact](https://github.com/primefaces/primereact) components
- Form validation using [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- Image slider using [Splide](https://github.com/Splidejs/splide)
- Oauth2 Social Login with Github, Facebook and Google
- Browse perfumes, notes, brands and perfumers
- Search, filtering, pagination and sorting
- Contribution forms for new perfumes, notes, perfumers and companies
- Image cropper to help add images with a consistent look and aspect ratio

## Setting up the development environment
The project requires the ScentDB backend to be set up and running locally.  
[Head over to the backend repo for instructions on how to set it up.](https://github.com/remus-selea/scentdb)
- The project requires `npm` to be installed
- Clone or download an archive of the project
- Create an empty .env file in the root directory of the project, and copy the contents of the .env.local.example into it. Change the environment variables to your liking.
- Open a terminal in the root directory of the project
- Run the `npm install` if you are running the application for the first time
- Afterwards run the command `npm start` to start the application
- The app should now be running on `http://localhost:3000/`

## License
[MIT](https://choosealicense.com/licenses/mit/)
