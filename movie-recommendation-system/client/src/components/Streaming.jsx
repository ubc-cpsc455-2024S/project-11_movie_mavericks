import {
  Box,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { countries } from "../config/streaming_countries";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function Streaming({ open, onClose, response }) {
  const [country, setCountry] = useState(() => {
    if (
      Object.keys(response.streamingOptions).find(
        (countryCode) => countryCode === "ca"
      )
    ) {
      return "ca";
    } else {
      return Object.keys(response.streamingOptions).sort()[0];
    }
  });

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const providers = [];
  const filterProvider = (streaming) => {
    const provider = streaming.service.id;
    if (!providers.includes(provider)) {
      providers.push(provider);
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <Select
          id={country}
          value={country}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {response &&
            Object.keys(response.streamingOptions)
              .sort()
              .map((countryCode) => (
                <MenuItem key={countryCode} value={countryCode}>
                  <Typography align="center" style={{ paddingLeft: "15px" }}>
                    {countries[countryCode].name}
                  </Typography>
                </MenuItem>
              ))}
        </Select>
        <Grid container justifyContent="center">
          {response &&
            response.streamingOptions[country]
              .filter(filterProvider)
              .map((streaming) => (
                <Grid item key={streaming.link}>
                  <IconButton
                    href={streaming.link}
                    target="_blank"
                    sx={{
                      margin: 1,
                      width: 100,
                      height: 100,
                      border: "1px solid",
                    }}
                    style={{ borderColor: streaming.service.themeColorCode }}
                  >
                    <Box
                      component="img"
                      src={streaming.service.imageSet.lightThemeImage}
                      alt={streaming.service.name}
                      sx={{
                        width: "100%",
                      }}
                    />
                  </IconButton>
                </Grid>
              ))}
        </Grid>
      </Dialog>
    </>
  );
}
