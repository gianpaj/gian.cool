const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export function postPath(pubDate: Date, slug: string): string {
  const year = pubDate.getFullYear();
  const month = MONTHS[pubDate.getMonth()];
  const day = pubDate.getDate();
  return `/${year}/${month}/${day}/${slug}`;
}
