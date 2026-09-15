// /contacto/ copy (spec T6 Info, targets "contacto storage bogotá"). metaTitle, description and h1 are
// the spec's strings. NAP comes from facts.ts only (must match the Google Business Profiles, Open Item 7).
// No raw WhatsApp link (R4): the form hands off to WhatsApp after the lead is recorded. The spec's
// response-time commitment stays out while it is PENDIENTE CONFIRMAR (facts.ts reassurance).
import { company } from "./facts";

export const contactoPage = {
  path: "/contacto/",
  metaTitle: "Contacto | Storage S.A.S Minibodegas Bogotá",
  description: "Escríbenos por WhatsApp, llámanos o visita cualquiera de nuestras 7 sedes en Bogotá. Atención de lunes a sábado.",
  crumb: "Contacto",
  h1: "Contáctanos",
  intro: `Déjanos tus datos en el formulario y seguimos la conversación por WhatsApp con tus respuestas. También puedes llamarnos o visitar cualquiera de nuestras 7 sedes en Bogotá, de lunes a sábado: ${company.hours}.`,
  railTitle: "Otros canales",
  phone: "Teléfono",
  email: "Correo",
  whatsapp: "WhatsApp",
  whatsappNote: "Escríbenos desde el formulario",
  hours: "Horario de atención",
  sedesTitle: "Nuestras 7 sedes",
};
