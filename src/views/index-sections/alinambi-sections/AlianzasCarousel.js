import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Card } from "reactstrap";

const carouselItems = [
  {
    src: require("assets/img/Alinambi/logo-espe.png"),
    altText: "Alianza 1",
    caption: "Colaboración con Instituciones",
    description:
      "Fortaleciendo lazos académicos para brindar mejores oportunidades a nuestros estudiantes",
  },
  {
    src: require("assets/img/Alinambi/logo-puce.png"),
    altText: "Alianza 2",
    caption: "Eventos Académicos",
    description:
      "Participación activa en eventos que enriquecen la formación integral de nuestra comunidad",
  },
  {
    src: require("assets/img/Alinambi/logo-tur.png"),
    altText: "Alianza 3",
    caption: "Proyectos Comunitarios",
    description:
      "Desarrollando iniciativas que impactan positivamente en nuestra sociedad",
  },
];

const AlianzaCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      className="section"
      style={{ background: "#f8f9fa", padding: "60px 0" }}
    >
      <Container>
        <div className="text-center mb-5">
          <h2
            className="title"
            style={{
              color: "#1E90FF",
              fontSize: "2.5rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
            }}
          >
            Nuestras Alianzas Estratégicas
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: "1.1rem",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Comprometidos con la excelencia educativa a través de colaboraciones
            significativas
          </p>
        </div>
        <Card
          className="page-carousel"
          style={{
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        >
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            showDots={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list"
            itemClass="carousel-item-padding"
          >
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="text-center p-4"
                style={{
                  background: "linear-gradient(to right, #f0f8ff, #e6ffe6)",
                  minHeight: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.src}
                  alt={item.altText}
                  style={{
                    maxWidth: "250px",
                    height: "auto",
                    marginBottom: "2rem",
                    objectFit: "contain",
                  }}
                />
                <div
                  className="content-wrapper"
                  style={{ maxWidth: "80%", margin: "0 auto" }}
                >
                  <h3
                    style={{
                      color: "#2c3e50",
                      fontSize: "1.75rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.caption}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "1.1rem",
                      lineHeight: "1.6",
                      marginBottom: "0",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </Card>
      </Container>
    </div>
  );
};

export default AlianzaCarousel;
