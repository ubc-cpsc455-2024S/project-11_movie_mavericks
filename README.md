# [MovieHub](https://project-11-movie-mavericks-1.onrender.com/)  

## Discover your next favorite movie with our personalized recommendation website! Create and manage watchlists with ease, share your reviews to express your satisfaction or displeasure. Whether you are a casual viewer or a devoted cinephile, there's something in it for you.  

![MovieHub CI/CD workflow](https://github.com/ubc-cpsc455-2024S/project-11_movie_mavericks/actions/workflows/main.yml/badge.svg)

<hr></hr>

## Table of Contents:  
[Project URL](#Deployment)  
[Running the Project](#Testing)  
[Team Members](#Team%20Members)  
[Project Requirements](#Requirements)  
[Technologies](#Tech-Stack)  
[Above and Beyond Functionality](#Above-and-Beyond)  
[Next Steps](#Next%20Steps)  
[List of Contributions](#List%20of%20Contributions)  
[Images](#Images)  
[References](#References)

[Jump to Bottom ↓](#References)

<hr></hr>

## Deployment:  
- https://project-11-movie-mavericks-1.onrender.com/

<hr></hr>  
  
## Testing:
- Navigate to the login screen (Login button at the top right corner of the Navbar) and enter the following testing credentials:  
  <strong>Username</strong>-> dom, <strong>Password</strong>-> admin2024
- All the features of the application can now be accessed as a regular user.  

<hr></hr>  
  
## Team Members:  
- Adwait Kulkarni
- Dominic Lo
- Patrick Liang
- Subhrodeep Ghose

## Requirements:  
### Minimal Requirements:
- As a user, I want to be able to navigate to the website and open it on any browser of my choice. [✔️]
- As a user, I want to be able to be able to see the options on the form so that I can send my inputs to the system. [✔️] 
- As a user, I want to be able to see at least 5 movie recommendations so that I can choose one of them to watch. [✔️]

### Standard Requirements:
- As a user, I want to be able to see some high-level info about the recommended movies, such as posters, and synopsis. [✔️]
- As a user, I want to be able to create an account so that I can comment and save movies. [✔️]
- As a user, I want to be able to comment on and give rating to a movie. [✔️]
- As a user, I want to be able to create a watchlist connected to my account. [✔️]
- As a user, I want to be able to add/delete items from my watchlist. [✔️]

### Stretch Requirements:
- As a user, I want to be able to create multiple watchlists instead of having to deal with the same watchlist every time. [✔️]
- As a user, I want to know on which streaming platforms the movies are availble. [✔️]
- As a user, I want to watch the trailer of the selected movie conveniently. [✔️]

<hr></hr>

## Tech-Stack:  
### Front-End:  
- <strong>React.js:</strong> We used React.js to create our reusable components and user interface. The modular, component-based architecture allows for reusable code without the need for reinventing the wheel every time you want to create something new, making the development process efficient and the application as a whole, scalable. React's virtual DOM ensures that the entire page doesn't have to be re-rendered every time there is a small change in the state, creating faster loading times and seamless user experiences. Compared to other frameworks like Angular.js or Vue.js, React.js works really well with our choice of back-end technologies and also has large community support online, making debugging and bug fixes really easy and an ideal choice for the project.
- <strong>Material-UI:</strong> For the user interface, we used Material-UI as the open-source React component library. This library provides ready-made components, designed for production, right out of the box and is credible as it uses Google's Material Design guidelines. Furthermore, Material-UI components are consistent, meaning we could ensure the same styles in different functions, instead of having to worry about inconsistent styling. A big advantage of Material-UI components is that they are customizable, so you don't have to use the styles provided by default and have a lot of freedom when it comes to styling.
- <strong>Redux Toolkit:</strong> We used Redux for state management. This allowed us to create a single source of truth for all the states in our project and helped us avoid prop drilling and the complicated use of hooks. With a state tree, we used pure reducer functions to dispatch actions during events which not only helped us during debugging but also while tracking a state across multiple components. Compared to other alternatives like MobX or Zustand, Redux has support for asynchronous operations as well which proved really useful during our API requests.
- <strong>Axios:</strong> We used Axios as the promise-based HTTP client to make requests to both external, third-party APIs as well as to our backend servers. The simplicity and ease of use and the minimal setup helped in rapid and efficient development while also providing useful error handling and authentication facilities for asynchronous requests. The main benefit of Axios is that it allows for cleaner code by handling request and response parameter transformations in the promise itself without having to wait for the promise to be resolved or rejected. Compared to native HTTP clients like Fetch, Axios provides a more feature-rich and developer-friendly interface to work with.

### Back-End:  
- <strong>Node.js:</strong> Since our project needs to be updated in real-time and makes use of asynchronicity, we used Node.js as not only is it highly scalable, but also has packages that allow developers to implement various functionalities. Node.js also supports multiple client-server connections at once, so it can handle multiple connections with minimal overhead. Comparing Node.js to other back-end frameworks like Python or Java Spring, Node.js is written in JavaScript making it an ideal use case for the project. It has a large online community, enables working with RESTful APIs more easily, is secure, and supports extensive libraries and frameworks like Express.js.
- <strong>Express.js:</strong> Express.js is built on top of Node.js and provides a minimal and flexible framework without unnecessary features for building robust, RESTful APIs. The key feature of Express.js that makes it a standout amongst other frameworks is the support for Middleware. This can be used to perform tasks like error handling, authentication, logging, database connections (in our case, Mongoose), etc. It also has a powerful routing system that makes it easier to create HTTP routes for different URLs and you can handle each type of request separately with a feature to create parametrized URLs, enabling the creation of dynamic routes. What makes it the best choice for this project is the easy connection with databases, such as MongoDB that allowed us to get our database set up pretty quickly without much boilerplate code compared to frameworks like Django or Ruby on Rails.

### Database:
- <strong>MongoDB:</strong> We chose MongoDB as the NoSQL for this project due to its ability to create multiple flexible documents that allow easy storage and access of data, as well as support for fast and scalable access for different types of data. In our case, we had multiple schemas that we needed to store data for such as users, watchlists, movies, reviews, etc. and MongoDB allowed us to create separate clusters for each schema which was very useful. Compared to SQL databases like MySQL or PostgreSQL, MongoDB provides more flexibility for handling diverse data types and complicated relationships that relational databases find difficult to manage. We used Mongoose as our ODM as it easily integrates with Express.js and Node.js and does not require any boilerplate code except for the package installation.

### Deployment
- <strong>Render:</strong> We have deployed our website on Render due to its seamless integration with GitHub and auto-deployment upon merge.

### Best Practices:  
- <strong>Consistency and Clarity:</strong> We followed consistent coding standards and naming conventions to ensure readability and maintainability. ESLint and Prettier were used to enforce these standards.
- <strong>Modular Design:</strong> The app was designed with a modular architecture, allowing for easy addition of new features and components. This modularity improves code reusability and simplifies testing. It is also remarkably easy to add new front-end routes as we used React-Router-DOM for route management.

<hr></hr>  
  
## Above-and-Beyond:

### API Integration:
- <strong>TMDB API:</strong> We integrated the TMDb (The Movie Database) API to fetch detailed movie information, ensuring that our users have access to the latest and most accurate movie data. This API provides a variety of REST endpoints for fetching comprehensive movie details such as the revenue earned by the movie, the cast featured in it, the average rating it has got from users worldwide, etc., enhancing the app's functionality and user experience compared to other movie databases.
- <strong>Streaming Availability API:</strong> Similar to TMDB API, we integrated the Streaming Availability API to inform our users on which streaming platform and corresponding region they can watch the movies.

### Security in authentication:  
- <strong>BCrypt:</strong> We implemented secure authentication of passwords using BCrypt. BCrypt is designed to be computationally intensive, making it resistant to brute-force attacks. Its salt functionality adds an extra layer of security by ensuring that identical passwords have different hashes. Also using this module ensures that users can rest assured that the developers of the website don't have any knowledge of sensitive user information like their passwords as they are end-to-end encrypted.  Compared to simpler hashing algorithms like MD5 or SHA-1, BCrypt offers enhanced security suitable for modern applications.

### Enhanced user experience:
- <strong>Fully responsive:</strong> The website is fully responsive to screen size. User will enjoy using our service on various devices.
- <strong>Social media:</strong> Integration with various social media allows our users to share their favorite movies easily with friends and the world.

<hr></hr>  

## Next Steps:  
- Currently, the project only recommends movies to users, and all the features are curated according to this. In the future, we aim to add support for TV Shows and Blogs as well so that the project can be transformed from a Movie Recommendation System to a Content Exploration System.
- We also plan to integrate machine-learning techniques to provide personalized movie recommendations based on user preferences, viewing history, and ratings. This would enable us to provide more unique feedback to users like what sentiment of movies they like and provide them with interactive displays to visualize their preferences.
- We plan to include a push notification system where users can submit their email addresses and every time a piece of content is published, the user can get notified of this based on their preferences via email.
- A really really stretch requirement we have is to add a voice recognition system that would allow for touchless user experiences and people can just sit back, talk to the website about what they want, and let the app do the work for them.

<hr></hr>

## List of Contributions:  
- <strong>Adwait Kulkarni:</strong>
    - Set up the project with Vite and React, integrated Material UI, and set up most of the initial components in addition to creating the preference form, the About page, the Feeling Lucky functionality, and the user login and authentication functionality.
    - Created the Redux store for users and the Account page with account options like seeing your watchlists, comments, and reviews and the back-end routes to get a user, create a new user, delete a user, and edit an existing user.
    - Developed the social media movie-sharing functionality and watchlist feature that allowed users to add movies to existing watchlists in the database which included user info page functionality to display all watchlist movies and the ability to delete individual movies from watchlists.
    - Cleaned up the code by removing explanatory comments and logging statements, hid sensitive information like API keys and DB connection strings from client code, and wrote the README for the project.  
- <strong>Dominic Lo:</strong>
    - External API integrations with TMDB and Streaming Availability
    - Initialized schemas, DB collections, and populate with sample data for movies, reviews, watchlists
    - Implemented comment system
    - Setup redux store for recommendations
    - UI for recommendations, movie popup, and form inputs
- <strong>Patrick Liang:</strong>
    - Created movie details popup component
    - API integrations for form inputs
    - UI for form, recommendations, login and account components
    - Designed collection schemas for database
- <strong>Subhrodeep Ghose:</strong>
    - Setup MongoDB database, and created some schemas used in the project. 
    - Integrated the MongoDB database with the backend. 
    - Helped out with backend issues.
    - Helped create adding watchlists functionality.
    - Deployed project on render.
    - Created end-to-end api tests on postman. 
    - Created Github Actions to automatically run postman test suite and deploy on render on successful test suite run. 
<hr></hr>

## Images:  

![image](https://github.com/user-attachments/assets/f250af2b-8a9a-426c-ad58-e07a24008e9a)  
![image](https://github.com/user-attachments/assets/068ea411-827a-409f-9f6f-7d16d13b6444)
![image](https://github.com/user-attachments/assets/928ee235-5e66-4a62-ae3f-a323d66cfdd6)  
![image](https://github.com/user-attachments/assets/f983e168-0864-4a46-8a24-72378786fc6a)  
![image](https://github.com/user-attachments/assets/fd26ede5-ff97-4e20-aeae-db09e424bd4f)  
![image](https://github.com/user-attachments/assets/169bc09a-4e76-49b5-83bb-393e34f86035)  
![image](https://github.com/user-attachments/assets/697cde41-5806-4633-b04f-ab7b82d836fc)  
![image](https://github.com/user-attachments/assets/4e106a1b-d90f-402e-9da2-39620bc21647)  
![image](https://github.com/user-attachments/assets/5021f1b3-3040-4f04-9a77-e704102c3571)  




<hr></hr>

## References:  
- [Vite](https://vitejs.dev/guide/)
- [Material UI](https://mui.com/)  
- [Redux Toolkit](https://redux.js.org/)  
- [Node.js](https://nodejs.org/docs/latest/api/)
- [Express.js](https://expressjs.com/en/starter/installing.html)
- [MongoDB](https://www.mongodb.com/docs/atlas/)
- [Mongoose](https://mongoosejs.com/docs/)
- [Axios](https://axios-http.com/docs/api_intro)
- [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [Streaming Availability API](https://docs.movieofthenight.com/)
- [BCrypt](https://blog.logrocket.com/password-hashing-node-js-bcrypt/)
- [OpenAI](https://platform.openai.com/docs/api-reference/introduction)
- Workshop slides
- Assignment concepts

[Go to Top ↑](#Deployment)
