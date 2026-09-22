# 🏫 Escuela-AlinambiV2

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Reactstrap](https://img.shields.io/badge/Reactstrap-9.2.3-563D7C?logo=bootstrap&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.6.2-7952B3?logo=bootstrap&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-1.62.1-CC6699?logo=sass&logoColor=white)
![Genezio](https://img.shields.io/badge/Deploy-Genezio-orange?logo=vercel&logoColor=white)
[![Licencia: MIT x ESPE](https://img.shields.io/badge/license-MIT%20x%20ESPE-brightgreen.svg)](LICENSE.md)

**Escuela-AlinambiV2** es una plataforma web moderna e interactiva desarrollada para la gestión y presentación de la Escuela Alinambi. El proyecto está construido utilizando **React**, **Bootstrap 4** y **Reactstrap**, tomando como base la plantilla **Paper Kit React** de Creative Tim. Presenta un diseño moderno, colores suaves, tipografía elegante y una interfaz amigable.

## 🚀 Tecnologías y Plantillas Utilizadas

Este proyecto se apoya fuertemente en herramientas modernas de desarrollo frontend:

- **Frontend Core**: [React (v18)](https://reactjs.org/)
- **UI Framework**: [Bootstrap 4](https://getbootstrap.com/) integrado con [Reactstrap](https://reactstrap.github.io/)
- **Plantilla Base**: [Paper Kit React](https://www.creative-tim.com/product/paper-kit-react) por Creative Tim (adaptada y mejorada).
- **Estilos**: [Sass (SCSS)](https://sass-lang.com/) para una arquitectura CSS modular.
- **Gráficos y Mapas**: Integración de [Chart.js](https://www.chartjs.org/) y [Leaflet](https://leafletjs.com/).
- **Despliegue (Deploy)**: [Genezio](https://genezio.com/) para alojamiento y CI/CD ágil.
- **Iconos**: [FontAwesome](https://fontawesome.com/) y [Lucide React](https://lucide.dev/).

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura **Basada en Componentes (Component-Based Architecture)** típica de aplicaciones React (Single Page Application - SPA). 
La separación de responsabilidades se maneja de la siguiente manera:

- **Componentes de UI Reutilizables**: Encapsulados en `/components`, son independientes y pueden ser usados a través de toda la aplicación (ej. botones, navbars, footers).
- **Vistas (Views/Pages)**: En la carpeta `/views`, representan las páginas principales y manejan el estado a nivel de página (ej. Landing Page, Perfil, Dashboard).
- **Estilos Modulares**: Manejo centralizado de estilos con SCSS en `/assets/scss`, lo que permite variables globales para temas y componentes específicos.
- **Rutas**: Gestionadas mediante `react-router-dom` para una navegación rápida y fluida sin recargar la página.

### Estructura de Carpetas

```text
Escuela-AlinambiV2/
├── .env                     # Variables de entorno locales
├── genezio.yaml             # Configuración de despliegue en Genezio
├── package.json             # Gestión de dependencias y scripts
├── public/                  # Archivos estáticos públicos (index.html, favicons)
└── src/
    ├── assets/              # Archivos estáticos, SCSS (paper-kit), fuentes e imágenes
    ├── components/          # Componentes de UI reutilizables (Headers, Navbars, etc.)
    ├── dashboard/           # Componentes y vistas específicas del panel de administración
    ├── views/               # Páginas completas (Landing, Index, Login, Registro, etc.)
    └── index.js             # Punto de entrada de la aplicación y configuración de rutas
```

---

## ⚙️ Descarga e Instalación

### Prerrequisitos

Para ejecutar este proyecto de forma local, necesitas tener instalado:
- **Node.js** (v16 o superior recomendado)
- **npm** (v8 o superior) o **yarn**
- **Git** para clonar el repositorio.

### Paso a paso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/Escuela-AlinambiV2.git
   cd Escuela-AlinambiV2
   ```

2. **Instalar las dependencias**:
   Se recomienda usar la bandera `--legacy-peer-deps` debido a la mezcla de versiones en algunas librerías heredadas de la plantilla original:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Ejecutar el servidor de desarrollo local**:
   ```bash
   npm start
   ```
   *La aplicación se abrirá automáticamente en `http://localhost:3000`.*

4. **Compilar para Producción**:
   ```bash
   npm run build
   ```
   *Esto generará la carpeta `build/` lista para ser desplegada.*

---

## 📦 Dependencias Principales

El proyecto depende de los siguientes paquetes principales (para la lista completa, revisa el archivo `package.json`):

- **`react` & `react-dom`**: Renderizado y manejo de la interfaz.
- **`reactstrap` & `bootstrap`**: Grid system y componentes de interfaz pre-diseñados.
- **`react-router-dom`**: Manejo de rutas y navegación de la SPA.
- **`axios`**: Para realizar peticiones HTTP a servidores externos o APIs.
- **`jwt-decode`**: Decodificación de tokens JSON Web Tokens (JWT) para validación de sesiones.
- **`chart.js` & `react-chartjs-2`**: Para visualización de datos estadísticos en el dashboard.
- **`leaflet` & `react-leaflet`**: Para integración de mapas interactivos.
- **`sass`**: Para compilar los estilos de Paper Kit React.

---

## 🔒 Manejo de Credenciales, Seguridad y Configuración

### 1. Variables de Entorno (`.env`)
El proyecto usa variables de entorno para proteger configuraciones. Por defecto:
- `GENERATE_SOURCEMAP=false` está configurado para evitar la exposición del código fuente en entornos de producción.
- Si se agregan integraciones de API en el futuro (ej. URL del backend), deben agregarse al archivo `.env` utilizando el prefijo `REACT_APP_` (ej. `REACT_APP_API_URL`). **NUNCA** debes subir archivos `.env` con contraseñas reales al repositorio de GitHub (están excluidos en el `.gitignore`).

### 2. Autenticación y JWT
Se cuenta con la dependencia `jwt-decode`. La arquitectura de seguridad para usuarios del dashboard asume un modelo basado en tokens:
- **Login**: Al autenticarse con el servidor backend (vía `axios`), el frontend recibe un token JWT.
- **Almacenamiento**: El token suele guardarse en el `localStorage` o `sessionStorage`.
- **Validación**: Con `jwt-decode` se extrae la información del usuario (roles, caducidad) sin necesidad de consultar repetidamente al servidor. 

### 3. Despliegue con Genezio (`genezio.yaml`)
El despliegue está automatizado usando Genezio.
El archivo `genezio.yaml` define la configuración para que el código frontend se compile automáticamente (`npm run build`) y se publique la carpeta `build` en la región `us-east-1`.

---

## 🤝 Contribuciones

Este proyecto forma parte de las iniciativas colaborativas de la **Universidad de las Fuerzas Armadas (ESPE)**. 
Agradecemos a todos los miembros del equipo de desarrollo, así como al equipo de Creative Tim por la plantilla **Paper Kit React** que sirvió como base para este desarrollo.

Si deseas contribuir:
1. Crea un fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`).
3. Haz commit a tus cambios (`git commit -m 'Añade NuevaCaracteristica'`).
4. Haz push a la rama (`git push origin feature/NuevaCaracteristica`).
5. Abre un Pull Request.

---
*Desarrollado con ❤️ para Escuela Alinambi.*
