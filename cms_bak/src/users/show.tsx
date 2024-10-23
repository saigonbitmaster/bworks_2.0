import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  useRecordContext,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import Grid from "@mui/material/Grid";

export const ShowScreen = () => (
  <Show>
    <SimpleShowLayout>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextField source="fullName" />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Username: </span>
          <TextField source="username" label="username" />
        </Grid>

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Email: </span>
          <TextField source="email" />
        </Grid>

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Contact: </span>
          <TextField source="contact" />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <span>Work skills: </span>
          <ReferenceArrayField
            reference="skills"
            source="skills"
            sx={{ mt: 1 }}
          >
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <RichTextField source="description" />
        </Grid>
      </Grid>

      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
);
