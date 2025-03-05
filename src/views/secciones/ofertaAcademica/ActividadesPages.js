import React from "react";

import { Container, Row } from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ActividadesHeader from "components/Headers/ActividadesHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import ActivitiesContent from "views/secciones/ofertaAcademica/Actividades.js";

function ActividadesPage() {
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
      <ActividadesHeader />
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
            <ActivitiesContent />
          </Row>
          <br />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ActividadesPage;
