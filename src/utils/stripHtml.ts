export function stripHtml(html: string) {
  return html
    .replace(/<\/(p|div|h[1-6]|li)\s*>|<br\b[^>]*>/gi, " ") // 문단 사이 띄어쓰기 (속성 있는 <br class="..."> 포함)
    .replace(/<[^>]+>/g, "") // 나머지 태그 제거
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
