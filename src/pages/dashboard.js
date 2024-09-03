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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { fetchParam, setParam, gcsSlice } from "@/store/gcs";
import { Canvas } from "@react-three/fiber";
import { DroneModel } from "@/variables/drone";
import { PlaneModel } from "@/variables/plane";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import useSocket from "@/utils/useSocket";

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
    drone_ip: rocess.env.NEXT_PUBLIC_DRONE_IP,
  };
  const [connectionFields, setConnectionFields] =
    useState(initConnectionFields);
  const [params, setParams] = useState(null);
  const [model, setModel] = useState("drone");

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const socket = useSocket();

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
    setConnectionFields({
      ...connectionFields,
      [e.target.name]: e.target.value,
    });
  };

  const onConnectionClear = () => {
    setConnectionFields(initConnectionFields);
  };

  const onConnect = () => {
    dispatch(setParam({ data: { ...connectionFields, app_connect: true } }));
    if (socket) {
      socket.emit("get_params", { connect: true });
      socket.on("get_params", (data) => {
        setParams(data);
      });
    }
  };

  const onDisconnect = () => {
    dispatch(setParam({ data: { app_connect: false } }));
    if (socket) {
      socket.off("get_params");
      setParams({ ...params, app_connect: false });
    }
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
          <Grid item xs={4}>
            <Box
              sx={{
                height: "41vh",
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
                label="Enter Drone IP"
                variant="standard"
                fullWidth
                value={connectionFields.drone_ip}
                name="drone_ip"
                onChange={onConnectionChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="baudrate-select-label">Baudrate</InputLabel>
                <Select
                  labelId="baudrate-select-label"
                  id="baudrate-select"
                  value={connectionFields.baudrate}
                  label="Baudrate"
                  onChange={onConnectionChange}
                  name="baudrate"
                >
                  <MenuItem value={57600}>57600</MenuItem>
                  <MenuItem value={115200}>115200</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="baudrate-select-label">Model</InputLabel>
                <Select
                  labelId="model-select-label"
                  id="model-select"
                  value={model}
                  label="Baudrate"
                  onChange={(e) => setModel(e.target.value)}
                  name="baudrate"
                >
                  <MenuItem value={"drone"}>Drone</MenuItem>
                  <MenuItem value={"plane"}>Plane</MenuItem>
                </Select>
              </FormControl>
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

          <Grid item xs={4}>
            <Box
              sx={{
                height: "41vh",
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

          <Grid item xs={4}>
            <Box
              sx={{
                height: "41vh",
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
                  height: "25vh",
                  width: "100%",
                }}
              >
                <ambientLight intensity={1} />
                <directionalLight intensity={7} position={[0, 10, 5]} />
                {model == "drone" ? (
                  <Suspense fallback={null}>
                    <mesh
                      rotation={[params?.pitch * -1, 0, params?.roll ?? 0]}
                      scale={[0.025, 0.025, 0.025]}
                    >
                      <DroneModel position={[0, 0, 0]} />
                    </mesh>
                  </Suspense>
                ) : (
                  <Suspense fallback={null}>
                    <mesh
                      rotation={[params?.pitch * -1, 0, params?.roll ?? 0]}
                      scale={[1.75, 1.75, 1.75]}
                    >
                      <PlaneModel position={[0, 0, 0]} />
                    </mesh>
                  </Suspense>
                )}
                <OrbitControls />
              </Canvas>
            </Box>
          </Grid>

          {/* streaming */}
          <Grid item xs={4}>
            <Box
              sx={{
                height: "50vh",
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
                Streaming
              </Typography>
              <img
                src={`http://${connectionFields.drone_ip}/video_feed`}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "40vh",
                }}
              />
            </Box>
          </Grid>

          {/* map */}
          <Grid item xs={8}>
            <Box
              sx={{
                height: "50vh",
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
