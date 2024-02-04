import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const InputModal = ({ modalView, setModalView, getCurrencies }) => {
  const [content, setContent] = useState("");
  const [base, setBase] = useState("");
  const [counter, setCounter] = useState("");
  const [rate, setRate] = useState("");

  const [baseError, setBaseError] = useState(false);
  const [counterError, setCounterError] = useState(false);
  const [rateError, setRateError] = useState(false);

  const handleClose = () => {
    setModalView(false);
    setBaseError(false);
    setCounterError(false);
    setRateError(false);
  };

  const addCurrency = async () => {
    setBaseError(false);
    setCounterError(false);
    setRateError(false);

    const res = await fetch(import.meta.env.VITE_SERVER + `/currencies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base,
        counter,
        rate,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        if (base.length !== 3) {
          setBaseError(true);
        }
        if (counter.length !== 3) {
          setCounterError(true);
        }
        if (isNaN(rate)) {
          setRateError(true);
        }

        console.error(data);
      } else {
        setBase("");
        setCounter("");
        setRate("");
        getCurrencies();
        handleClose();
        setBaseError(false);
        setCounterError(false);
      }
    }
  };

  const updateEntries = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/currencies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base,
        counter,
        rate,
      }),
    });

    const data = await res.json();
  };

  return (
    <div>
      <Modal open={modalView} onClose={handleClose}>
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
            >
              1
            </TextField>
            <TextField
              size="small"
              inputProps={{ minlength: 3 }}
              placeholder="Counter"
              value={counter}
              error={counterError}
              helperText={counterError ? "Input must be 3 characters" : ""}
              required
              onChange={(event) => {
                setCounter(event.target.value);
              }}
            >
              2
            </TextField>
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
            >
              3
            </TextField>
            <Button variant="outlined" size="small" onClick={addCurrency}>
              Add
            </Button>
            <Button
              sx={{ position: "absolute", right: 0, top: 0, fontSize: "1rem" }}
              size="small"
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default InputModal;
