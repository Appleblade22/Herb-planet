import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";

const OverlayModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any[] | null | undefined;
}> = ({ isOpen, data, setIsOpen }) => (
  <Modal
    open={isOpen}
    onClose={() => setIsOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    sx={{
      backgroundColor: "#fffd",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        bgcolor: "background.paper",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
        maxHeight: "90vh",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        className="absolute top-0 right-0 px-3 py-2 rounded-full hover:text-red-600"
        onClick={() => setIsOpen(false)}
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <Typography
        variant="h6"
        className="!flex !items-center !font-bold !h-16 !p-0 !pb-2"
      >
        <img
          src="/assets/Herb-Planet.png"
          alt="Herb Planet Logo"
          className="w-14 h-14"
        />
        HerbPlanet
      </Typography>
      <div className="max-h-[65vh] overflow-y-auto overflow-x-hidden py-2">
        {data?.length ? (
          data.map((item, itemIndex) => (
            <Accordion
              key={`${Date.now() + Math.random()}${itemIndex}`}
              className="!rounded-md !overflow-hidden !mb-4"
            >
              <AccordionSummary
                expandIcon={<i className="fa-solid fa-chevron-down" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="!bg-[#38b61311]"
              >
                <div className="flex flex-col">
                  <Typography className="!text-[#38b613] !text-sm md:!text-xl !flex !max-w-min md:!max-w-max">
                    <Tooltip title="Scientific Name">
                      <span>
                        {item.species?.scientificNameWithoutAuthor ||
                          item.species?.scientificNameWithAuthor}
                      </span>
                    </Tooltip>
                    {true && (
                      <Tooltip title="Medicinal Herb">
                        <IconButton className="!p-0 !ml-2 !rounded-md !px-2 !items-start">
                          <i className="fa-duotone fa-badge-check text-[#38b613] text-lg sm:text-md md:text-lg mr-2" />
                          <small className="!hidden sm:!block sm:text-[12px] md:text-[15px] text-gray-500 leading-0">
                            Medicinal Herb
                          </small>
                        </IconButton>
                      </Tooltip>
                    )}
                  </Typography>
                  <Typography className="!text-xs md:!text-base">
                    {item.species?.commonNames[0]}
                  </Typography>
                </div>
                <Tooltip
                  title={`Predicted Plant: ${item.species?.commonNames[0]} (${
                    Math.round(item.score * 10000) / 100
                  }% Confidence)`}
                >
                  <div className="flex items-center justify-center gap-4 ml-auto my-auto mr-4">
                    <i className="fa-duotone fa-leaf-heart fa-2xl text-[#38b613] hidden sm:block" />
                    <Typography className="!text-xs sm:!text-base">
                      {Math.round(item.score * 10000) / 100}%
                    </Typography>
                  </div>
                </Tooltip>
              </AccordionSummary>
              <AccordionDetails>
                {item?.images && (
                  <Typography variant="h6" className="!font-bold">
                    Related Images
                  </Typography>
                )}
                <div className="flex flex-wrap gap-4 overflow-x-auto">
                  {item?.images?.map((image: any, imageIndex: number) =>
                    image.url?.m ? (
                      <div
                        key={`${
                          Date.now() + Math.random()
                        }${itemIndex}${imageIndex}`}
                        className="min-w-[7rem] max-w-[7rem]"
                      >
                        <img
                          src={image.url?.m}
                          alt={item.species?.scientificNameWithAuthor}
                          className="aspect-square"
                        />
                      </div>
                    ) : (
                      <React.Fragment
                        key={`${
                          Date.now() + Math.random()
                        }${itemIndex}${imageIndex}`}
                      />
                    )
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <AppBar
            position="static"
            color="inherit"
            className="!bg-[#ffcc00] !font-bold !text-white"
          >
            <Toolbar>NOT A PLANT</Toolbar>
          </AppBar>
        )}
      </div>
      <div className="flex justify-end gap-4 h-[10%] mt-4">
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </div>
    </Box>
  </Modal>
);

export default OverlayModal;
