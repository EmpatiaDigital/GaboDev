export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white p-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">aca es homepage</h1>
        <p className="text-gray-700 mb-6">Página de inicio ejemplo para una app Next.js — lista para copiar en <code>app/page.jsx</code> o <code>pages/index.jsx</code>.</p>
        <div className="flex justify-center gap-3">
          <a
            href="#"
            className="px-4 py-2 rounded-lg border border-sky-200 hover:bg-sky-50 transition"
          >
            Ver más
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:opacity-90 transition"
          >
            Contacto
          </a>
        </div>
      </div>
    </main>
  );
}
