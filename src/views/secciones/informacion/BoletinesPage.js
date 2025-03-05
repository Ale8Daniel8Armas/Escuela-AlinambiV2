import React from "react";

import { Container, Row } from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import BoletinesHeader from "components/Headers/BoletinesHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import BoletinesBody from "views/secciones/informacion/Boletines.js";
import InspeccionGeneral from "views/secciones/informacion/InspeccionGeneral.js";

function BoletinesPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <BoletinesHeader />
      <div
        className="section profile-content"
        style={{
          backgroundImage:
            "url(" + require("assets/img/Alinambi/wallpaperTwo.jpeg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "0",
        }}
      >
        <Container>
          <Row>
            <BoletinesBody />
          </Row>
          <Row>
            <InspeccionGeneral />
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default BoletinesPage;
