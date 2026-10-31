# Registro de respuestas de los estudiantes

El módulo guarda y envía las respuestas de cuatro actividades:

| Actividad | Pestaña de la hoja |
|---|---|
| Cuestionario integrador (12 preguntas) | `Cuestionario` |
| Actividad 2: tabla de orgánulos | `Actividad 2 (orgánulos)` |
| Actividad de aplicación 2.4 | `Aplicación 2.4` |
| Preguntas de reflexión (secciones 2 a 6) | `Reflexiones` |

Cada fila incluye fecha, nombre, documento, grupo, número de intento, aciertos y nota (cuando aplica) y la respuesta de cada pregunta.
En la Actividad 2 se registra si el estudiante usó «Mostrar solución».

## Configuración (una sola vez)

1. Abra la hoja **Respuestas · Módulo La Célula (Biología 5108)** en su Google Drive.
2. Menú **Extensiones → Apps Script**. Borre el contenido y pegue el archivo [`apps-script/Codigo.gs`](apps-script/Codigo.gs). Guarde.
3. **Implementar → Nueva implementación →** tipo **Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
4. Autorice el acceso cuando Google lo pida y copie la **URL de la aplicación web** (termina en `/exec`).
5. En este repositorio, edite `index.html`, busque `UDI_RESPUESTAS` y pegue la URL entre las comillas de `endpoint: ''`. Guarde (commit).

Mientras `endpoint` esté vacío, el módulo funciona igual pero las respuestas quedan solo en el navegador del estudiante (puede descargarlas en CSV desde «Mis respuestas»).

## Cómo funciona para el estudiante

- Una barra en la parte superior pide nombre, documento y grupo una sola vez.
- Lo que escribe se guarda como borrador en su navegador.
- Al calificar el cuestionario o pulsar «Enviar al docente», la respuesta llega a la hoja.
- Sin internet, el envío queda en cola y se reintenta solo.
- En la actividad 2.4, las respuestas modelo se habilitan después de enviar.

## Notas

- Si cambia el código de Apps Script, use **Implementar → Administrar implementaciones → Editar → Nueva versión** para conservar la misma URL.
- La URL es pública (el repositorio también); cualquiera que la conozca podría enviar filas. El script valida el formato, evita duplicados y neutraliza fórmulas.
- Las preguntas de reflexión se editan en el mismo bloque `UDI_RESPUESTAS` de `index.html`.
