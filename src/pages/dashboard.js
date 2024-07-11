import React from "react";
import Layout from "@/components/Layout";
import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Skeleton,
  Divider,
} from "@mui/material";
import { fetchParam, setParam, gcsSlice } from "@/store/gcs";
import { Canvas } from "@react-three/fiber";
import { Model } from "@/variables/drone";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";

const MapComponentWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const { resetAllStatus } = gcsSlice.actions;
  const store = useSelector((store) => store.gcs);
  const initConnectionFields = {
    port: process.env.NEXT_PUBLIC_PORT,
    baudrate: process.env.NEXT_PUBLIC_BAUDRATE,
    app_connect: false,
  };
  const [connectionFields, setConnectionFields] =
    useState(initConnectionFields);
  const [params, setParams] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    setInterval(() => {
      dispatch(fetchParam());
    }, 2000);
  }, []);

  useEffect(() => {
    setParams(store.params);
  }, [store.params]);

  useEffect(() => {
    switch (store.setParam.status) {
      case "loading":
        setSnackbar({
          open: true,
          type: "info",
          message: "Loading...",
        });
        break;
      case "success":
        setSnackbar({
          open: true,
          type: "success",
          message: "Success",
        });
        break;
      case "error":
        setSnackbar({
          open: true,
          type: "error",
          message: store?.setParam?.error,
        });
        break;
    }
    dispatch(resetAllStatus());
  }, [store.setParam]);

  const onCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onConnectionChange = (e) => {
    setConnectionFields({ [e.target.name]: e.target.value });
  };

  const onConnectionClear = () => {
    setConnectionFields(initConnectionFields);
  };

  const onConnect = () => {
    dispatch(setParam({ data: { ...connectionFields, app_connect: true } }));
  };

  const onDisconnect = () => {
    dispatch(setParam({ data: { app_connect: false } }));
  };

  return (
    <Layout>
      <Paper
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "flex-start", // Align items to the start of the vertical axis
          padding: 2,
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                minHeight: "35vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align items to the start of the vertical axis
                gap: 2,
                margin: "0 auto",
                padding: 2,
                backgroundColor: "#fff",
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Connection
              </Typography>
              <TextField
                label="Enter Port"
                variant="standard"
                fullWidth
                value={connectionFields.port}
                name="port"
                onChange={onConnectionChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Enter Baudrate"
                variant="standard"
                fullWidth
                value={connectionFields.baudrate}
                name="baudrate"
                onChange={onConnectionChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={onConnect}
                >
                  Connect
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={onDisconnect}
                >
                  Disconnect
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={onConnectionClear}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                minHeight: "35vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align items to the start of the vertical axis
                gap: 2,
                margin: "0 auto",
                padding: 2,
                backgroundColor: "#fff",
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Status
              </Typography>
              <Divider />
              <Typography variant="body1" component="div">
                Port: {params?.port}
              </Typography>
              <Typography variant="body1" component="div">
                Baudrate: {params?.baudrate}
              </Typography>
              <Typography variant="body1" component="div">
                Connection: {params?.app_connect ? "Connected" : "Disconnected"}
              </Typography>
              <Typography variant="body1" component="div">
                Battery: {params?.battery} V
              </Typography>
              <Typography variant="body1" component="div">
                Mode: {params?.mode}
              </Typography>
              <Typography variant="body1" component="div">
                System Status: {params?.system_status}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align items to the start of the vertical axis
                margin: "0 auto",
                padding: 2,
                backgroundColor: "#fff",
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Plane
              </Typography>
              <Canvas
                style={{
                  backgroundColor: "#ffffff",
                  height: "40vh",
                  width: "100%",
                }}
              >
                <ambientLight intensity={1} />
                <directionalLight intensity={7} position={[0, 10, 5]} />
                <Suspense fallback={null}>
                  <mesh
                    rotation={[(params?.pitch ?? 0) * -1, 0, params?.roll ?? 0]}
                    scale={[0.025, 0.025, 0.025]}
                  >
                    <Model position={[0, 0, 0]} />
                  </mesh>
                </Suspense>
                <OrbitControls />
              </Canvas>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align items to the start of the vertical axis
                // gap: 0,
                margin: "0 auto",
                padding: 2,
                backgroundColor: "#fff",
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Map
              </Typography>
              <MapComponentWithNoSSR
                center={[
                  params?.lat || -5.3821787,
                  params?.long || 105.2532691,
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={onCloseSnackbar}
      >
        <Alert
          onClose={onCloseSnackbar}
          severity={snackbar.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Dashboard;
