import Miembros from "dashboard/src/views/Miembros.js";
import Archivos from "dashboard/src/views/Archivos.js";
import PanelList from "dashboard/src/views/Panel.js";
import UserPage from "dashboard/src/views/Usuarios.js";
import MisionVisionPage from "dashboard/src/views/MisionVision.js";
import MatriculaPage from "dashboard/src/views/Matricula.js";

var routes = [
  {
    path: "/panel",
    name: "Panel de Control",
    icon: "nc-icon nc-bank",
    component: PanelList,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Lista de Usuarios",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/files",
    name: "Gestión de Archivos",
    icon: "nc-icon nc-book-bookmark",
    component: Archivos,
    layout: "/admin",
  },
  {
    path: "/members",
    name: "Consejo Estudiantil",
    icon: "nc-icon nc-album-2",
    component: Miembros,
    layout: "/admin",
  },
  {
    path: "/misionVision",
    name: "Misión y Visión",
    icon: "nc-icon nc-bookmark-2",
    component: MisionVisionPage,
    layout: "/admin",
  },
  {
    path: "/matriculaInfo",
    name: "Matrícula",
    icon: "nc-icon nc-briefcase-24",
    component: MatriculaPage,
    layout: "/admin",
  },
];
export default routes;
