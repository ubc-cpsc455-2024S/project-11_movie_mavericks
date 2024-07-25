import React from "react";

const About = () => {
  return (
    <div style={{ paddingTop: "50px" }}>
      <main style={{ color: "white", margin: "2em 4em" }}>
        <section id="about-me">
          <h1 style={{ color: "yellow" }}>
            Welcome to MovieHub!
          </h1>
          <h2
            style={{ color: "yellow", textAlign: "center", fontSize: "2.3em" }}
          >
            Who is this project for?
          </h2>
          <p
            style={{
              fontSize: "1.5em",
              textAlign: "center",
              lineHeight: "50px",
            }}
          >
            This is your personal guide to discovering your next favorite
            movies! Whether you are a beginner movie watcher or an avid
            cinephile, this system will help you find the perfect movie to
            watch. Whether you love action-packed thrillers, heartwarming
            dramas, or intriguing documentaries, our system is here to help you
            find movies you'll love. So, sit back, relax, and let MovieHub do the work for you!
          </p>
        </section>
        <hr />
        <section id="project">
          <h2
            style={{ color: "yellow", textAlign: "center", fontSize: "2.3em" }}
          >
            What does it do?
          </h2>
          <p
            style={{
              fontSize: "1.5em",
              textAlign: "center",
              lineHeight: "50px",
            }}
          >
            This system will first ask you for your preferences to get an idea
            of what type of movies you like and are in the mood to watch. Simply
            fill out a form with your preferred language, favorite genre, and
            other relevant details, and we'll provide you with tailored movie
            suggestions. Our recommendations are curated using a well-known API,
            ensuring you get the best picks suited to your taste.
          </p>
        </section>
        <hr />
        <section id="use">
          <h2
            style={{ color: "yellow", textAlign: "center", fontSize: "2.3em" }}
          >
            What data does it store and what can you do with this data?
          </h2>
          <p
            style={{
              fontSize: "1.5em",
              textAlign: "center",
              lineHeight: "50px",
            }}
          >
            Users can select and set their movie preferences through an
            easy-to-use form. Based on your preferences, our system generates
            personalized movie recommendations. Additionally, you can view
            high-level information about each recommended movie, in a
            user-friendly way, such as the poster and synopsis, helping you
            decide what to watch next.
          </p>
        </section>
        <hr />
        <section id="functionality">
          <h2
            style={{ color: "yellow", textAlign: "center", fontSize: "2.3em" }}
          >
            Any additional functionality in store for the future?
          </h2>
          <p
            style={{
              fontSize: "1.5em",
              textAlign: "center",
              lineHeight: "50px",
            }}
          >
            Depending on time constraints and user feedback, we plan to expand
            our system to include TV show recommendations, transforming it into
            from a Movie Recommendation System to a Content Recommendation
            System. This way, you'll get the best of both worlds – movies and TV
            shows tailored to your taste. We also plan on providing more inputs
            to the user to choose from that will help in providing more accurate
            recommendations.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
