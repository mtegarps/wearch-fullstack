import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wearch.id'
  
  // Tambahkan HANYA halaman yang SUDAH ADA di website kamu
  // Kalau halaman belum dibuat, hapus dulu dari list ini
  const routes = [
    '',  // Homepage (wearch.id)
    // '/layanan',               // Uncomment kalau udah bikin halaman ini
    // '/portofolio',            // Uncomment kalau udah bikin halaman ini
    // '/tentang-kami',          // Uncomment kalau udah bikin halaman ini
    // '/kontak',                // Uncomment kalau udah bikin halaman ini
    // '/area-layanan/bandung',  // Uncomment kalau udah bikin halaman ini
    // '/area-layanan/bogor',    // Uncomment kalau udah bikin halaman ini
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}