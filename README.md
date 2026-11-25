# EuroMetric

Prototipo local de calculadoras financieras para España. Las 15 herramientas realizan cálculos orientativos en el navegador. Las laborales y fiscales usan parámetros aportados por la persona usuaria; no determinan automáticamente las reglas legales aplicables. Las páginas siguen marcadas `noindex` y el sitemap permanece vacío mientras se completan la revisión y los contenidos para publicación.

## Desarrollo

Con Node.js y npm: `npm install`, `npm run dev`, `npm test` y `npm run build`. El sitio se genera estáticamente en `dist/`, compatible con Cloudflare Pages. El comando de compilación es `npm run build` y el directorio de salida es `dist`.

Configura `PUBLIC_SITE_URL` con el origen de producción en el entorno cuando se conozca el dominio para generar etiquetas canonical y Open Graph. Antes de publicar, completa los datos legales y el contacto, verifica las metodologías con fuentes oficiales y habilita la indexación y el sitemap solo para las páginas listas. No hay servicios publicitarios, rastreadores ni enlaces de afiliación activos.

Para habilitar contacto y sugerencias, define `PUBLIC_CONTACT_EMAIL` en un archivo `.env` local o en las variables del entorno de compilación y reinicia el servidor. El formulario abre la aplicación de correo del visitante para que confirme el envío; no envía ni almacena mensajes por sí mismo.

## Antes de publicar: información legal pendiente

Las páginas de privacidad, cookies y aviso legal son borradores con campos explícitos por completar; no publicarlas como definitivas. Identificar al titular y responsable (nombre o razón social, NIF cuando corresponda, domicilio, correo y otro medio de contacto efectivo, datos registrales y profesionales o de autorización si proceden). Concretar el correo para ejercer derechos, los plazos de conservación y bloqueo, las bases jurídicas aplicables y los proveedores de alojamiento y correo, sus encargos, transferencias internacionales y garantías. Confirmar los datos técnicos que recoge el alojamiento y actualizar los textos según la configuración real. Revisar las políticas con asesoramiento jurídico adecuado.

El código actual guarda únicamente la preferencia elegida `eurometric-theme` en almacenamiento local y no integra analítica ni publicidad. Antes de añadir herramientas de medición o publicidad, inventariar sus tecnologías, proveedores y duraciones, actualizar la información e implementar un sistema de consentimiento cuando sea exigible, antes de activarlas. Verificar también las cookies y tratamientos de cualquier servicio externo o alojamiento que se contrate.

Los datos financieros no se almacenan. La preferencia de tema se guarda en el almacenamiento local del navegador si está disponible.

## GitHub Pages

La web se publica desde la rama gh-pages, que contiene el sitio compilado. La rama main contiene el código fuente.
