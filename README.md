# Group 11_Movie_Mavericks - {MovieHub}

## Discover your next favorite movie with our personalized recommendation website! Create and manage custom watchlists with ease, add your reviews and comments to movies to express your satisfaction or displeasure, and share your thoughts online with other people. Whether you are a casual viewer or a devoted cinephile, there's something in it for everyone and you will keep coming back to our website repeatedly, that's a guarantee!  

<hr></hr>

## Table of Contents:  
[Project Topic](#Topic)  
[Project Requirements](#Requirements)  
[Technologies](#Tech-Stack)

## Topic:

- Who is it for: Any movie enthusiast, no age restrictions.
- What will it do: It will recommend movies to users as per their preferences along with additional information about each movie such as the genre, release date, trailer, total revenue, etc.  
- What type of data will it store: We are using TMDB API to get the movie information in JSON format.  
- What will users be able to do with this data: Users will be able to select and set their preferences from a form and based on that selected data, get movies recommended to them.
- What is some additional functionality you can add/remove based on time constraints: Add functionality for TV shows as well and create a Content Recommendation System instead of a Movie Recommendation System.

<hr></hr>

## Requirements:  
### Minimal Requirements:
- As a user, I want to be able to navigate to the website and open it on any browser of my choice. [✔️]
- As a user, I want to be able to be able to see the options on the form so that I can send my inputs to the system. [✔️]
- As a user, I want to be able to edit/remove my previously submitted preferences. [✔️] 
- As a user, I want to be able to create a watchlist/basket connected to my account. [✔️]

### Standard Requirements:
- As a user, I want to be able to see at least 5 movie recommendations so that I can choose one of them to watch. [✔️]
- As a user, I want to be able to see some high-level info about the recommended movies, such as posters, and synopsis. [✔️]
- As a user, I want to be able to download all my movies using a Torrent link so that I can view them whenever I want locally (converting this requirement to a streaming option). [✔️]
- As a user, I want to be able to add/edit/delete items from my watchlist. [✔️]

### Stretch Requirements:
- As a user, I want to be able to create an account so that I don't have to worry about losing my preferences. [✔️]
- As a user, I want to be able to create multiple watchlists instead of having to deal with the same watchlist every time. [✔️]

<hr></hr>

## Tech-Stack:  
### Front-End:  
- <strong>React.js:</strong> We used React.js to create our reusable components and user interface. The modular, component-based architecture allows for reusable code without the need for reinventing the wheel every time you want to create something new, making the development process efficient and the application as a whole, scalable. React's virtual DOM ensures that the entire page doesn't have to be re-rendered every time there is a small change in the state, creating faster loading times and seamless user experiences. Compared to other frameworks like Angular.js or Vue.js, React.js works really well with our choice of back-end technologies and also has large community support online, making debugging and bug fixes really easy and an ideal choice for the project.
- <strong>Material-UI:</strong> For the user interface, we used Material-UI as the open-source React component library. This library provides ready-made components, designed for production, right out of the box and is credible as it uses Google's Material Design guidelines. Furthermore, Material-UI components are consistent, meaning we could ensure the same styles in different functions, instead of having to worry about inconsistent styling. A big advantage of Material-UI components is that they are customizable, so you don't have to use the styles provided by default and have a lot of freedom when it comes to styling.
- <strong>Redux Toolkit:</strong> We used Redux for state management. This allowed us to create a single source of truth for all the states in our project and helped us avoid prop drilling and the complicated use of hooks. With a state tree, we used pure reducer functions to dispatch actions during events which not only helped us during debugging but also while tracking a state across multiple components. Compared to other alternatives like MobX or Zustand, Redux has support for asynchronous operations as well which proved really useful during our API requests.

### Back-End:  
- <strong>Node.js:</strong> Since our project needs to be updated in real-time and makes use of asynchronicity, we used Node.js as not only is it highly scalable, but also has packages that allow developers to implement various functionalities. Node.js also supports multiple client-server connections at once, so it can handle multiple connections with minimal overhead. Comparing Node.js to other back-end frameworks like Python or Java Spring, Node.js is written in JavaScript making it an ideal use case for the project. It has a large online community, enables working with RESTful APIs more easily, is secure, and supports extensive libraries and frameworks like Express.js.
- <strong>Express.js:</strong> Express.js is built on top of Node.js and provides a minimal and flexible framework without unnecessary features for building robust, RESTful APIs. The key feature of Express.js that makes it a standout amongst other frameworks is the support for Middleware. This can be used to perform tasks like error handling, authentication, logging, database connections (in our case, Mongoose), etc. It also has a powerful routing system that makes it easier to create HTTP routes for different URLs and you can handle each type of request separately with a feature to create parametrized URLs, enabling the creation of dynamic routes. What makes it the best choice for this project is the easy connection with databases, such as MongoDB that allowed us to get our database set up pretty quickly without much boilerplate code compared to frameworks like Django or Ruby on Rails.

### Database:
- <strong>MongoDB:</strong> We chose MongoDB as the NoSQL for this project due to its ability to create multiple flexible documents that allow easy storage and access of data, as well as support for fast and scalable access for different types of data. In our case, we had multiple schemas that we needed to store data for such as users, watchlists, movies, reviews, etc. and MongoDB allowed us to create separate clusters for each schema which was very useful. Compared to SQL databases like MySQL or PostgreSQL, MongoDB provides more flexibility for handling diverse data types and complicated relationships that relational databases find difficult to manage. We used Mongoose as our ODM as it easily integrates with Express.js and Node.js and does not require any boilerplate code except for the package installation.

### API Integration:  
- <strong>Axios:</strong> We used Axios as the promise-based HTTP client to make requests to both external, third-party APIs as well as to our backend servers. The simplicity and ease of use and the minimal setup helped in rapid and efficient development while also providing useful error handling and authentication facilities for asynchronous requests. The main benefit of Axios is that it allows for cleaner code by handling request and response parameter transformations in the promise itself without having to wait for the promise to be resolved or rejected. Compared to native HTTP clients like Fetch, Axios provides a more feature-rich and developer-friendly interface to work with.
- <strong>TMDB API:</strong> We integrated the TMDb (The Movie Database) API to fetch detailed movie information, ensuring that our users have access to the latest and most accurate movie data. This API provides a variety of REST endpoints for fetching comprehensive movie details such as the revenue earned by the movie, the cast featured in it, the average rating it has got from users worldwide, etc., enhancing the app's functionality and user experience compared to other movie databases.

### Security in authentication:  
- <strong>BCrypt:</strong> We implemented secure authentication of passwords using BCrypt. BCrypt is designed to be computationally intensive, making it resistant to brute-force attacks. Its salt functionality adds an extra layer of security by ensuring that identical passwords have different hashes. Also using this module ensures that users can rest assured that the developers of the website don't have any knowledge of sensitive user information like their passwords as they are end-to-end encrypted.  Compared to simpler hashing algorithms like MD5 or SHA-1, BCrypt offers enhanced security suitable for modern applications.

## Team Members

- Adwait Kulkarni: I run marathons!
- Dominic Lo: I play the piano and Switch!
- Patrick Liang: I like good weather!
- Subhrodeep Ghose: I like to sleep!

## Images

![20240521_184458](https://github.com/ubc-cpsc455-2024S/project-11_movie_mavericks/assets/65598707/9ad5c817-1708-44f0-b4f6-9487cc8644ae)
![20240521_185058](https://github.com/ubc-cpsc455-2024S/project-11_movie_mavericks/assets/65598707/596fe799-ded0-4124-8d34-0c732aaeb443)

## References


{Add your stuff here}
