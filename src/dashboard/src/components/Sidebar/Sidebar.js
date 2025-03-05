import React, { useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";

function Sidebar({ bgColor, activeColor, routes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebar = useRef(null);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token de autenticación
    navigate("/homepage", { replace: true }); // Redirigir y reemplazar la entrada en el historial
  };

  // Verificar si la ruta está activa
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName) ? "active" : "";
  };

  // Configurar PerfectScrollbar
  useEffect(() => {
    if (navigator.platform.includes("Win")) {
      const ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });

      // Limpiar PerfectScrollbar al desmontar el componente
      return () => ps.destroy();
    }
  }, []);

  return (
    <div
      className="sidebar"
      data-color={bgColor}
      data-active-color={activeColor}
    >
      <div className="logo">
        <a href="/" className="simple-text logo-mini">
          <div className="logo-img">
            <img
              src={require("assets/img/Alinambi/LogoAlinambiT.png")}
              alt="Logo de Empresa"
            />
          </div>
        </a>
        <a href="/" className="simple-text logo-normal">
          EEBF Aliñambi
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {routes.map((route, key) => (
            <li
              className={`${activeRoute(route.path)} ${
                route.pro ? "active-pro" : ""
              }`}
              key={key}
            >
              <NavLink to={route.layout + route.path} className="nav-NavLink">
                <i className={route.icon} />
                <p>{route.name}</p>
              </NavLink>
            </li>
          ))}
        </Nav>
        <br />
        <br />
        <Nav>
          {/* Botón de salida */}
          <li>
            <NavLink
              to="/homepage"
              className="nav-NavLink"
              onClick={handleLogout}
            >
              <i className="nc-icon nc-button-power" />
              <p>Cerrar Sesión</p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
