// Article bodies keyed by slug (content/articles.ts holds the light index). Imported by pages only, never
// by a client component, so no browser bundle carries post bodies.
import type { ArticleContent, ArticleSlug } from "../articles";
import { almacenamientoMudanza } from "./almacenamiento-durante-una-mudanza";
import { almacenamientoPymes } from "./almacenamiento-para-pymes";
import { comoEmpacar } from "./como-empacar-muebles";
import { comoOrganizar } from "./como-organizar-tu-bodega";
import { cuantoEspacio } from "./cuanto-espacio-necesito";
import { queSePuedeGuardar } from "./que-se-puede-guardar-en-una-minibodega";

export const articleContent: Record<ArticleSlug, ArticleContent> = {
  "cuanto-espacio-necesito": cuantoEspacio,
  "como-empacar-muebles": comoEmpacar,
  "almacenamiento-durante-una-mudanza": almacenamientoMudanza,
  "que-se-puede-guardar-en-una-minibodega": queSePuedeGuardar,
  "almacenamiento-para-pymes": almacenamientoPymes,
  "como-organizar-tu-bodega": comoOrganizar,
};
