import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useRouter } from "next/router";

const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      const path = router.pathname;
      switch (path) {
        case "/":
          setValue(0);
          break;
        case "/dashboard":
          setValue(0);
          break;
        case "/dasboard":
          setValue(1);
          break;
      }
    };
    handleRouteChange();
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/dashboard");
        break;
      case 1:
        router.push("/dasboard");
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{ width: "100%", position: "fixed", bottom: 0 }}
    >
      <BottomNavigationAction
        label="Dashboard"
        icon={<ContentPasteSearchIcon />}
      />
      <BottomNavigationAction label="Dataset" icon={<DescriptionIcon />} />
    </BottomNavigation>
  );
};

export default BottomNavBar;
