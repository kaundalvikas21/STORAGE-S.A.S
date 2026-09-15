// Cómo organizar tu bodega (tab 06: "retention content for existing customers"). Up-link to the pillar; the
// change-of-size paragraph restates faqs.ts ("¿Puedo cambiar de tamaño?"). Organizing advice is general practice.
import type { ArticleContent } from "../articles";

export const comoOrganizar: ArticleContent = {
  body: [
    { type: "p", text: "Una bodega bien organizada guarda más y te deja encontrar lo que necesitas sin sacar todo. Si ya tienes tu bodega o estás por llevar tus cosas, estas ideas te ayudan a aprovechar cada metro cúbico." },
    { type: "h2", text: "Planea antes de cargar" },
    { type: "p", text: "Haz una lista de lo que vas a guardar y separa lo que vas a necesitar pronto de lo que puede quedarse meses sin moverse. Esa separación define el orden: lo de uso frecuente, cerca de la puerta; lo que no vas a tocar, al fondo." },
    { type: "h2", text: "Usa la altura" },
    { type: "p", text: "El tamaño de una bodega se mide en metros cúbicos, no solo en piso. Apilar bien es la forma más simple de ganar espacio." },
    {
      type: "ul",
      items: [
        "Apila cajas del mismo tamaño, las pesadas abajo y las livianas arriba.",
        "Pon de pie contra la pared las piezas largas, como tablas de mesa y cabeceros.",
        "Una estantería metálica convierte la altura en repisas y evita que las cajas de abajo carguen todo el peso.",
        "Aprovecha los cajones de cómodas y clósets para guardar cosas livianas.",
      ],
    },
    { type: "h2", text: "Deja un pasillo" },
    { type: "p", text: "Un pasillo al centro o a un lado te deja llegar al fondo sin mover todo. Pierdes un poco de volumen, pero ganas tiempo cada vez que entras." },
    { type: "cta", intent: "calcular", text: "Si tus cosas ya no caben con orden, la calculadora te dice qué tamaño necesitas ahora." },
    { type: "h2", text: "Rotula y lleva un inventario" },
    {
      type: "ul",
      items: [
        "Rotula cada caja por al menos dos lados con su contenido.",
        "Numera las cajas y anota en el celular qué hay en cada una.",
        "Toma una foto de la bodega organizada: te recuerda dónde quedó cada cosa.",
      ],
    },
    { type: "h2", text: "Protege lo que guardas" },
    {
      type: "ul",
      items: [
        "Levanta del piso cajas y muebles con estibas o tablas.",
        "Deja un espacio pequeño entre tus cosas y las paredes para que circule el aire.",
        "No guardes nada húmedo: limpia y seca antes de cargar.",
      ],
    },
    { type: "p", text: "Si todavía vas a empacar, revisa [cómo empacar muebles para almacenamiento prolongado](/blog/como-empacar-muebles/)." },
    { type: "h2", text: "Para negocios, ordena por rotación" },
    { type: "p", text: "Si guardas inventario o archivo, ordena según la frecuencia con la que sacas cada referencia. Lo que rota cada semana va adelante y a la altura de la mano; el archivo inactivo y la mercancía de temporada, al fondo y arriba." },
    { type: "h2", text: "Cuando el espacio se queda corto" },
    { type: "p", text: "Si la bodega se llenó, no tienes que apretar más. Pagas por meses, sin permanencia mínima, y puedes pasar a un tamaño mayor según la disponibilidad de tu sede. También puedes pasar a uno menor si ya sacaste parte de tus cosas." },
  ],
  next: {
    title: "¿Tu bodega se quedó pequeña?",
    body: "Conoce los tamaños y las siete sedes de Storage S.A.S en Bogotá, con Autopista Norte con Calle 197 a la entrada desde la Sabana.",
    links: [{ label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" }],
  },
};
