import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

// Estilos de la página principal
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Estilos del dashboard
import "bootstrap/dist/css/bootstrap.css";
import "dashboard/src/assets/scss/paper-dashboard.scss?v=1.3.0";
import "dashboard/src/assets/demo/demo.css";

// Páginas de la página principal
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import SeccionVisionMision from "views/secciones/quienesSomos/MisionVisionPage";
import HistoriaPage from "views/secciones/quienesSomos/HistoriaPage.js";
import ValoresPage from "views/secciones/quienesSomos/ValoresPage.js";
import DocentesPage from "views/secciones/quienesSomos/DocentesPage.js";
import AdmisionesPage from "views/secciones/ofertaAcademica/AdmisionesPage.js";
import EdBasicaPage from "views/secciones/ofertaAcademica/EdBasicaPage.js";
import EdInicialPage from "views/secciones/ofertaAcademica/EdInicialPage.js";
import PlanCurricularPage from "views/secciones/ofertaAcademica/PlanCurricularPage.js";
import ActividadesPage from "views/secciones/ofertaAcademica/ActividadesPages.js";
import ConveniosPage from "views/secciones/informacion/ConveniosPage.js";
import CronogramaPage from "views/secciones/informacion/CronogramasPage.js";
import FundacionPage from "views/secciones/informacion/FundacionPage.js";
import MatriculaPage from "views/secciones/informacion/MatriculaPage.js";
import BoletinesPage from "views/secciones/informacion/BoletinesPage.js";
import ServiciosPage from "views/secciones/ServiciosPage.js";
import ContactosPage from "views/secciones/ContactosPage.js";

// Dashboard
import AdminLayout from "./dashboard/src/layouts/Admin.js";
import routes from "./dashboard/src/routes.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Rutas de la página principal */}
      <Route path="/homepage" element={<LandingPage />} />
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
      {/* Rutas del dashboard */}
      <Route path="/admin/*" element={<AdminLayout routes={routes} />} />
      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/homepage" replace />} />
    </Routes>
  </BrowserRouter>
);
