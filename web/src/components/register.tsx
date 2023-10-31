import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import { useForm } from "react-hook-form";
import ButtonBase from "@mui/material/ButtonBase";
import { useDataProvider, useNotify } from "react-admin";
import { Link } from "react-router-dom";

export default function Register() {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const { agreedTerms, ...rest } = data;
    dataProvider
      .customMethod("auth/register", { data: { ...rest } }, "POST")
      .then((result) => {
        notify(
          "Submit successfully, please check your mail to verify your account",
          { type: "success" }
        );
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message, { type: "warning" });
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
            sx={{ m: 1, width: 500, textAlign: "center", fontWeight: "bold" }}
          >
            Register new account
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FormControl sx={{ m: 1, width: 240 }} variant="standard">
              <InputLabel>Username *</InputLabel>
              <Input
                {...register("username", {
                  required: true,
                  maxLength: {
                    value: 20,
                    message: "Username should lesser than 20 words",
                  },
                })}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 240 }} variant="standard">
              <InputLabel>Email *</InputLabel>
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
          </Box>
          <FormControl sx={{ m: 1, width: 500 }} variant="standard">
            <InputLabel>Full name *</InputLabel>
            <Input
              type="text"
              {...register("fullName", {
                required: true,
                maxLength: {
                  value: 30,
                  message: "Full name should lesser than 30 words",
                },
              })}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="standard">
            <InputLabel>Cardano wallet address</InputLabel>
            <Input
              type="text"
              {...register("walletAddress", { maxLength: 300 })}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="standard">
            <InputLabel>GitHub</InputLabel>
            <Input
              type="text"
              {...register("gitLink", {
                pattern: {
                  value:
                    /^(http|https):\/\/(.*)(github.com|gitlab.com)\/([A-Za-z0-9-_]+)/,
                  message: "GitHub must be a github or gitlab url",
                },
              })}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: 500 }} variant="standard">
            <InputLabel>Available hours to work per month</InputLabel>
            <Input
              type="number"
              {...register("workHoursPerMonth", {
                min: {
                  value: 10,
                  message: "Work hours per month should greater than 10 hour",
                },
                max: {
                  value: 720,
                  message: "Work hours per month should lesser than 720 hours",
                },
              })}
            />
          </FormControl>
          <FormLabel component="legend" sx={{ m: 1, width: 500, pb: 0, mb: 0 }}>
            User roles
          </FormLabel>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox defaultChecked {...register("isEmployer", {})} />
              }
              label="Employer"
              sx={{ m: 1, mt: 0, pt: 0, width: 240 }}
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked {...register("isJobSeeker", {})} />
              }
              label="Job seeker"
              sx={{ m: 1, mt: 0, pt: 0, width: 240 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FormControl sx={{ m: 1, width: 240 }} variant="standard">
              <InputLabel>Password *</InputLabel>
              <Input
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password must be min 8 letters, with at least a symbol, upper and lower case letters and a number",
                  },
                })}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 240 }} variant="standard">
              <InputLabel>Repeat password *</InputLabel>
              <Input
                {...register("repeatPassword", {
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Your passwords do not match";
                    }
                  },
                })}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ m: 1, width: 500 }}
          >
            <strong> Terms of Use </strong> <br />
            1. bWorks may scan your github link to asset your abilities in order
            to suggest you best matching jobs. <br />
            2. Your wallet address is shared among other users within the
            system.
          </Typography>

          <FormControlLabel
            control={
              <Checkbox {...register("termsAgreed", { required: true })} />
            }
            label="Agree with terms"
            sx={{ m: 1, width: 240 }}
          />

          <Box>
            <br />
          </Box>
          <ButtonBase
            sx={{
              mr: 1,
              alignSelf: "flex-end",
              color: "#03a9f4",
              mb: 1,
            }}
            component={Link}
            to="/"
          >
            Back bWorks
          </ButtonBase>
          <Button variant="outlined" type="submit">
            SUBMIT
          </Button>
          <Typography
            variant="caption"
            display="block"
            sx={{ m: 1, width: 500, color: "#ff9800" }}
          >
            {errors.username?.type === "required" && "Username is required."}{" "}
            {errors.email?.type === "required" && "Email is required."}{" "}
            {errors.fullName?.type === "required" && "Full name is required."}{" "}
            {errors.password?.type === "required" && "Password is required."}{" "}
            {errors.gitLink?.type === "pattern" &&
              `${errors.gitLink?.message}.`}{" "}
            {errors.password?.type === "pattern" &&
              `${errors.password?.message}.`}{" "}
            {errors.workHoursPerMonth?.type === "min" &&
              `${errors.workHoursPerMonth?.message}.`}{" "}
            {errors.workHoursPerMonth?.type === "max" &&
              `${errors.workHoursPerMonth?.message}.`}{" "}
            {errors.username?.type === "maxLength" &&
              `${errors.username?.message}.`}{" "}
            {errors.fullName?.type === "maxLength" &&
              `${errors.fullName?.message}.`}{" "}
            {errors.repeatPassword?.type === "validate" &&
              `${errors.repeatPassword?.message}.`}{" "}
            {errors.termsAgreed?.type === "required" &&
              Object.keys(errors).length === 1 &&
              "You must agree with the terms."}{" "}
          </Typography>
        </Box>
      </Box>
    </form>
  );
}
