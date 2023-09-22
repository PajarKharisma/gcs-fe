// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import Admin from "@/layouts/Admin.js";
import Header from "@/components/Headers/Header.js";
import GoogleMapReact from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParam } from "../../store/data";
import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "../../variables/plane";
import { OrbitControls } from "@react-three/drei";

const Marker = () => {
  return (
    <img
      width={30}
      src="https://upload.wikimedia.org/wikipedia/commons/1/17/Plane_icon_nose_up.svg"
      alt=""
    />
  );
};

const Dashboard = (props) => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((store) => store.data);
  const [params, setParams] = useState({});

  useEffect(() => {
    setInterval(() => {
      dispatch(fetchParam());
    }, 2000);
  }, []);

  useEffect(() => {
    setParams(store.params);
  }, [store.params]);

  const deg2rad = (val) => {
    return val * (Math.PI / 180);
  };
  return (
    <>
      <Header params={params} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">PLANE</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Canvas
                  style={{
                    backgroundColor: "#ffffff",
                    height: "50vh",
                    width: "100%",
                  }}
                >
                  <ambientLight intensity={1.25} />
                  <ambientLight intensity={0.1} />
                  <directionalLight intensity={0.4} />
                  <Suspense fallback={null}>
                    <mesh
                      rotation={[
                        deg2rad(params.pitch) * -1,
                        0,
                        deg2rad(params.roll),
                      ]}
                      scale={[1.7, 1.7, 1.7]}
                    >
                      <Model position={[0, 0, 0]} />
                    </mesh>
                  </Suspense>
                  <OrbitControls />
                </Canvas>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-xl-0" xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">MAPS</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ height: "50vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyBN8sj3Luct3fZ0v4YT-jMUxO5ZqqaAAjQ",
                    }}
                    center={{ lat: params.lat, lng: params.long }}
                    defaultZoom={11}
                  >
                    <Marker lat={params.lat} lng={params.long} />
                  </GoogleMapReact>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
