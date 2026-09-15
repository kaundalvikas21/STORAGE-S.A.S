// Copy for the two conversion pages (spec T7). Plain strings so each object maps 1:1 to an ACF
// field group; components never hardcode prose.

export const quotePage = {
  crumb: "Cotizar",
  h1: "Cotiza tu espacio",
  lead: "Cuéntanos qué necesitas guardar y en qué zona. Te enviamos una propuesta con la sede y el tamaño que mejor se ajustan.",
  sede: { label: "Sede de interés", placeholder: "Elige una sede", nearest: "La más cercana a mí" },
  tamano: { label: "Tamaño aproximado", unsure: "No estoy seguro", unsureHint: "Te ayudamos a definirlo", calcLink: "Calcular mi espacio" },
  cuando: { label: "¿Cuándo lo necesitas?" },
  contacto: { label: "Nombre y celular", nombre: "Nombre", celular: "Celular", celularHint: "Ej: 300 123 4567" },
  submit: "Enviar y continuar por WhatsApp",
  sending: "Enviando",
  done: "Listo. Seguimos la conversación por WhatsApp con tus respuestas.",
  // The wireframe's "menos de X minutos" is PENDIENTE CONFIRMAR, so the line promises hours only.
  response: "Te respondemos por WhatsApp en horario de atención:",
  consent: "Al enviar aceptas la",
  consentLink: "política de tratamiento de datos",
  railTitle: "Storage S.A.S en cifras",
};

export const calcPage = {
  crumb: "Calculadora de espacio",
  h1: "Calcula el espacio que necesitas",
  intro:
    "Suma los muebles, electrodomésticos y cajas que quieres guardar y te decimos qué tamaño de bodega necesitas. Cada objeto muestra su volumen aproximado en m³, así ves de dónde sale el resultado. Después cotizas con ese tamaño ya elegido.",
  total: "Total estimado:",
  band: "Bodega",
  empty: "Agrega tus objetos para ver el tamaño recomendado.",
  availability: "Te confirmamos disponibilidad en la sede que elijas.",
  cta: "Ver mi cotización",
  faqTitle: "Preguntas sobre el tamaño",
};
