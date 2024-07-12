import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeMovieFromWatchlist } from "../features/userSlice";
import ShareIcon from "@mui/icons-material/Share";

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

  const handleShare = async (platform, movie) => {
    const text = encodeURIComponent(
      "Check out this cool movie I just watched! It's called: " + movie.title
    );
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${text}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&title=${text}`,
        "_blank"
      );
    }
  };

  const handleDelete = async (watchlistID) => {
    try {
      await axios.delete(`http://localhost:3000/watchlists/${watchlistID}`);
      setWatchlists(
        watchlists.filter((watchlist) => watchlist._id !== watchlistID)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {watchlists.map((watchlist) => (
        <Card
          key={watchlist._id}
          sx={{ marginBottom: 2, backgroundColor: "#F9D689", borderRadius: 10 }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 1,
                marginTop: 1,
                marginLeft: 1,
                marginRight: 1,
                fontWeight: "bold",
              }}
            >
              {watchlist.name}
            </Typography>
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
                <Typography
                  variant="body1"
                  style={{
                    marginRight: 50,
                    marginLeft: 5,
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 20,
                    textAlign: "left",
                    textDecoration: "underline",
                    textDecorationColor: "black",
                    textDecorationStyle: "solid",
                    textDecorationThickness: "5px",
                    textDecorationSkip: "none",
                    textDecorationSkipInk: "none",
                  }}
                >
                  {movie.title}
                </Typography>
                <Button
                  onClick={() => handleShare("twitter", movie)}
                  sx={{ mr: 1, fontWeight: "bold", fontSize: 15 }}
                >
                  <ShareIcon /> Twitter
                </Button>
                <Button
                  onClick={() => handleShare("facebook", movie)}
                  sx={{ mr: 1, fontWeight: "bold", fontSize: 15 }}
                >
                  <ShareIcon /> Facebook
                </Button>
                <Button
                  onClick={() => handleShare("linkedin", movie)}
                  sx={{ mr: 1, fontWeight: "bold", fontSize: 15 }}
                >
                  <ShareIcon /> LinkedIn
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  style={{
                    marginLeft: 50,
                    width: 100,
                    marginBottom: 15,
                    marginTop: 15,
                    borderRadius: 20,
                  }}
                  onClick={() => handleRemoveMovie(watchlist._id, movie.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(watchlist._id)}
            sx={{
              marginBottom: 3,
              padding: 1,
              fontSize: 15,
              fontWeight: "bold",
              borderRadius: 20,
            }}
          >
            Delete Watchlist
          </Button>
        </Card>
      ))}
    </div>
  );
}
