import { Box, Button, Container, Stack, Typography } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {  useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const routeHandler = (route) => {
    navigate(`${route}`);
  };

  return (
    <Container maxwidth="md" sx={{ mb: 20 }}>
      <Box m={3}>
        {" "}
        <img
          width={"40%"}
          src="https://img.freepik.com/premium-vector/online-sale-purchase-rent-car-isometric-concept-landing-advertising-with-car-laptop-realtor-key-couple-with-credit-card-auto-rental-carpool-carsharing-isolated_108855-1931.jpg?w=360"
          alt=""
        />
        <Typography variant="h4" gutterBottom fontWeight={"bold"}>
          Wellcome to Buycars.com
        </Typography>
      </Box>
      <Stack
        justifyContent={"center"}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <div className="mainSection">
          <h3>Inventry</h3>
          <div className="subSection">
            <Button
              onClick={() => routeHandler("/inventry")}
              fullwidth={"true"}
              sx={{ fontSize: "13px" }}
              variant="outlined"
              color="secondary"
              startIcon={<PreviewIcon />}
            >
              View Inventry
            </Button>
            <Button
              onClick={() => routeHandler("/inventry/create")}
              fullwidth={"true"}
              sx={{ fontSize: "13px" }}
              variant="outlined"
              color="secondary"
              startIcon={<NoteAddIcon />}
            >
              Add new car
            </Button>
          </div>
        </div>
        <div className="mainSection">
          <h3>OEM Specs</h3>
          <div className="subSection">
            <Button
              onClick={() => routeHandler("/oem")}
              fullwidth={"true"}
              sx={{ fontSize: "13px" }}
              variant="outlined"
              color="secondary"
              startIcon={<PreviewIcon />}
            >
              View OEM Specs
            </Button>
            <Button
              onClick={() => routeHandler("/oem/create")}
              fullwidth={"true"}
              sx={{ fontSize: "13px" }}
              variant="outlined"
              color="secondary"
              startIcon={<NoteAddIcon />}
            >
              Add OEM Specs
            </Button>
          </div>
        </div>
      </Stack>
    </Container>
  );
}

export default Dashboard;
