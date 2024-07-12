import React from "react";
import { useForm } from "react-hook-form";
import { languages } from "../config/languages";
import { regions } from "../config/regions";
import { genres } from "../config/genre";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRecommendation } from "../features/recommendationsSlice";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data)

    const currentYear = new Date().getFullYear();
    switch (data.dateRange) {
      case "last3years":
        data.startYear = `${currentYear - 3}-01-01`;
        break;
      case "last5years":
        data.startYear = `${currentYear - 5}-01-01`;
        break;
      case "last10years":
        data.startYear = `${currentYear - 10}-01-01`;
        break;
      case "nopreference":
        data.startYear = "";
        break;
      default:
        break;
    }

    const baseUrl = 'https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc' // TODO: currently sort by popularity
    const language = data["language"] != "all" ? "&with_original_language=" + data["language"] : ""
    const region = data["region"] != "all" ? "&with_origin_country=" + data["region"] : ""
    const genre = data["genre"] != "all" ? "&with_genres=" + data["genre"] : ""
    const releaseAfter = data["startYear"] != "" ? "&primary_release_date.gte=" + data["startYear"] : ""
    const url = baseUrl + language + region + genre + releaseAfter 
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzFmZDAwNzJjNzUwNWIyZDRkMDYwMTMwYjJlN2QxNSIsInN1YiI6IjY2NTY3NGM4NDQzMTEyYzc1OTUxMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uhn4peiHp_lezXQfUV5z10QcDfXBdWQkrrcH9qT48S4'
      }
    };
    console.log(url)
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log(responseJson);
    const numRecommendation = Math.min(8, responseJson["results"].length);
    for (let i = 0; i < numRecommendation; i++) {
      dispatch(addRecommendation(responseJson["results"][i]))
    }
    navigate("/recommendation")
  };
  const clearFields = () => {
    reset();
  };

  return (
    <>
      <div>
        <h1 style={{ color: "yellow" }}>Fill out your preferences!</h1>
      </div>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Please enter your preferred language:</label>
          <select defaultValue="" {...register("language", { required: true })}>
            <option disabled value="">Choose a language...</option>
            <option value="all">All</option>
            {languages.map(lang => <option key={lang["iso_639_1"]} value={lang["iso_639_1"]}>{lang["english_name"]}</option>)}
          </select>
          {errors.language && <span>This field is required</span>}
        </div>

        <div>
          <label>Please enter your preferred region:</label>
          <select defaultValue="" {...register("region", { required: true })}>
            <option disabled value="">Choose a region...</option>
            <option value="all">All</option>
            {regions.map(region => <option key={region["iso_3166_1"]} value={region["iso_3166_1"]}>{region["english_name"]}</option>)}
          </select>
          {errors.region && <span>This field is required</span>}
        </div>

        <div>
          <label>Please select your favorite genre:</label>
          <select defaultValue="" {...register("genre", { required: true })}>
            <option disabled value="">Choose a genre...</option>
            <option value="all">All</option>
            {genres.map(genre => <option key={genre["id"]} value={genre["id"]}>{genre["name"]}</option>)}
          </select>
          {errors.genre && <span>This field is required</span>}
        </div>

        <div>
          <label>Select date range:</label>
          <select {...register("dateRange", { required: true })}>
            <option value="nopreference">No Preference</option>
            <option value="last3years">Last 3 Years</option>
            <option value="last5years">Last 5 Years</option>
            <option value="last10years">Last 10 Years</option>
          </select>
          {errors.dateRange && <span>This field is required</span>}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={clearFields}>
          Clear Fields
        </button>
      </form>
    </>
  );
}
