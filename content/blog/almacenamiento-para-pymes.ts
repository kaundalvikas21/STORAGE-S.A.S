// Almacenamiento para pymes (tab 06: links up to /minibodegas-para-empresas/). No prices on either side of the
// comparison (Open Item 4): the article teaches how to do the sum and ends in the quote. Size guidance restates
// the empresas segment recommender rows.
import type { ArticleContent } from "../articles";
import { company, sizes } from "../facts";

const [pequena, mediana, grande] = sizes;

export const almacenamientoPymes: ArticleContent = {
  body: [
    { type: "p", text: "En muchas pymes la oficina se va llenando de cosas que no producen: cajas de archivo, mercancía de temporada, muebles de un proyecto que terminó. Cada metro cuadrado que ocupan es espacio que pagas en el arriendo y que tu equipo no usa." },
    { type: "h2", text: "Señales de que tu oficina se volvió bodega" },
    {
      type: "ul",
      items: [
        "Hay una oficina o un cuarto que solo guarda archivo.",
        "El inventario ocupa pasillos o puestos de trabajo.",
        "Estás pensando en arrendar un espacio más grande solo para almacenar.",
        "Tienes mobiliario sin uso esperando un proyecto o una nueva sede.",
      ],
    },
    { type: "h2", text: "Por qué guardar en la oficina sale caro" },
    { type: "p", text: "Una oficina se paga por su ubicación, sus acabados y sus servicios: recepción, parqueadero, conectividad. Nada de eso le sirve a una caja de archivo. Guardar en la oficina es pagar comodidades que tus cosas no usan." },
    { type: "p", text: "Una minibodega cobra por el espacio que guardas. Cuando lo almacenado ocupa una parte importante de la oficina, vale la pena comparar lo que te cuesta ese espacio con el valor de una bodega de su tamaño." },
    { type: "h2", text: "Cómo hacer la cuenta" },
    {
      type: "ul",
      items: [
        "Mide el área de la oficina que hoy ocupa lo almacenado y calcula qué parte de tu arriendo representa.",
        "Suma lo que guardas en la calculadora para conocer el tamaño de bodega que necesitarías.",
        "Cotiza ese tamaño y compara los dos valores mes a mes.",
        "Suma lo que ganas: un puesto de trabajo, una sala de reuniones o un local más ordenado.",
      ],
    },
    { type: "cta", intent: "calcular", text: "Suma tu archivo, inventario y mobiliario en la calculadora y conoce el tamaño de bodega que necesita tu empresa." },
    { type: "h2", text: "Qué tamaño suele necesitar una empresa" },
    {
      type: "ul",
      items: [
        `Archivo, papelería y material de mercadeo: una bodega ${pequena.label} (${pequena.range}).`,
        `El mobiliario de una oficina pequeña o el surtido de un local: una bodega ${mediana.label} (${mediana.range}).`,
        `Inventario en estibas o el mobiliario de una sede completa: una bodega ${grande.label} (${grande.range}).`,
        "Oficinas e industria con más de 60 m³: un espacio personalizado, que se cotiza con visita técnica.",
      ],
    },
    { type: "h2", text: "Flexibilidad para una operación que cambia" },
    { type: "p", text: "Arrendar una oficina más grande suele comprometerte por años. Con una minibodega pagas por meses, sin permanencia mínima, y cambias de tamaño cuando lo necesites según la disponibilidad de la sede: más espacio en temporada alta, menos cuando baja." },
    { type: "h2", text: "Control sobre lo que guardas" },
    { type: "p", text: "La bodega se cierra con el candado de tu empresa, cada ingreso queda registrado y el CCTV 24/7 acompaña cada visita. Autopista Norte con Calle 197 tiene acceso vehicular para cargar y descargar, y Paloquemao queda en el centro, cerca del comercio." },
    { type: "h2", text: "Cuándo no conviene" },
    { type: "p", text: `Si consultas lo almacenado varias veces al día, tenerlo a mano en la oficina puede valer lo que cuesta. La bodega funciona mejor para lo que usas cada semana, cada mes o por temporadas, porque entras en el horario de atención de la sede: ${company.hours}.` },
  ],
  next: {
    title: "Espacio para tu empresa",
    body: "Bodegas por meses para inventario, archivo y mobiliario, desde bodegas pequeñas hasta espacios personalizados de más de 60 m³.",
    links: [{ label: "Minibodegas para empresas", href: "/minibodegas-para-empresas/" }],
  },
};
