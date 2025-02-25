import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
//secciones del navbar
//quienes Somos
import SeccionVisionMision from "views/secciones/quienesSomos/MisionVisionPage";
import HistoriaPage from "views/secciones/quienesSomos/HistoriaPage.js";
import ValoresPage from "views/secciones/quienesSomos/ValoresPage.js";
import DocentesPage from "views/secciones/quienesSomos/DocentesPage.js"; 
//oferta academica
import AdmisionesPage from "views/secciones/ofertaAcademica/AdmisionesPage.js";
import EdBasicaPage from "views/secciones/ofertaAcademica/EdBasicaPage.js";
import EdInicialPage from "views/secciones/ofertaAcademica/EdInicialPage.js";
import PlanCurricularPage from "views/secciones/ofertaAcademica/PlanCurricularPage.js";
import ActividadesPage from "views/secciones/ofertaAcademica/ActividadesPages.js";

//informacion
import ConveniosPage from "views/secciones/informacion/ConveniosPage.js";
import CronogramaPage from "views/secciones/informacion/CronogramasPage.js";
import FundacionPage from "views/secciones/informacion/FundacionPage.js";
import MatriculaPage from "views/secciones/informacion/MatriculaPage.js";
import BoletinesPage from "views/secciones/informacion/BoletinesPage.js";

//servicios
import ServiciosPage from "views/secciones/ServiciosPage.js";
//contactos
import ContactosPage from "views/secciones/ContactosPage.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/homepage" element={<LandingPage />} />
      <Route path="/profile-Page" element={<ProfilePage />} />
      <Route path="/index" element={<Index />} /> 
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="/misionYvision-page" element={<SeccionVisionMision />} />
      <Route path="/historia-page" element={<HistoriaPage />} />
      <Route path="/valores-page" element={<ValoresPage />} />
      <Route path="/docentes-page" element={<DocentesPage />} />
      <Route path="/admisiones-page" element={<AdmisionesPage />} />
      <Route path="/edInicial-page" element={<EdInicialPage />} />
      <Route path="/edBasica-page" element={<EdBasicaPage />} />
      <Route path="/planCurricular-page" element={<PlanCurricularPage />} />
      <Route path="/convenios-page" element={<ConveniosPage />} />
      <Route path="/cronogramas-page" element={<CronogramaPage />} />
      <Route path="/fundacion-page" element={<FundacionPage />} />
      <Route path="/matricula-page" element={<MatriculaPage />} />
      <Route path="/servicios-page" element={<ServiciosPage />} />
      <Route path="/contactos-page" element={<ContactosPage />} />
      <Route path="/actividades-page" element={<ActividadesPage />} />
      <Route path="/boletines-page" element={<BoletinesPage />} />
      <Route path="*" element={<Navigate to="/homePage" replace />} />
    </Routes>
  </BrowserRouter>
);
