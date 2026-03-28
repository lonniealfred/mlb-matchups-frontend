export async function fetchScraperStatus() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/scraper/status`, {
    next: { revalidate: 10 },
  });
  return res.json();
}
