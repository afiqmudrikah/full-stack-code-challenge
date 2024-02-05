import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import UserContext from "../context/user";

const InputModal = ({ modalView, setModalView, getCurrencies }) => {
  const useCtx = useContext(UserContext);

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
    setBase("");
    setCounter("");
    setRate("");
  };

  const addCurrency = async () => {
    setBaseError(false);
    setCounterError(false);
    setRateError(false);

    const res = await fetch(import.meta.env.VITE_SERVER + `/currencies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + useCtx.accessToken,
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
              onClick={addCurrency}
            >
              Add
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
    </div>
  );
};

export default InputModal;
