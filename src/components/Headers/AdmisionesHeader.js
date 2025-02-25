import React from "react";
import "assets/css/paper-kit.css";
import { Container } from "reactstrap";

function AdmisionesHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" +
            require("assets/img/Alinambi/fotoAlinambiCuatro.jpg") +
            ")",
          minHeight: "600px",
          width: "100%",
          overflow: "hidden",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container className="container-fluid">
            <div className="title-brand">
              <h1 className="presentation-title">Admisiones</h1>
              <div className="fog-low">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png")}
                  className="fog-img"
                />
              </div>
              <div className="fog-low right">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png")}
                  className="fog-img"
                />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Forma parte de nuestra comunidad educativa y construye tu futuro
              con nosotros
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
          }}
        />

        <style>
          {`
            .page-header {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .content-center {
              width: 100%;
              max-width: 1200px;
              padding: 0 15px;
              z-index: 2;
              position: relative;
            }

            .container-fluid {
              width: 100%;
              max-width: 100%;
            }

            .title-brand {
              text-align: center;
              position: relative;
              z-index: 1;
            }

            .presentation-title {
              font-size: clamp(2.5rem, 6vw, 4.5rem);
              font-weight: 700;
              margin-bottom: 1rem;
              color: #FFFFFF;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }

            .presentation-subtitle {
              font-size: clamp(1.2rem, 3vw, 1.8rem);
              font-weight: 400;
              line-height: 1.4;
              max-width: 800px;
              margin: 1.5rem auto;
              color: #FFFFFF;
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            }

            .fog-img {
              width: 100%;
              max-width: min(300px, 80vw);
              height: auto;
              object-fit: contain;
            }

            .fog-low {
              position: absolute;
              left: 0;
              width: 100%;
              transition: all 0.3s ease;
            }

            .fog-low.right {
              right: 0;
              left: auto;
            }

            .moving-clouds {
              position: absolute;
              width: 100%;
              height: 100%;
              background-size: cover;
              background-position: center;
              bottom: 0;
              left: 0;
              z-index: 1;
            }

            @media (max-width: 991px) {
              .page-header {
                min-height: 550px;
              }

              .content-center {
                padding: 0 20px;
              }
            }

            @media (max-width: 768px) {
              .page-header {
                min-height: 500px;
              }

              .fog-low {
                transform: scale(0.8);
              }

              .fog-low.right {
                transform: scale(0.8);
              }
            }

            @media (max-width: 480px) {
              .page-header {
                min-height: 450px;
              }

              .presentation-title {
                margin-bottom: 0.5rem;
              }

              .presentation-subtitle {
                margin: 1rem auto;
              }

              .fog-low {
                transform: scale(0.6);
              }

              .fog-low.right {
                transform: scale(0.6);
              }
            }

            @media (orientation: landscape) and (max-height: 500px) {
              .page-header {
                min-height: 100vh;
              }

              .presentation-title {
                margin-top: 1rem;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}

export default AdmisionesHeader;
