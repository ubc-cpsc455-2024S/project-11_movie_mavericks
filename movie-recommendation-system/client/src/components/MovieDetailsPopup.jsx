import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const MovieDetailsPopup = ({ tmdb_movie_id, onClose }) => {
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
        {tmdb_movie_id.reviews && (
          <>
            <Typography variant="h6" mt={2}>
              Reviews
            </Typography>
            <List>
              {tmdb_movie_id.reviews.map((review, index) => (
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
