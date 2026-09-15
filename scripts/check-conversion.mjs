// Self-check for the framework-free logic (lib/calculator.ts, lib/lead.ts, lib/articles.ts).
// Run: node --experimental-strip-types scripts/check-conversion.mjs
import assert from "node:assert/strict";
import { headingId, readingMinutes, splitLinks } from "../lib/articles.ts";
import { ITEMS, computeTotal, mapToBand } from "../lib/calculator.ts";
import { buildWhatsAppMessage, buildWhatsAppUrl, normalizeCelular, validateLead } from "../lib/lead.ts";

const bands = [
  { id: "pequena", maxM3: 10 },
  { id: "mediana", maxM3: 20 },
  { id: "grande", maxM3: 60 },
  { id: "personalizada", maxM3: Infinity },
];
const band = (t) => mapToBand(t, bands)?.id ?? null;
assert.equal(band(0), null);
assert.equal(band(0.05), "pequena");
assert.equal(band(10), "pequena");
assert.equal(band(12), "mediana"); // gap 10-15 rounds up
assert.equal(band(60), "grande");
assert.equal(band(61), "personalizada");

assert.equal(computeTotal({}), 0);
assert.equal(computeTotal({ "sofa-3": 2, "caja-pequena": 3 }), 4.2); // 4 + 0.15, one decimal
assert.equal(new Set(Object.values(ITEMS).flat().map((i) => i.id)).size, Object.values(ITEMS).flat().length, "item ids unique");

assert.equal(normalizeCelular("300 123 4567"), "3001234567");
assert.equal(normalizeCelular("+57 300 123 4567"), "3001234567");
assert.equal(normalizeCelular("601 123 4567"), "");
assert.equal(normalizeCelular("30012345"), "");

const known = { sedes: ["autopista-norte-197"], tamanos: ["mediana"] };
const ok = { sede: "autopista-norte-197", tamano: "mediana", cuando: "este-mes", nombre: " Diana ", celular: "3001234567" };
assert.deepEqual(validateLead(ok, known), {});
assert.deepEqual(Object.keys(validateLead({ sede: "x", tamano: "", cuando: "", nombre: "", celular: "12" }, known)).sort(), ["celular", "cuando", "nombre", "sede", "tamano"]);
assert.deepEqual(validateLead({ ...ok, sede: "mas-cercana", tamano: "no-seguro" }, known), {});

const labels = { sedeName: "Autopista Norte", bandLabel: "mediana", phone: "+57 314 404 2043" };
assert.equal(buildWhatsAppMessage(ok, labels), "Hola, soy Diana. Necesito una bodega mediana en la sede Autopista Norte, la necesito este mes.");
assert.equal(
  buildWhatsAppMessage({ ...ok, sede: "mas-cercana", tamano: "no-seguro", cuando: "ya" }, labels),
  "Hola, soy Diana. Necesito una bodega (tamaño por definir) en la sede más cercana, la necesito ya.",
);
const url = new URL(buildWhatsAppUrl(ok, labels));
assert.equal(url.origin + url.pathname, "https://wa.me/573144042043");
assert.equal(url.searchParams.get("text"), buildWhatsAppMessage(ok, labels));

assert.deepEqual(splitLinks("Usa la [calculadora](/calculadora-de-espacio/) hoy."), [
  { text: "Usa la " },
  { text: "calculadora", href: "/calculadora-de-espacio/" },
  { text: " hoy." },
]);
assert.deepEqual(splitLinks("Sin enlaces"), [{ text: "Sin enlaces" }]);
assert.deepEqual(splitLinks("[a](/b/) y [c](/d/)"), [{ text: "a", href: "/b/" }, { text: " y " }, { text: "c", href: "/d/" }]);
assert.equal(headingId("Por qué las bodegas se miden en m³"), "por-que-las-bodegas-se-miden-en-m3");
assert.equal(headingId("Cajas firmes, llenas y rotuladas"), "cajas-firmes-llenas-y-rotuladas");
assert.equal(headingId("¿Tu bodega se quedó pequeña?"), "tu-bodega-se-quedo-pequena");
assert.equal(readingMinutes([]), 1);
assert.equal(readingMinutes([{ text: "palabra ".repeat(200) }]), 1);
assert.equal(readingMinutes([{ text: "palabra ".repeat(201) }]), 2);
assert.equal(readingMinutes([{ text: "palabra ".repeat(199) }, { items: ["[dos palabras](/x/)"] }]), 2); // a link counts as its label

console.log("check-conversion: ok");
