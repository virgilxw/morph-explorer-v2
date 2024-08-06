import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import selectedCityContext from "../../contexts/selectedCityContext.jsx";
import selectedLayerContext from "../../contexts/selectedLayerContext.jsx";
import { useContext, useEffect } from "react";

export default function ModelSelectModule() {
  const { selectedCity, setSelectedCity, dataset, setDataset } = useContext(selectedCityContext);
  const { selectedLayer, setSelectedLayer } = useContext(selectedLayerContext);

  const handleModelChange = (event) => {
    const selectedModel = new Set([event.target.value]);
    setSelectedLayer(selectedModel);
    // Any additional logic based on the selected model can be added here
  };

  return (
    <>
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
            Model
          </InputLabel>
          <NativeSelect
            className="text-white"
            defaultValue={Object.keys(dataset)[0]}
            onChange={handleModelChange}
          >
            {Object.keys(dataset).map((key) =>
              <option value={key}>{key}</option>
            )}
          </NativeSelect>
        </FormControl>
      </Box>
      <p className="text-sm">This model</p>
    </>
  );
}