import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation } from "react-router-dom";

import DemoNavbar from "dashboard/src/components/Navbars/DemoNavbar.js";
import Sidebar from "dashboard/src/components/Sidebar/Sidebar.js";

var ps;

function AdminLayout({ routes = [] }) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  }, []);

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <div className="wrapper">
      <Sidebar
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar />
        <Routes>
          {Array.isArray(routes) &&
            routes.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  element={<prop.component />}
                  key={key}
                  exact
                />
              );
            })}
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
