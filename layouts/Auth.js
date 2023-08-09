import { useEffect } from "react";
import Router from "next/router";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "@/components/Navbars/AuthNavbar.js";
import AuthFooter from "@/components/Footers/AuthFooter.js";

import routes from "routes.js";

const Auth = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if(status != 'loading' && session){
      router.push('/')
    }
    document.body.classList.add("bg-default");
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  }, [session, status]);

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{props.children}</Row>
        </Container>
      </div>
      {/* <AuthFooter /> */}
    </>
  );
}

export default Auth;
