import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeMovieFromWatchlist } from "../features/userSlice";

export default function Watchlists() {
  const [watchlists, setWatchlists] = useState([]);
  const userID = useSelector((state) => state.user.user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/watchlists/${userID}`
        );
        const watchlists = await Promise.all(
          response.data.map(async (watchlist) => {
            const movies = await Promise.all(
              watchlist.movies.map(async (movieID) => {
                const movieResponse = await axios.get(
                  `https://api.themoviedb.org/3/movie/${movieID}`,
                  {
                    params: { language: "en-US" },
                    headers: {
                      accept: "application/json",
                      Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzFmZDAwNzJjNzUwNWIyZDRkMDYwMTMwYjJlN2QxNSIsInN1YiI6IjY2NTY3NGM4NDQzMTEyYzc1OTUxMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uhn4peiHp_lezXQfUV5z10QcDfXBdWQkrrcH9qT48S4",
                    },
                  }
                );
                return movieResponse.data;
              })
            );
            return { ...watchlist, movies };
          })
        );
        setWatchlists(watchlists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWatchlists();
  }, [userID]);

  const handleRemoveMovie = async (watchlistID, movieID) => {
    try {
      await axios.delete(
        `http://localhost:3000/watchlists/${watchlistID}/movies/${movieID}`
      );
      dispatch(removeMovieFromWatchlist({ watchlistID, movieID }));
      setWatchlists(
        watchlists.map((watchlist) => {
          if (watchlist._id === watchlistID) {
            return {
              ...watchlist,
              movies: watchlist.movies.filter((movie) => movie.id !== movieID),
            };
          }
          return watchlist;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {watchlists.map((watchlist) => (
        <Card key={watchlist._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{watchlist.name}</Typography>
            {watchlist.movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Typography variant="body1" style={{ marginRight: 50 }}>{movie.title}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  style={{
                    marginLeft: 50,
                    width: 100,
                    marginBottom: 15,
                    marginTop: 15,
                  }}
                  onClick={() => handleRemoveMovie(watchlist._id, movie.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
