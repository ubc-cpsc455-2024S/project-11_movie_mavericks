import React, { useState } from "react";
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
		formState: { errors, isValid },
		reset,
	} = useForm({ mode: "onChange" }); // Enable onChange mode to check validity dynamically
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

	const onSubmit = async (data) => {
		setIsSubmitting(true); // Set submitting state to true
		console.log(data);

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

		const baseUrl =
			"https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc"; // TODO: currently sort by popularity
		const language =
			data["language"] !== "all"
				? "&with_original_language=" + data["language"]
				: "";
		const region =
			data["region"] !== "all" ? "&with_origin_country=" + data["region"] : "";
		const genre =
			data["genre"] !== "all" ? "&with_genres=" + data["genre"] : "";
		const releaseAfter =
			data["startYear"] !== ""
				? "&primary_release_date.gte=" + data["startYear"]
				: "";
		const url = baseUrl + language + region + genre + releaseAfter;
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzFmZDAwNzJjNzUwNWIyZDRkMDYwMTMwYjJlN2QxNSIsInN1YiI6IjY2NTY3NGM4NDQzMTEyYzc1OTUxMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uhn4peiHp_lezXQfUV5z10QcDfXBdWQkrrcH9qT48S4",
			},
		};
		console.log(url);
		const response = await fetch(url, options);
		const responseJson = await response.json();
		console.log(responseJson);
		const numRecommendation = Math.min(8, responseJson["results"].length);
		for (let i = 0; i < numRecommendation; i++) {
			dispatch(addRecommendation(responseJson["results"][i]));
		}
		navigate("/recommendation");
		setIsSubmitting(false);
	};
	const clearFields = () => {
		reset();
	};

	return (
		<div
			style={{
				backgroundColor: "#1b1b1b",
				minHeight: "100vh",
				padding: "20px",
			}}
		>
			<div>
				<h1 style={{ color: "white" }}>Discover movies!</h1>
			</div>
			<form
				id="form"
				onSubmit={handleSubmit(onSubmit)}
				style={{
					backgroundColor: "#1b1b1b",
					padding: "20px",
					borderRadius: "8px",
				}}
			>
				<div style={{ marginBottom: "20px" }}>
					<label style={{ color: "white" }}></label>
					<select
						defaultValue=""
						{...register("language", { required: true })}
						style={{
							backgroundColor: "#292929",
							borderRadius: "8px",
							color: "white",
							padding: "8px",
							width: "calc(100% - 16px)",
							margin: "auto",
							display: "block",
							marginBottom: "10px",
						}}
					>
						<option disabled value="">
							Language *
						</option>
						<option value="all">All</option>
						{languages.map((lang) => (
							<option key={lang["iso_639_1"]} value={lang["iso_639_1"]}>
								{lang["english_name"]}
							</option>
						))}
					</select>
					{errors.language && (
						<span style={{ color: "red" }}>This field is required</span>
					)}
				</div>

				<div style={{ marginBottom: "20px" }}>
					<label style={{ color: "white" }}></label>
					<select
						defaultValue=""
						{...register("region", { required: true })}
						style={{
							backgroundColor: "#292929",
							borderRadius: "8px",
							color: "white",
							padding: "8px",
							width: "calc(100% - 16px)",
							margin: "auto",
							display: "block",
							marginBottom: "10px",
						}}
					>
						<option disabled value="">
							Region *
						</option>
						<option value="all">All</option>
						{regions.map((region) => (
							<option key={region["iso_3166_1"]} value={region["iso_3166_1"]}>
								{region["english_name"]}
							</option>
						))}
					</select>
					{errors.region && (
						<span style={{ color: "red" }}>This field is required</span>
					)}
				</div>

				<div style={{ marginBottom: "20px" }}>
					<label style={{ color: "white" }}> </label>
					<select
						defaultValue=""
						{...register("genre", { required: true })}
						style={{
							backgroundColor: "#292929",
							borderRadius: "8px",
							color: "white",
							padding: "8px",
							width: "calc(100% - 16px)",
							margin: "auto",
							display: "block",
							marginBottom: "10px",
						}}
					>
						<option disabled value="">
							Genre *
						</option>
						<option value="all">All</option>
						{genres.map((genre) => (
							<option key={genre["id"]} value={genre["id"]}>
								{genre["name"]}
							</option>
						))}
					</select>
					{errors.genre && (
						<span style={{ color: "red" }}>This field is required</span>
					)}
				</div>

				<div style={{ marginBottom: "20px" }}>
					<label style={{ color: "white" }}></label>
					<select
						{...register("dateRange", { required: true })}
						style={{
							backgroundColor: "#292929",
							borderRadius: "8px",
							color: "white",
							padding: "8px",
							width: "calc(100% - 16px)",
							margin: "auto",
							display: "block",
							marginBottom: "10px",
						}}
					>
						<option value="nopreference">Date Preference *</option>
						<option value="last3years">Last 3 Years</option>
						<option value="last5years">Last 5 Years</option>
						<option value="last10years">Last 10 Years</option>
					</select>
					{errors.dateRange && (
						<span style={{ color: "red" }}>This field is required</span>
					)}
				</div>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<button
						type="button"
						onClick={clearFields}
						style={{
							backgroundColor: "#292929",
							border: "1px solid white",
							borderRadius: "8px",
							color: "white",
							padding: "8px 16px",
							cursor: "pointer",
						}}
					>
						Clear Fields
					</button>
					<button
						type="submit"
						style={{
							backgroundColor: isValid ? "#ffa31a" : "#292929",
							border: "1px solid white",
							borderRadius: "8px",
							color: isValid ? "black" : "white",
							padding: "8px 16px",
							cursor: "pointer",
						}}
						disabled={!isValid || isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
}
