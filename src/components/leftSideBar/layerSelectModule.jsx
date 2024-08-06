import selectedCityContext from "../../contexts/selectedCityContext.jsx";
import { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function LaterSelectModule() {
  const { selectedCity, setSelectedCity } = useContext(selectedCityContext);

  const layerList = [
    "Buildings",
    "Tessellated Cell",
    "Block",
    "Street Nodes",
    "Street Edges",
    "Comments"
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

  const [checked, setChecked] = useState([0]);

  return (
    <>
      <p>Layers:</p>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {layerList.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments" color="secondary">
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
    </>
  );
}
