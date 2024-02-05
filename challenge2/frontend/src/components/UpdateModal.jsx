import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

const UpdateModal = ({
  updateModalView,
  setUpdateModalView,
  getCurrencies,
  updateContent,
}) => {
  const useCtx = useContext(UserContext);

  const [base, setBase] = useState(updateContent.base);
  const [counter, setCounter] = useState(updateContent.counter);
  const [rate, setRate] = useState(updateContent.rate);

  const [baseError, setBaseError] = useState(false);
  const [counterError, setCounterError] = useState(false);
  const [rateError, setRateError] = useState(false);

  const handleClose = () => {
    setUpdateModalView(false);
    setBaseError(false);
    setCounterError(false);
    setRateError(false);
  };

  const updateEntry = async () => {
    setBaseError(false);
    setCounterError(false);
    setRateError(false);

    const res = await fetch(
      import.meta.env.VITE_SERVER + `/currencies/${updateContent.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCtx.accessToken,
        },
        body: JSON.stringify({
          base,
          counter,
          rate,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        console.error(data);

        if (base.length !== 3) {
          setBaseError(true);
        }
        if (counter.length !== 3) {
          setCounterError(true);
        }
        if (rate == null || rate == undefined || rate === "") {
          setRateError(true);
        }
        if (isNaN(rate)) {
          setRateError(true);
        }
      } else {
        setBase("");
        setCounter("");
        setRate("");
        getCurrencies();
        handleClose();
      }
    } else {
      console.error(data);
      alert(data.message);
    }
  };

  useEffect(() => {
    if (updateContent) {
      setBase(updateContent.base || "");
      setCounter(updateContent.counter || "");
      setRate(updateContent.rate || "");
    }
  }, [updateContent]);

  return (
    <>
      <Modal open={updateModalView} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "white",
            border: "2px solid black",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="body2">
            Please enter the country codes for the base and counter input. e.g.
            (USD, SGD)
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              size="small"
              inputProps={{ minLength: 3 }}
              placeholder="Base"
              value={base}
              error={baseError}
              helperText={baseError ? "Input must be 3 characters" : ""}
              required
              onChange={(event) => {
                setBase(event.target.value);
              }}
            />

            <TextField
              size="small"
              inputProps={{ minLength: 3 }}
              placeholder="Counter"
              value={counter}
              error={counterError}
              helperText={counterError ? "Input must be 3 characters" : ""}
              required
              onChange={(event) => {
                setCounter(event.target.value);
              }}
            />

            <TextField
              size="small"
              placeholder="Rate"
              value={rate}
              error={rateError}
              helperText={rateError ? "Input must only contain numbers" : ""}
              required
              onChange={(event) => {
                setRate(event.target.value);
              }}
            />

            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={updateEntry}
            >
              Update
            </Button>
            <Button
              sx={{ position: "absolute", right: 0, top: 0, fontSize: "1rem" }}
              color="error"
              size="small"
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateModal;
