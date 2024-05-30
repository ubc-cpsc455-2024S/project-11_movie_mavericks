import React from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
          <label>Please enter your prefered language:</label>
          <select
            placeholder="Choose a Language..."
            {...register("language", { required: true })}
          >
            <option value="">Select Preferred Language</option>
            <option value="AF">Afrikaans</option>
            <option value="SQ">Albanian</option>
            <option value="AR">Arabic</option>
            <option value="HY">Armenian</option>
            <option value="EU">Basque</option>
            <option value="BN">Bengali</option>
            <option value="BG">Bulgarian</option>
            <option value="CA">Catalan</option>
            <option value="KM">Cambodian</option>
            <option value="ZH">Chinese (Mandarin)</option>
            <option value="HR">Croatian</option>
            <option value="CS">Czech</option>
            <option value="DA">Danish</option>
            <option value="NL">Dutch</option>
            <option value="EN">English</option>
            <option value="ET">Estonian</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finnish</option>
            <option value="FR">French</option>
            <option value="KA">Georgian</option>
            <option value="DE">German</option>
            <option value="EL">Greek</option>
            <option value="GU">Gujarati</option>
            <option value="HE">Hebrew</option>
            <option value="HI">Hindi</option>
            <option value="HU">Hungarian</option>
            <option value="IS">Icelandic</option>
            <option value="ID">Indonesian</option>
            <option value="GA">Irish</option>
            <option value="IT">Italian</option>
            <option value="JA">Japanese</option>
            <option value="JW">Javanese</option>
            <option value="KO">Korean</option>
            <option value="LA">Latin</option>
            <option value="LV">Latvian</option>
            <option value="LT">Lithuanian</option>
            <option value="MK">Macedonian</option>
            <option value="MS">Malay</option>
            <option value="ML">Malayalam</option>
            <option value="MT">Maltese</option>
            <option value="MI">Maori</option>
            <option value="MR">Marathi</option>
            <option value="MN">Mongolian</option>
            <option value="NE">Nepali</option>
            <option value="NO">Norwegian</option>
            <option value="FA">Persian</option>
            <option value="PL">Polish</option>
            <option value="PT">Portuguese</option>
            <option value="PA">Punjabi</option>
            <option value="QU">Quechua</option>
            <option value="RO">Romanian</option>
            <option value="RU">Russian</option>
            <option value="SM">Samoan</option>
            <option value="SR">Serbian</option>
            <option value="SK">Slovak</option>
            <option value="SL">Slovenian</option>
            <option value="ES">Spanish</option>
            <option value="SW">Swahili</option>
            <option value="SV">Swedish </option>
            <option value="TA">Tamil</option>
            <option value="TT">Tatar</option>
            <option value="TE">Telugu</option>
            <option value="TH">Thai</option>
            <option value="BO">Tibetan</option>
            <option value="TO">Tonga</option>
            <option value="TR">Turkish</option>
            <option value="UK">Ukrainian</option>
            <option value="UR">Urdu</option>
            <option value="UZ">Uzbek</option>
            <option value="VI">Vietnamese</option>
            <option value="CY">Welsh</option>
            <option value="XH">Xhosa</option>
          </select>
          {errors.preferredLanguage && <span>This field is required</span>}
        </div>

        <div>
          <label>Please select your favorite genre:</label>
          <select {...register("genre", { required: true })}>
            <option value="">Select Favorite Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Biography">Biography</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
            <option value="Musical">Musical</option>
            <option value="Mystery">Mystery</option>
            <option value="Reality">Reality</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Sport">Sport</option>
            <option value="Talk-Show">Talk-Show</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
            <option value="Western">Western</option>
          </select>
          {errors.favoriteGenre && <span>This field is required</span>}
        </div>

        <div>
          <label>Enter your start year:</label>
          <input
            type="month"
            placeholder="Start Year"
            {...register("startYear", { required: true })}
          />
          {errors.startYear && <span>This field is required</span>}
        </div>

        <div>
          <label>Enter your end year:</label>
          <input
            type="month"
            placeholder="End Year"
            {...register("endYear", { required: true })}
          />
          {errors.endYear && <span>This field is required</span>}
        </div>

        <div>
          <label>Do you wish to be displayed adult movies?</label>
          <select {...register("Adult/Non-Adult", { required: true })}>
            <option value="Yes" defaultValue={true}>
              Yes
            </option>
            <option value="No">No</option>
          </select>
          {errors.adultNonAdult && <span>This field is required</span>}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={clearFields}>
          Clear Fields
        </button>
      </form>
    </>
  );
}
