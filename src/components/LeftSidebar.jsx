import React from "react";
import selectedCityContext from "../contexts/selectedCityContext.jsx";
import { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Card, CardContent, Typography, Container } from "@mui/material";

// PlaceholderCard component
const PlaceholderCard = () => (
  <Card className="w-full mb-4">
    {" "}
    {/* Full-width and bottom margin */}
    <CardContent>
      <Typography variant="h5" component="div">
        Placeholder Title
      </Typography>
      <Typography variant="body2">
        Placeholder content. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </Typography>
    </CardContent>
  </Card>
);

const LeftSidebar = ({ isVisible, toggleVisibility }) => {
  const { selectedCity, setSelectedCity } = useContext(selectedCityContext);

  const [checked, setChecked] = React.useState([0]);

  const layerList = [
    "Buildings",
    "Tessellated Cell",
    "Block",
    "Street Nodes",
    "Street Edges",
  ];

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="flex mt-20 max-w-60">
      {/* Left Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          isVisible ? "min-w-40 px-4" : "w-0 px-0"
        } py-4 bg-[#2D2D2D] overflow-hidden text-white flex flex-col gap-y-3`}
      >
        {/* Divided sections */}
        <div className="flex flex-col flex-grow flex flex-col gap-y-4">
          <div className="flex-grow p-2 flex flex-col gap-y-4">
            <p>{selectedCity} currently has these available models:</p>
            <Box
              sx={{ minWidth: 80 }}
              className="text-white border border-white border-opacity-60"
            >
              <FormControl fullWidth>
                <InputLabel
                  variant="standard"
                  htmlFor="uncontrolled-native"
                  className="text-white"
                >
                  Age
                </InputLabel>
                <NativeSelect
                  className="text-white"
                  defaultValue={30}
                  inputProps={{
                    name: "Model",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>

          <div className="flex-grow p-2">
            <p>Layers:</p>
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {layerList.map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        color="secondary"
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                    disableGutters
                    className="py-0"
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: "12px" }}
                        id={labelId}
                        primary={`${value}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className="flex-grow p-2 max-h-72">
            <p>Comments:</p>
            <div className="overflow-y-auto max-h-full">
              {" "}
              {/* Scrollable and limited height */}
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-full mb-4">
                  {" "}
                  {/* Ensure full width and space between cards */}
                  <PlaceholderCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Collapsible Bar */}
      <aside
        className={`transition-all duration-300 w-0.5 bg-[#4A4A4A] px-2 overflow-hidden cursor-pointer flex items-center justify-center text-white`}
        onClick={toggleVisibility}
        title={isVisible ? "Collapse" : "Expand"} // Tooltip for better UX
      >
        <span className="text-lg">{isVisible ? "<" : ">"}</span>
      </aside>
    </div>
  );
};

export default LeftSidebar;
