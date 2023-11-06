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
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import ButtonBase from "@mui/material/ButtonBase";
import { useDataProvider, useNotify } from "react-admin";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useRedirect } from "react-admin";
import lodash from "lodash";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");
  const redirect = useRedirect();
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
    const { password } = data;
    dataProvider
      .customMethod(
        `auth/resetpwd?access_token=${access_token}`,
        { data: { password } },
        "POST"
      )
      .then((result) => {
        /*trick for Unauthorized as data provider is not handle it properly
        401 is not cached at custom method.
        */

        if (lodash.isEmpty(result.result)) {
          notify("Unauthorized access, please try proper access", {
            type: "warning",
          });
          return;
        }
        notify("Password is changed, please login with the new one", {
          type: "success",
        });
        setTimeout(() => {
          redirect("/login");
        }, 5000);
      })
      .catch((error) => {
        notify(error.message, { type: "warning" });
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword(!showRepeatPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //prevent copy/paste

  const preventCopyPaste = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: "10em",
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
            sx={{ m: 1, width: 460, textAlign: "center", fontWeight: "bold" }}
          >
            RESET YOUR PASSWORD
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
            <FormControl sx={{ m: 1, width: 220 }} variant="standard">
              <InputLabel>New password *</InputLabel>
              <Input
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password must be min 8 letters, with at least a symbol, upper and lower case letters and a number",
                  },
                  required: true,
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
            <FormControl sx={{ m: 1, width: 220 }} variant="standard">
              <InputLabel>Repeat new password *</InputLabel>
              <Input
                {...register("repeatPassword", {
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Your passwords do not match";
                    }
                  },
                  required: true,
                })}
                onCut={preventCopyPaste}
                onCopy={preventCopyPaste}
                onPaste={preventCopyPaste}
                type={showRepeatPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

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
            sx={{ m: 1, width: 460, color: "#ff9800" }}
          >
            {errors.password?.type === "required" && "Password is required."}{" "}
            {errors.password?.type === "pattern" &&
              `${errors.password?.message}.`}{" "}
            {errors.repeatPassword?.type === "validate" &&
              `${errors.repeatPassword?.message}.`}{" "}
          </Typography>
        </Box>
      </Box>
    </form>
  );
}
