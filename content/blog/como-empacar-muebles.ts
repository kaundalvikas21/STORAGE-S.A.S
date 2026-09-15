// Cómo empacar muebles (tab 06: links up to /empaque-y-embalaje/). That page is silo 3 and not built yet, so
// the up-link goes to the hogar segment (silo 1, long-term furniture storage). SWAP when /empaque-y-embalaje/ ships.
// Packing advice is general practice; the only company facts are facts.ts securityLine and hours.
import type { ArticleContent } from "../articles";
import { company, securityLine } from "../facts";

export const comoEmpacar: ArticleContent = {
  body: [
    { type: "p", text: "Guardar muebles varios meses no es lo mismo que moverlos de un apartamento a otro. En un trasteo el empaque protege unas horas; en una bodega protege semanas o meses. Un buen empaque evita rayones, polvo y piezas perdidas el día que vuelves por tus cosas." },
    { type: "h2", text: "Antes de empacar, limpia y seca todo" },
    { type: "p", text: "Limpia cada mueble antes de guardarlo: el polvo y los restos de comida atraen plagas y dejan manchas con el tiempo. Deja secar por completo la madera, los tapizados y los electrodomésticos. La nevera y la lavadora deben quedar vacías, desconectadas y secas por dentro antes de cerrarlas." },
    { type: "h2", text: "Desarma lo que se pueda" },
    { type: "p", text: "Una cama, una mesa de comedor o una biblioteca desarmadas ocupan mucho menos volumen y resisten mejor los golpes. Quita patas, entrepaños, cabeceros y puertas removibles." },
    {
      type: "ul",
      items: [
        "Guarda tornillos y herrajes en una bolsa marcada con el nombre del mueble.",
        "Pega la bolsa con cinta a la pieza principal para que no se pierda.",
        "Toma una foto del mueble antes de desarmarlo: te ahorra tiempo al volver a armarlo.",
      ],
    },
    { type: "h2", text: "Protege cada material a su manera" },
    {
      type: "ul",
      items: [
        "Madera: cúbrela con mantas o sábanas. Evita envolverla directamente en plástico por largos periodos, porque el plástico guarda la humedad.",
        "Tapizados: usa fundas de tela o sábanas limpias que dejen respirar la tela.",
        "Vidrios y espejos: protege las esquinas con cartón, márcalos como frágiles y guárdalos de pie, nunca debajo de otras cosas.",
        "Colchones: métalos en una funda contra el polvo y no pongas objetos pesados encima.",
        "Electrodomésticos: limpios y secos, con la puerta entreabierta para que circule el aire.",
      ],
    },
    { type: "cta", intent: "calcular", text: "Desarmar reduce el volumen. Suma tus muebles en la calculadora y conoce el tamaño de bodega que necesitas." },
    { type: "h2", text: "Cajas firmes, llenas y rotuladas" },
    { type: "p", text: "Usa cajas de cartón resistentes y, si puedes, del mismo tamaño: se apilan mejor y no se hunden. Llénalas por completo y rellena los espacios con papel para que no se aplasten. Lo pesado va en cajas pequeñas; lo liviano y voluminoso, en las grandes." },
    { type: "p", text: "Rotula cada caja por dos lados con su contenido. Si vas a necesitar algo mientras tus cosas están guardadas, márcalo de forma distinta para dejarlo cerca de la puerta." },
    { type: "h2", text: "Cómo acomodar los muebles en la bodega" },
    {
      type: "ul",
      items: [
        "Los muebles grandes y pesados, al fondo y contra las paredes.",
        "Las cajas pesadas abajo y las livianas arriba.",
        "Un pasillo libre para llegar al fondo sin mover todo.",
        "Lo más delicado, levantado del piso sobre estibas o tablas.",
      ],
    },
    { type: "p", text: "Para sacarle provecho a cada metro cúbico, lee [cómo organizar tu bodega](/blog/como-organizar-tu-bodega/)." },
    { type: "h2", text: "Tus muebles, bajo tu candado" },
    { type: "p", text: `${securityLine} Entras en el horario de atención de tu sede (${company.hours}) cuando necesites sacar o guardar algo.` },
  ],
  next: {
    title: "¿Vas a guardar los muebles de tu casa?",
    body: "Minibodegas por meses y sin permanencia mínima, desde unas cajas hasta el contenido de una casa completa.",
    links: [{ label: "Minibodegas para hogar", href: "/minibodegas-para-hogar/" }],
  },
};
