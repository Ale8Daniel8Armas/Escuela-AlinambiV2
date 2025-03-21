import React from "react";
import "assets/css/paper-kit.css";

// reactstrap components

// core components

function CronogramaHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
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
            "url(" +
            require("assets/img/Alinambi/estudiantes-Alinambi.jpg") +
            ")",
        }}
        className="page-header page-header-small"
        data-parallax={true}
        ref={pageHeader}
        s
      >
        <div className="filter" />
      </div>
    </>
  );
}

export default CronogramaHeader;
