import React, { useState, useContext } from "react";
import LegendBox from "./rightSideBar/legendBox.jsx";
import CommentsSelectModule from "./rightSideBar/commentsSelectModule.jsx";
import VariablesSelectModule from "./rightSideBar/variablesSelectModule.jsx";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import selectedDendogramContext from "@/contexts/selectedDendogramContext.jsx";

const RightSidebar = ({ isVisible, toggleVisibility }) => {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [isLegendBoxOpen, setLegendBoxOpen] = useState(false);
  const [isVariablesOpen, setVariablesOpen] = useState(false);
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const { selectedDendogram } = useContext(selectedDendogramContext);

  const handleClick = () => {
    setLightboxOpen(!isLightboxOpen);
  };

  const handleClose = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="flex mt-25 max-w-64 max-h-screen">
      {/* Collapsible Bar */}
      <aside
        className={`transition-all duration-300 w-0.5 bg-[#4A4A4A] px-2 overflow-hidden cursor-pointer flex items-center justify-center text-white`}
        onClick={toggleVisibility}
        title={isVisible ? "Collapse" : "Expand"} // Tooltip for better UX
      >
        <span className="text-lg">{isVisible ? ">" : "<"}</span>
      </aside>

      {/* Left Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          isVisible ? "min-w-64 px-4" : "w-0 px-0"
        } py-4 bg-[#2D2D2D] overflow-hidden max-h-screen text-white flex flex-col gap-y-3`}
      >
        <div className="h-24">
        </div>
        {/* Collapsible Legend Box */}
        <div>
          <div
            className="cursor-pointer flex items-center justify-between"
            onClick={() => setLegendBoxOpen(!isLegendBoxOpen)}
          >
            <h2>Legend</h2>
            <span>{isLegendBoxOpen ? "-" : "+"}</span>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isLegendBoxOpen ? "max-h-64" : "max-h-0"
            }`}
          >
            <LegendBox />
          </div>
        </div>

        {/* Collapsible Variables Select Module */}
        <div>
          <div
            className="cursor-pointer flex items-center justify-between"
            onClick={() => setVariablesOpen(!isVariablesOpen)}
          >
            <h2>Variables</h2>
            <span>{isVariablesOpen ? "-" : "+"}</span>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isVariablesOpen ? "max-h-72" : "max-h-0"
            }`}
          >
            <div className="flex-grow p-2">
              <VariablesSelectModule />
            </div>
          </div>
        </div>

        {/* Collapsible Comments Select Module */}
        <div>
          <div
            className="cursor-pointer flex items-center justify-between"
            onClick={() => setCommentsOpen(!setCommentsOpen)}
          >
            <h2>Comments</h2>
            <span>{isCommentsOpen ? "-" : "+"}</span>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isCommentsOpen ? "max-h-72" : "max-h-0"
            }`}
          >
            <div className="flex-grow p-2">
              <CommentsSelectModule />
            </div>
          </div>
        </div>

        {/* Show Dendogram Button */}
        <Button variant="contained" onClick={handleClick}>
          Show Dendogram
        </Button>
      </aside>

      {/* Lightbox Modal */}
      <Modal
        open={isLightboxOpen}
        onClose={handleClose}
        aria-labelledby="dendogram-modal-title"
        aria-describedby="dendogram-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <img
            src={`./dendograms/${selectedDendogram}`} // Replace with your actual image path
            alt="Dendogram"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
          <Button variant="contained" onClick={handleClose} style={{ marginTop: '10px' }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RightSidebar;
