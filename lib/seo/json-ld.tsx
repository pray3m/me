interface JsonLdProps {
  /** A schema.org object, e.g. from `rootGraph()` or `breadcrumbSchema()`. */
  data: object
}

/**
 * Renders a JSON-LD `<script>`, encapsulating the one place we need
 * `dangerouslySetInnerHTML` so call sites stay clean.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be serialized into a script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
