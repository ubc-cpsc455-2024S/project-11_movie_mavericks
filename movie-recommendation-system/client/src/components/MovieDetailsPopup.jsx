import React, { useEffect, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';

const MovieDetailsPopup = ({ tmbd_movie_id, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${tmdb_movie_id}`,
        params: {
          language: 'en-US'
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzFmZDAwNzJjNzUwNWIyZDRkMDYwMTMwYjJlN2QxNSIsInN1YiI6IjY2NTY3NGM4NDQzMTEyYzc1OTUxMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uhn4peiHp_lezXQfUV5z10QcDfXBdWQkrrcH9qT48S4'
        }
      };

      try {
        const response = await axios.request(options);
        setMovieDetails(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [tmdb_movie_id]);

  // useEffect(() => {
  //   // mock data
  //   const mockData = {
  //     adult: false,
  //     backdrop_path: "/coATv42PoiLqAFKStJiMZs2r6Zb.jpg",
  //     belongs_to_collection: {
  //       id: 1022790,
  //       name: "Inside Out Collection",
  //       poster_path: "/Apr19lGxP7gm6y2HQX0kqOXTtqC.jpg",
  //       backdrop_path: "/7U2m2dMSIfHx2gWXKq78Xj1weuH.jpg"
  //     },
  //     budget: 200000000,
  //     genres: [
  //       { id: 16, name: "Animation" },
  //       { id: 10751, name: "Family" },
  //       { id: 18, name: "Drama" },
  //       { id: 12, name: "Adventure" },
  //       { id: 35, name: "Comedy" }
  //     ],
  //     homepage: "https://movies.disney.com/inside-out-2",
  //     id: 1022789,
  //     imdb_id: "tt22022452",
  //     origin_country: ["US"],
  //     original_language: "en",
  //     original_title: "Inside Out 2",
  //     overview: "Teenager Riley’s mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
  //     popularity: 9750.804,
  //     poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
  //     production_companies: [
  //       { id: 3, logo_path: "/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png", name: "Pixar", origin_country: "US" },
  //       { id: 2, logo_path: "/wdrCwmRnLFJhEoH8GSfymY85KHT.png", name: "Walt Disney Pictures", origin_country: "US" }
  //     ],
  //     production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
  //     release_date: "2024-06-11",
  //     revenue: 295800000,
  //     runtime: 97,
  //     spoken_languages: [{ english_name: "English", iso_639_1: "en", name: "English" }],
  //     status: "Released",
  //     tagline: "Make room for new emotions.",
  //     title: "Inside Out 2",
  //     video: false,
  //     vote_average: 7.877,
  //     vote_count: 252
  //   };

  //   setMovieDetails(mockData);
  //   setLoading(false);
  // }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography>Error fetching movie details: {error.message}</Typography>
      </Box>
    );
  }

  const {
    original_title,
    poster_path,
    vote_average,
    vote_count,
    overview,
    runtime,
    release_date,
    revenue,
    adult,
    genres,
    production_companies
  } = movieDetails;

  return (
    <>
      <DialogTitle>{original_title}</DialogTitle>
      <DialogContent dividers>
        {poster_path && (
          <Box display="flex" justifyContent="center">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={original_title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        )}
        <Box display="flex" alignItems="center" mt={2}>
          <Rating
            value={Math.floor(vote_average / 2)}
            precision={0.1}
            readOnly
          />
          <Typography variant="body2" ml={1}>
            ({vote_count} votes)
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          {overview}
        </Typography>
        <Typography variant="body2">
          <strong>Runtime:</strong> {runtime} minutes
        </Typography>
        <Typography variant="body2">
          <strong>Release Date:</strong> {release_date}
        </Typography>
        <Typography variant="body2">
          <strong>Revenue:</strong> ${revenue.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Adult:</strong> {adult ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body2">
          <strong>Genres:</strong> {genres.map((genre) => genre.name).join(', ')}
        </Typography>
        <Typography variant="body2">
          <strong>Production Companies:</strong> {production_companies.map((company) => company.name).join(', ')}
        </Typography>
        {movieData.reviews && (
          <>
            <Typography variant="h6" mt={2}>
              Reviews
            </Typography>
            <List>
              {movieData.reviews.map((review, index) => (
                <ListItem key={index}>
                  <ListItemText primary={review} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>
    </>
  );
};

export default MovieDetailsPopup;
