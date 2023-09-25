import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useHttpClient } from "../../../hooks/useHttpClient-hook";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import OverlayModal from "../OverlayModal/OverlayModal";
import ErrorModal from "../ErrorModal/ErrorModal";

const Dropzone: React.FC<{ className?: string }> = ({ className }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [organ, setOrgan] = useState("auto");
  const [data, setData] = useState<any[] | null>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles && setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  function handleChange(event: SelectChangeEvent) {
    setOrgan(event.target.value);
  }

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file || "");
    formData.append("organ", organ);

    try {
      const responseData = await sendRequest({
        url: "/upload",
        method: "POST",
        body: formData,
      });
      setData(responseData.filter((data: any) => data?.score >= 0.1));
      setIsResultModalOpen(true);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <form className="relative" onSubmit={submitHandler}>
        <div {...getRootProps({ className })}>
          <input {...getInputProps()} />
          <strong className="flex gap-5 items-center">
            {isDragActive ? (
              <>
                <i className="fa-duotone fa-file-arrow-up cam-corners flex items-center justify-center text-[70px] p-4 w-28 h-28" />
                <p>Drop the image here ...</p>
              </>
            ) : file ? (
              <>
                <div className="min-w-[7rem] max-w-[7rem]">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="aspect-square"
                  />
                </div>
                <p>{file.name}</p>
              </>
            ) : (
              <>
                <i className="fa-duotone fa-image cam-corners flex items-center justify-center text-[70px] p-4 w-28 h-28"></i>
                <p>Drag 'n' drop some image here, or click to select image</p>
              </>
            )}
          </strong>
        </div>
        {file && (
          <div className="flex gap-5 mt-5">
            <button
              type="button"
              className="absolute -top-4 -right-4 rounded-full h-10 w-10 bg-red-600 text-white"
              onClick={() => {
                setFile(null);
                setOrgan("auto");
              }}
            >
              X
            </button>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Organ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={organ}
                label="Organ"
                onChange={handleChange}
              >
                <MenuItem value={"auto"}>Auto</MenuItem>
                <MenuItem value={"bark"}>Bark</MenuItem>
                <MenuItem value={"fruit"}>Fruit</MenuItem>
                <MenuItem value={"flower"}>Flower</MenuItem>
                <MenuItem value={"leaf"}>Leaf</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              SUBMIT
            </Button>
          </div>
        )}
      </form>
      {data && (
        <div className="flex gap-5 mt-5">
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={() => setIsResultModalOpen(true)}
          >
            Open Result
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              setIsResultModalOpen(false);
              setData(undefined);
            }}
          >
            Clear Result
          </Button>
        </div>
      )}
      <LoadingSpinner isLoading={isLoading} />
      <OverlayModal
        isOpen={isResultModalOpen}
        setIsOpen={setIsResultModalOpen}
        data={data}
      />
      <ErrorModal errorMessage={error} clearError={clearError} />
    </>
  );
};

export default Dropzone;
