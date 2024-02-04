import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import InputModal from "./InputModal";

const Dashboard = () => {
  const [currency, setCurrency] = useState();
  const [loading, setLoading] = useState(true);

  const [modalView, setModalView] = useState(false);

  const handleOpen = () => {
    setModalView(true);
  };

  const getCurrencies = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/currencies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        console.error(data);
      } else {
        setCurrency(data);
        setLoading(false);
      }
    }
  };

  const deleteEntry = async (id) => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/currencies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        console.error(data);
      } else {
        getCurrencies();
        console.log("Entry deleted");
      }
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <Container sx={{ bgcolor: "grey", height: "100vh" }}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Dashboard
      </Typography>

      <Grid
        container
        sx={{ width: 4 / 5, margin: "auto", mt: 2, textAlign: "center" }}
      >
        <Grid item xs={4}>
          <Box sx={{ border: 1 }}>
            <Typography sx={{ fontWeight: "Bold" }}>Base</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ border: 1 }}>
            <Typography sx={{ fontWeight: "Bold" }}>Counter</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ border: 1 }}>
            <Typography sx={{ fontWeight: "Bold" }}>Rate</Typography>
          </Box>
        </Grid>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          currency.map((ele) => {
            return (
              <>
                <Grid item xs={4}>
                  <Box sx={{ border: 1 }}>
                    <Typography>{ele.base}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ border: 1 }}>
                    <Typography>{ele.counter}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ border: 1 }}>
                    <Typography>{ele.rate}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box sx={{ border: 1 }}>
                    <Button
                      color="error"
                      sx={{ fontSize: "12px", padding: "1.5px" }}
                      onClick={() => {
                        deleteEntry(ele.id);
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box sx={{ border: 1 }}>
                    <Button
                      color="error"
                      sx={{ fontSize: "12px", padding: "1.5px" }}
                      onClick={() => {
                        deleteEntry(ele.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </>
            );
          })
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
          onClick={handleOpen}
        >
          Add new currency pair
        </Button>
      </Box>
      <InputModal
        modalView={modalView}
        setModalView={setModalView}
        getCurrencies={getCurrencies}
      />
    </Container>
  );
};

export default Dashboard;
