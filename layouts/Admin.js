import { useEffect, createRef } from "react";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

import { Container } from "reactstrap";

import AdminNavbar from "@/components/Navbars/AdminNavbar.js";
import AdminFooter from "@/components/Footers/AdminFooter.js";
import Sidebar from "@/components/Sidebar/Sidebar.js";

import routes from "routes.js";

function Admin(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  let mainContentRef = createRef();

  useEffect(() => {
    if(status != 'loading' && !session){
      router.push('/auth/login')
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [session, status]);

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("@/assets/img/brand/logo.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
}

export default Admin;
