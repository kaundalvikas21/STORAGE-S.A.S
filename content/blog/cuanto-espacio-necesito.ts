// ¿Cuánto espacio necesito? (tab 06: links up to the size pages and the calculator). Piece volumes come from
// lib/calculator.ts ITEMS and bands from facts.ts sizes, so the article can never disagree with the tool.
// SWAP (T8): add the four size pages to `next.links` when /bodegas-pequenas/ and its siblings ship.
import { ITEMS } from "../../lib/calculator";
import type { ArticleContent } from "../articles";
import { CALC_URL, sizes } from "../facts";

const items = Object.values(ITEMS).flat();
const volume = (id: string) => {
  const it = items.find((i) => i.id === id);
  if (!it) throw new Error(`Unknown calculator item ${id}`);
  return `${it.name}: ${it.m3.toLocaleString("es-CO")} m³.`;
};
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const cuantoEspacio: ArticleContent = {
  body: [
    { type: "p", text: "Es la primera pregunta de casi todos los que buscan una bodega. Si te quedas corto, tienes que cambiar de bodega a mitad del proceso. Si te pasas, pagas cada mes por espacio vacío. El cálculo es sencillo cuando sabes cuánto ocupa cada cosa." },
    { type: "h2", text: "Por qué las bodegas se miden en m³" },
    { type: "p", text: "Una bodega tiene largo, ancho y alto, así que su tamaño se expresa en metros cúbicos: el volumen que puedes llenar, no solo el piso que ocupas. Un metro cúbico es un cubo de un metro por cada lado. Cuando apilas cajas firmes o pones un clóset de pie, usas la altura y necesitas menos piso." },
    { type: "h2", text: "Cuánto ocupa lo que vas a guardar" },
    { type: "p", text: "Estas son referencias aproximadas por pieza, las mismas que usa nuestra calculadora de espacio:" },
    { type: "ul", items: ["sofa-3", "cama-doble", "closet", "comedor-6", "nevera", "lavadora", "escritorio", "caja-mediana"].map(volume) },
    { type: "p", text: "Suma tus piezas y el total te dice qué tamaño buscar. No cuentes solo los muebles grandes: las sillas, los electrodomésticos pequeños y sobre todo las cajas suman más de lo que parece." },
    { type: "h2", text: "Los cuatro tamaños de bodega" },
    { type: "p", text: "En Storage S.A.S las bodegas se agrupan en cuatro tamaños, cada uno pensado para una situación:" },
    { type: "ul", items: sizes.map((s) => `${s.name} (${s.range}): ${lower(s.fits)}.${s.differential ? ` ${s.hint}.` : ""}`) },
    { type: "p", text: "Si tu total queda entre dos tamaños, elige el siguiente. Así tus cosas caben con espacio para moverte y puedes sacar una caja sin desacomodar todo." },
    { type: "cta", intent: "calcular", text: "¿Prefieres no sumar a mano? La calculadora cuenta tus muebles por habitación y te dice el tamaño recomendado." },
    { type: "h2", text: "Referencias rápidas según tu situación" },
    {
      type: "ul",
      items: [
        "Algunas cajas y maletas: de 2 a 5 m³.",
        "El contenido de un apartaestudio: de 6 a 10 m³.",
        "Un apartamento de dos alcobas: de 15 a 20 m³.",
        "Un apartamento de tres o más alcobas, o una casa: de 25 a 60 m³.",
      ],
    },
    { type: "h2", text: "Tres errores comunes al calcular" },
    {
      type: "ul",
      items: [
        "Olvidar la altura. Apilar cajas del mismo tamaño y guardar los muebles de pie reduce el piso que necesitas.",
        "Contar solo los muebles. Un apartamento llena muchas más cajas de las que imaginas, y cada una suma volumen.",
        "No dejar pasillo. Si vas a entrar a sacar cosas, deja un espacio libre para llegar al fondo sin mover todo.",
      ],
    },
    { type: "h2", text: "Si lo que guardas cambia" },
    { type: "p", text: "El volumen de un trasteo o de un inventario no siempre es fijo. En Storage S.A.S pagas por meses, sin permanencia mínima, y cambias de tamaño cuando lo necesites, según la disponibilidad de tu sede. Si lo tuyo supera los 60 m³, cotizamos un espacio personalizado con visita técnica." },
    { type: "p", text: `Cuando tengas tu lista, confirma el total en la [calculadora de espacio](${CALC_URL}) y cotiza con el tamaño que te recomienda.` },
  ],
  next: {
    title: "¿Ya tienes tu total?",
    body: "Compara los tamaños y las sedes de Storage S.A.S en Bogotá, o suma tus muebles uno por uno para confirmar el tamaño recomendado.",
    links: [
      { label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" },
      { label: "Ir a la calculadora", href: CALC_URL },
    ],
  },
};
