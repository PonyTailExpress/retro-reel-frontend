import React from "react";
import "./AboutPage.css";

const imgURL = "https://c.tenor.com/ALyNaaBlqhQAAAAC/tenor.gif";

const AboutPage: React.FC = () => {
  return (
    <div className="about-us-container">
      <section className="mission">
        <h1>Our Mission</h1>
        <p>
          Our mission is simple: to bring the most iconic films of the 80s and
          90s back to life by providing an easy-to-use platform for movie lovers
          to rediscover, save, and explore the best films from these
          unforgettable decades. With Retro Reel, you'll never lose track of
          your favorite classics.
        </p>
      </section>

      <h1>About Retro Reel</h1>
      <p>
        Welcome to Retro Reel! The ultimate app designed for film lovers who
        want to experience and explore the timeless classics from the 80s and
        90s. Whether it’s an action-packed blockbuster, a heartwarming drama, or
        a cult classic, Retro Reel allows you to search, discover, and save all
        your favorite films from these iconic decades. Our goal is to preserve
        the magic of 80s and 90s cinema while giving you the ability to easily
        find, organize, and explore these unforgettable films at your
        fingertips.
      </p>

      <section className="my-story">
        <h1>The Story</h1>
        <p>
          It all started on a lazy afternoon, while reminiscing about the
          countless classics I grew up watching in the 80s and 90s. I realized
          there wasn’t a simple, organized place to search for and store all
          these amazing films. And so, Retro Reel was born—a platform to help
          film enthusiasts rediscover, enjoy, and keep track of their favorite
          films from these legendary decades. After many nights of coding and
          watching old movies, we created a space where fans of retro cinema
          could come together and relive the magic of the past.
        </p>
      </section>

      <img src={imgURL} alt="retro-reel-gif" />
    </div>
  );
};

export default AboutPage;
