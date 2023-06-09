import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Context/MinContext";
import { Container, Grid, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { theme } from "../../Utils/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { getToken } from "../../Utils/storeToken";
function CreateInventry() {
  const { postInventry, getOemmSpecs, oemSpecList } = useContext(MainContext);
  const [payload, setpayload] = useState({
    modelId: "",
    modelName: "",
    image: null,
    odometerKms: "",
    price: "",
    color: "",
    majorScratches: null,
    registrationPlace: "",
    originalPaint: null,
    reportedAccidents: "",
    previousBuyersNumber: "",
    points: [],
    userId: "",
    milage: "",
  });
  // const [value, setValue] = useState(null);
  const handlechange = (event) => {
    const target = event.target;
    let value = target.value;
    let name = target.name;

    if (name == "points") {
      setpayload({ ...payload, [name]: value.trim().split("\n") });
    }
    if (name == "image") {
      const file = event.target.files[0];

      setpayload({ ...payload, image: file });
    } else {
      value = target.type == "number" ? Number(value) : (value = value);
      setpayload({ ...payload, [name]: value });
    }
  };

  // const handlfileChange = (event) => {

  // };

  const submitAction = (e) => {
    e.preventDefault();

    postInventry(payload);
  };

  useEffect(() => {
    const userid = JSON.parse(getToken("user"));
    setpayload({ ...payload, userId: userid.userId });

    getOemmSpecs();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container maxwidth="sm" sx={{ my: 5 }}>
        <Grid
          container
          component={"form"}
          encType="multipart/form-data"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h4" fontWeight={"bold"}>
              Add new car to inventry
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              name="modelName"
              id="outlined-basic"
              label="Enter Title"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select OEM Specs
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payload.modelId}
                name="modelId"
                required
                label="Select OEM Specs"
                onChange={handlechange}
              >
                {oemSpecList &&
                  oemSpecList.map((elem) => {
                    return (
                      <MenuItem key={elem._id} value={elem._id}>
                        {elem.modelName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              name="price"
              id="outlined-basic"
              label="Enter Price"
              type="number"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              id="outlined-basic"
              label="KiloMeters as per odometer "
              type="number"
              variant="outlined"
              name="odometerKms"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              id="outlined-basic"
              label="Color"
              variant="outlined"
              name="color"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Orignal Paint
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payload.originalPaint}
                required
                name="originalPaint"
                label="Orignal Paint"
                onChange={handlechange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Major Scratches
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payload.majorScratches}
                required
                label="Major Scratches"
                onChange={handlechange}
                name="majorScratches"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              id="outlined-basic"
              label="No. of accidents reported"
              type="number"
              variant="outlined"
              name="reportedAccidents"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              id="outlined-basic"
              label="No. of previous buyers"
              type="number"
              variant="outlined"
              name="previousBuyersNumber"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              id="outlined-basic"
              label="Registration Place"
              variant="outlined"
              onChange={handlechange}
              name="registrationPlace"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              required
              id="outlined-basic"
              label="Milage in Km/Ltr"
              type="number"
              variant="outlined"
              name="milage"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              fullWidth={true}
              placeholder="Insert a car Image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Enter Description points (Hit enter for new point)"
              multiline
              fullWidth={true}
              required
              rows={4}
              defaultValue=""
              name="points"
              onChange={handlechange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" onClick={submitAction}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CreateInventry;
