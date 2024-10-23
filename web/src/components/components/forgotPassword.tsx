import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import ButtonBase from "@mui/material/ButtonBase";
import { useDataProvider, useNotify } from "react-admin";
import { Link } from "react-router-dom";
import { useRedirect } from "react-admin";

export default function Register() {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email } = data;
    dataProvider
      .customMethod("auth/forgotpwd", { data: { email } }, "POST")
      .then((result) => {
        notify(
          "Submit successfully, please check your mail to reset your password within 05 minutes",
          { type: "success" }
        );
      })
      .catch((error) => {
        notify(error.message, { type: "warning" });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100vh",
          marginTop: "10em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="overline"
            sx={{ m: 1, width: 300, textAlign: "center", fontWeight: "bold" }}
          >
            REQUEST RESET PASSWORD
          </Typography>
          <ButtonBase
            sx={{
              mr: 2,
              alignSelf: "flex-end",
              color: "#c62828",
              mt: 0,
              mb: 0,
            }}
            onClick={() => reset()}
          >
            Clear
          </ButtonBase>
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel>Enter your email to reset password *</InputLabel>
            <Input
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Must be a valid email",
                },
              })}
            />
          </FormControl>
          <ButtonBase
            sx={{
              mr: 1,
              alignSelf: "flex-end",
              color: "#03a9f4",
              mb: 0,
              mt: 1,
            }}
            component={Link}
            to="/"
          >
            Back bWorks
          </ButtonBase>
          <Button variant="outlined" type="submit" sx={{ mt: 1 }}>
            SUBMIT
          </Button>

          <Typography
            variant="caption"
            display="block"
            sx={{ m: 1, width: 300, color: "#ff9800" }}
          >
            {errors.email?.type === "required" && "Email is required."}{" "}
            {errors.email?.type === "pattern" && `${errors.email?.message}.`}{" "}
          </Typography>
        </Box>
      </Box>
    </form>
  );
}
