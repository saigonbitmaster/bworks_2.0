import * as React from "react";
import { FC, createElement } from "react";
import { Card, Box, Typography, Divider } from "@mui/material";
import { Link, To } from "react-router-dom";
import { ReactNode } from "react";

import cartouche from "./cartouche.png";
import cartoucheDark from "./cartoucheDark.png";

interface Props {
  icon: FC<any>;
  to: To;
  title?: string;
  subtitle?: string | number;
  children?: ReactNode;
  minHeight?: number;
}

const CardWithIcon = (props: Props) => {
  const { icon, title, subtitle, to, children } = props;

  return (
    // @ts-ignore
    <Card
      sx={{
        minHeight: props.minHeight ? props.minHeight : 52,
        maxHeight: 890,
        display: "flex",
        flexDirection: "column",
        flex: "1",
        "& a": {
          textDecoration: "none",
          color: "inherit",
        },
      }}
    >
      <Link to={to}>
        <Box
          sx={{
            overflow: "inherit",
            padding: "16px",
            background: (theme) =>
              `url(${
                theme.palette.mode === "dark" ? cartoucheDark : cartouche
              }) no-repeat`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& .icon": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "inherit" : "#b2102f",
            },
          }}
        >
          <Box width="3em" className="icon">
            {createElement(icon, { fontSize: "large" })}
          </Box>
          <Box textAlign="right">
            <Typography variant="button">{title}</Typography>
            <Typography variant="body2">{subtitle || " "}</Typography>
          </Box>
        </Box>
      </Link>
      {children && <Divider />}
      {children}
    </Card>
  );
};

export default CardWithIcon;
