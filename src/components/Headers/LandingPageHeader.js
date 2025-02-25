import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 1165) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/Alinambi/CasaAlinambi.jpg") + ")",
          minHeight: "550px",
          width: "100%",
          overflow: "hidden",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="" />
        <Container>
          <div className="motto text-center"></div>
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;
