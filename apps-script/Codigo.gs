/**
 * Recepción de respuestas · Módulo «La Célula» (Biología 5108, UDI)
 * Pegue este código en: Hoja de cálculo → Extensiones → Apps Script.
 * Implementar → Nueva implementación → Tipo: Aplicación web
 *   · Ejecutar como: Yo
 *   · Quién tiene acceso: Cualquier persona
 * Copie la URL que termina en /exec y péguela en el módulo (window.UDI_RESPUESTAS.endpoint).
 */
const HOJAS = {
  cuestionario: 'Cuestionario',
  actividad2: 'Actividad 2 (orgánulos)',
  aplicacion24: 'Aplicación 2.4',
  reflexion: 'Reflexiones'
};
const MAX_TEXTO = 5000;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d || !HOJAS[d.actividad] || !d.campos) return salida({ ok: false, error: 'formato' });
    const c = d.campos;
    if (!String(c['Nombre'] || '').trim() || !String(c['Documento'] || '').trim()) return salida({ ok: false, error: 'identificacion' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const nombre = HOJAS[d.actividad];
    const hoja = ss.getSheetByName(nombre) || ss.insertSheet(nombre);

    // Evita duplicados si el navegador reintenta el mismo envío
    const props = PropertiesService.getScriptProperties();
    if (d.id && props.getProperty('id_' + d.id)) return salida({ ok: true, duplicado: true });

    const fila = Object.assign({ 'Recibido': new Date() }, c);
    let encabezados = hoja.getLastRow() ? hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0] : [];
    const nuevas = Object.keys(fila).filter(k => encabezados.indexOf(k) === -1);
    if (nuevas.length) {
      encabezados = encabezados.concat(nuevas);
      hoja.getRange(1, 1, 1, encabezados.length).setValues([encabezados]).setFontWeight('bold').setBackground('#e2d5ef');
      hoja.setFrozenRows(1);
    }
    hoja.appendRow(encabezados.map(k => limpiar(fila[k])));
    if (d.id) props.setProperty('id_' + d.id, '1');
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return salida({ ok: true, servicio: 'Respuestas · Módulo La Célula (Biología 5108)' });
}

function limpiar(v) {
  if (v === undefined || v === null) return '';
  if (v instanceof Date) return v;
  let s = String(v).slice(0, MAX_TEXTO);
  if (/^[=+\-@]/.test(s)) s = "'" + s;   // evita que un texto se interprete como fórmula
  return s;
}

function salida(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
