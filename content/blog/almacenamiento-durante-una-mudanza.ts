// Almacenamiento durante una mudanza (tab 06: "the bridge article between the two silos"), so it is the one
// post that links to both pillars. Service facts restate content/mudanzas.ts; storage facts restate facts.ts.
import type { ArticleContent } from "../articles";
import { CALC_URL, sizes } from "../facts";

const [pequena, mediana] = sizes;

export const almacenamientoMudanza: ArticleContent = {
  body: [
    { type: "p", text: "Pocas mudanzas salen perfectas. El apartamento nuevo se entrega una semana después, la remodelación se alarga o el lugar nuevo es más pequeño que el anterior. En esos casos, coordinar el trasteo con una bodega evita cargar el mismo camión dos veces y con prisa." },
    { type: "h2", text: "Cuándo necesitas almacenamiento en una mudanza" },
    {
      type: "ul",
      items: [
        "Las fechas no coinciden: entregas un lugar antes de recibir el otro.",
        "Vas a remodelar antes de instalarte y los muebles estorban la obra.",
        "Te mudas a un espacio más pequeño y todavía no decides qué hacer con lo que sobra.",
        "Viajas o te trasladas por un tiempo y piensas volver.",
      ],
    },
    { type: "h2", text: "Planea la mudanza en dos etapas" },
    { type: "p", text: "Piensa la mudanza como dos viajes: uno del lugar actual a la bodega y otro de la bodega al lugar nuevo. Si lo planeas así desde el principio, empacas y rotulas pensando en ambos." },
    {
      type: "ul",
      items: [
        "Separa lo que llevas directo al lugar nuevo de lo que va a la bodega.",
        "Rotula las cajas de la bodega con un color o una marca distinta.",
        "Deja cerca de la puerta de la bodega lo que vas a necesitar primero cuando te instales.",
      ],
    },
    { type: "h2", text: "Calcula dos volúmenes, no uno" },
    { type: "p", text: `Mide por separado lo que va a la bodega. Ese volumen define el tamaño que necesitas, y no tiene que ser el de toda la casa. Como guía, el contenido de un apartaestudio cabe en una bodega ${pequena.label} (${pequena.range}) y el de un apartamento de dos alcobas en una ${mediana.label} (${mediana.range}).` },
    { type: "cta", intent: "calcular", text: "Suma en la calculadora solo lo que va a la bodega y conoce el tamaño que necesitas." },
    { type: "h2", text: "Coordina las fechas con tiempo" },
    { type: "p", text: "Cotiza la mudanza y la bodega antes de fijar el día del trasteo. Así sabes que la bodega está lista cuando llega el camión, y que el viaje de salida coincide con la entrega del lugar nuevo." },
    { type: "p", text: "Como la bodega se paga por meses y sin permanencia mínima, no necesitas saber de antemano cuánto va a durar la espera. Si se alarga, sigues guardando; si termina antes, retiras tus cosas." },
    { type: "h2", text: "Una sola empresa para las dos cosas" },
    { type: "p", text: "Storage S.A.S opera en Bogotá desde 2011 con los dos servicios: [mudanzas y trasteos](/mudanzas-bogota/) para hogares y oficinas, y [minibodegas](/bodegaje-bogota/) en siete puntos de la ciudad, con Autopista Norte con Calle 197 a la entrada desde la Sabana. Coordinar ambos con la misma empresa te ahorra cuadrar horarios entre dos proveedores." },
    { type: "h2", text: "El día que sacas tus cosas" },
    {
      type: "ul",
      items: [
        "Revisa contra tu lista que cada caja rotulada suba al camión.",
        "Arma primero las camas y conecta los electrodomésticos: lo demás puede esperar.",
        "Antes de retirar tu candado, confirma que no quedó nada en la bodega.",
      ],
    },
    { type: "p", text: `Si todavía no sabes cuánto vas a guardar, empieza por la [calculadora de espacio](${CALC_URL}).` },
  ],
  next: {
    title: "¿Te mudas pronto?",
    body: "Cotiza tu trasteo en Bogotá y, si el lugar nuevo no está listo, guarda tus cosas en una minibodega con tu propio candado.",
    links: [
      { label: "Mudanzas y trasteos en Bogotá", href: "/mudanzas-bogota/" },
      { label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" },
    ],
  },
};
