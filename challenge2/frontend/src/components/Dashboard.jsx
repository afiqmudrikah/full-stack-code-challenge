import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import InputModal from "./InputModal";
import UpdateModal from "./UpdateModal";
import UserContext from "../context/user";

const Dashboard = () => {
  const useCtx = useContext(UserContext);

  const [currency, setCurrency] = useState();
  const [loading, setLoading] = useState(true);

  const [modalView, setModalView] = useState(false);
  const [updateModalView, setUpdateModalView] = useState(false);

  const [updateContent, setUpdateContent] = useState({});

  const handleOpen = () => {
    setModalView(true);
  };

  const handleUpdateModal = (id, base, counter, rate) => {
    setUpdateModalView(true);
    setUpdateContent({
      id: id,
      base: base,
      counter: counter,
      rate: rate,
    });
  };

  const handleLogout = () => {
    useCtx.setAccessToken("");
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
        Authorization: "Bearer " + useCtx.accessToken,
      },
    });

    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        console.error(data);
      } else {
        getCurrencies();
      }
    } else {
      console.error(data);
      alert(data.message);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <Container sx={{ bgcolor: "#f4f4f4", height: "100vh" }}>
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          border: "2px solid black",
          borderRadius: "10px",
          boxShadow: "1px 2px",
          p: "2rem",
        }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontFamily: "monospace" }}
        >
          Dashboard
        </Typography>

        <Button
          sx={{ position: "absolute", right: 10, top: 10 }}
          variant="contained"
          color="error"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>

        <Grid
          container
          sx={{ width: 4 / 5, margin: "auto", mt: 2, textAlign: "center" }}
        >
          <Grid item xs={4}>
            <Box
              sx={{
                border: 1,
                borderTopLeftRadius: "8px",
                bgcolor: "#dcdcdc",
              }}
            >
              <Typography sx={{ fontWeight: "Bold" }}>Base</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                border: 1,
                bgcolor: "#dcdcdc",
              }}
            >
              <Typography sx={{ fontWeight: "Bold" }}>Counter</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                border: 1,
                borderTopRightRadius: "8px",
                bgcolor: "#dcdcdc",
              }}
            >
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
                        color="success"
                        sx={{ fontSize: "12px", padding: "1.5px" }}
                        onClick={() => {
                          handleUpdateModal(
                            ele.id,
                            ele.base,
                            ele.counter,
                            ele.rate
                          );
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
        <UpdateModal
          updateModalView={updateModalView}
          setUpdateModalView={setUpdateModalView}
          getCurrencies={getCurrencies}
          updateContent={updateContent}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
