import React from "react";
import { useForm } from "react-hook-form";
import { languages } from "../config/languages";
import { regions } from "../config/regions";
import { genres } from "../config/genre";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => {
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

    console.log(data);
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

        <div>
          <label>
            Do you wish to be displayed adult movies? 
            <input type="checkbox" 
            style={{ width: "40px", height: "40px" }}
            {...register("isAdult")} />
          </label>
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={clearFields}>
          Clear Fields
        </button>
      </form>
    </>
  );
}
