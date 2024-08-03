import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Button } from "@mui/material";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		handleSubmit,
		formState: { errors, isValid },
		reset,
		control,
	} = useForm({ mode: "onChange" });

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"https://project-11-movie-mavericks.onrender.com/users/login",
				data
			);

			if (typeof response.data === "string") {
				alert(response.data);
				return;
			}

			dispatch(login(response.data));
			navigate("/account");
		} catch (error) {
			alert(error.response.data.msg);
		}
	};

	const clearFields = () => {
		reset();
	};

	return (
		<div
			style={{
				backgroundColor: "#1b1b1b",
				margin: "20px",
			}}
		>
			<div>
				<h1 style={{ color: "white" }}>Login</h1>
				<h4 style={{ color: "white" }}>or register a new account</h4>
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
				<FormControl fullWidth variant="standard" required margin="normal">
					<Controller
						name="username"
						control={control}
						defaultValue=""
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Username"
								variant="standard"
								InputLabelProps={{
									shrink: field.value.length > 0,
									style: { color: "white", transform: "translateX(12px)" },
								}}
								InputProps={{
									style: { color: "white" },
									sx: {
										"&:before": {
											borderBottomColor: "white",
										},
										"&:after": {
											borderBottomColor: "white",
										},
										"&:hover:not(.Mui-disabled):before": {
											borderBottomColor: "white",
										},
									},
								}}
								error={!!errors.username}
								helperText={errors.username ? "This field is required" : ""}
								sx={{
									"& .MuiInputBase-root": {
										marginTop: "10px",
									},
								}}
							/>
						)}
					/>
				</FormControl>

				<FormControl fullWidth variant="standard" required margin="normal">
					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{ required: true, minLength: 8 }}
						render={({ field }) => (
							<TextField
								{...field}
								type="password"
								label="Password"
								variant="standard"
								InputLabelProps={{
									shrink: field.value.length > 0,
									style: { color: "white", transform: "translateX(12px)" },
								}}
								InputProps={{
									style: { color: "white" },
									sx: {
										"&:before": {
											borderBottomColor: "white",
										},
										"&:after": {
											borderBottomColor: "white",
										},
										"&:hover:not(.Mui-disabled):before": {
											borderBottomColor: "white",
										},
									},
								}}
								error={!!errors.password}
								helperText={
									errors.password
										? "Password must be at least 8 characters long."
										: ""
								}
								sx={{
									"& .MuiInputBase-root": {
										marginTop: "10px",
									},
								}}
							/>
						)}
					/>
				</FormControl>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						paddingTop: "20px",
					}}
				>
					<Button
						variant="contained"
						onClick={clearFields}
						style={{
							backgroundColor: "#292929",
							color: "white",
							textTransform: "none",
							border: "1px solid white",
						}}
					>
						Clear Fields
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={!isValid}
						style={{
							backgroundColor: isValid ? "#37B7C3" : "#292929",
							color: isValid ? "black" : "white",
							textTransform: "none",
							marginLeft: "10px",
						}}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Login;
