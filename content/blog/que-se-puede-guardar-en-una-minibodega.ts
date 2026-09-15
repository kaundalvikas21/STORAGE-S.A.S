// Qué se puede y qué no se puede guardar (tab 06: "answers a common pre-purchase question"). The allowed list
// restates the segment pages' use cases; the restricted list is the industry's usual one.
// PENDIENTE CONFIRMAR con el cliente: la lista exacta de objetos prohibidos de su contrato.
import type { ArticleContent } from "../articles";
import { company, sizes } from "../facts";

const [pequena] = sizes;

export const queSePuedeGuardar: ArticleContent = {
  body: [
    { type: "p", text: "Antes de alquilar una minibodega vale la pena saber qué puedes guardar y qué no. La regla general es sencilla: puedes guardar objetos que no se dañan con el tiempo y que no ponen en riesgo tu bodega ni las de los demás." },
    { type: "h2", text: "Lo que sí puedes guardar" },
    {
      type: "ul",
      items: [
        "Muebles de sala, alcoba y comedor.",
        "Electrodomésticos limpios, vacíos y secos.",
        "Cajas con ropa, libros, adornos y juguetes.",
        "Archivo y documentos de tu empresa.",
        "Inventario y mercancía de tu negocio.",
        "Herramienta y equipos de obra.",
        "Bicicletas y equipo deportivo.",
      ],
    },
    { type: "h2", text: "Lo que no se puede guardar" },
    { type: "p", text: "Por seguridad, estas son las restricciones habituales en una minibodega. Las condiciones exactas quedan en tu contrato:" },
    {
      type: "ul",
      mark: "x",
      items: [
        "Alimentos y productos perecederos.",
        "Materiales inflamables, combustibles o explosivos, como gasolina, cilindros de gas o pólvora.",
        "Productos químicos peligrosos o tóxicos.",
        "Armas y municiones.",
        "Sustancias ilícitas u objetos de procedencia ilegal.",
        "Animales y plantas vivas.",
        "Residuos y basuras.",
      ],
    },
    { type: "h2", text: "Por qué existen estas reglas" },
    { type: "p", text: "Una bodega es un espacio cerrado junto a otras bodegas. Un alimento que se descompone trae plagas que pasan a las bodegas vecinas, y un material inflamable pone en riesgo toda la sede. Las restricciones protegen tus cosas tanto como las de los demás. Por eso todas nuestras sedes cuentan con sensores de humo, además de CCTV 24/7 y registro individual de ingreso." },
    { type: "cta", intent: "cotizar", text: "¿Tienes dudas con algo puntual que quieres guardar? Cotiza y cuéntanos qué es antes de alquilar." },
    { type: "h2", text: "Casos que conviene consultar" },
    {
      type: "ul",
      items: [
        "Objetos de mucho valor, como joyas, dinero en efectivo u obras de arte: pregunta antes de guardarlos.",
        "Documentos originales que puedas necesitar con urgencia: guarda una copia a mano.",
        "Equipos con agua o combustible, como lavadoras o motores: vacíalos y sécalos antes de llevarlos.",
      ],
    },
    { type: "h2", text: "Prepara lo que vas a guardar" },
    { type: "p", text: "Lo que sí se puede guardar llega mejor si está limpio, seco y bien empacado. Antes de llevar tus cosas, revisa [cómo empacar muebles para almacenamiento prolongado](/blog/como-empacar-muebles/)." },
    { type: "p", text: `Y si solo vas a guardar cajas, archivo o el contenido de un apartamento de una alcoba, empieza por una bodega ${pequena.label} (${pequena.range}).` },
    { type: "h2", text: "Tu bodega, solo tuya" },
    { type: "p", text: `Cada bodega es independiente y se cierra con tu propio candado: tú decides qué entra y qué sale, en el horario de atención de tu sede (${company.hours}).` },
  ],
  next: {
    title: "¿Ya sabes qué vas a guardar?",
    body: "Conoce cómo funciona el bodegaje: tamaños desde 2 m³, siete sedes en Bogotá y contratos por meses sin permanencia mínima.",
    links: [{ label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" }],
  },
};
