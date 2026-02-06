const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export function postPath(pubDate: Date, slug: string): string {
  const year = pubDate.getFullYear();
  const month = MONTHS[pubDate.getMonth()];
  const day = String(pubDate.getDate()).padStart(2, "0");
  const encodedSlug = encodeURIComponent(slug);
  return `/${year}/${month}/${day}/${encodedSlug}`;
}
