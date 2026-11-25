# EuroMetric

Prototipo de calculadoras financieras para España. Las 15 herramientas realizan cálculos orientativos en el navegador. Las laborales y fiscales usan parámetros aportados por la persona usuaria; no determinan automáticamente las reglas legales aplicables. Las páginas seleccionadas para búsqueda se definen en `src/data/seo.ts`; las herramientas laborales y fiscales incompletas permanecen en `noindex`.

## Desarrollo

Con Node.js y npm: `npm install`, `npm run dev`, `npm test` y `npm run build`. El sitio se genera estáticamente en `dist/`, compatible con Cloudflare Pages. El comando de compilación es `npm run build` y el directorio de salida es `dist`.

La dirección principal es `https://eurometricbuisness.github.io`. `PUBLIC_SITE_URL` permite configurar otro origen para generar etiquetas canonical y Open Graph. La web está publicada; siguen pendientes la revisión legal y la verificación adicional de las herramientas que permanecen en `noindex`. No hay servicios publicitarios, rastreadores ni enlaces de afiliación activos. Tras compilar se puede ejecutar `node tests/verify-seo-build.mjs` para comprobar el sitemap y las etiquetas.

Para habilitar contacto y sugerencias, define `PUBLIC_CONTACT_EMAIL` en un archivo `.env` local o en las variables del entorno de compilación y reinicia el servidor. El formulario abre la aplicación de correo del visitante para que confirme el envío; no envía ni almacena mensajes por sí mismo.

## GitHub Pages

El código está en main y la web compilada se publica desde la rama gh-pages. Tras compilar se actualiza esa rama. Las páginas indexables se configuran en src/data/seo.ts.
