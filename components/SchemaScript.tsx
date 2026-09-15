/** JSON-LD injector (one per schema block). `<` is escaped so no content string can close the tag. */
export default function SchemaScript({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
