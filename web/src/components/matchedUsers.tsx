import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReferenceField, TextField } from "react-admin";
import Rating from "@mui/material/Rating";

export default function MatchUsers(props) {
  const matchUsers = props.matchUsers || [];
  if (matchUsers.length === 0)
    return (
      <Typography variant="caption" gutterBottom color="primary.alert">
        <strong> No matched users </strong>
      </Typography>
    );
  return (
    <>
      <Typography variant="caption" gutterBottom>
        <strong> Matched users </strong>
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {matchUsers.map((item) => (
          <Box sx={{ display: "flex", flexDirection: "column", mr: 1 }}>
            <ReferenceField
              reference="users"
              source="userId"
              record={item}
              link={"show"}
            >
              <TextField source="fullName" />
            </ReferenceField>
            <Rating name="read-only" value={item.matchRate} readOnly />
          </Box>
        ))}
      </Box>
    </>
  );
}
