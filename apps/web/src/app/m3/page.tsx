export default function M3Home() {
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Milestone 3 — Parcel Resolve & Map UX (Spec)</h1>
      <p className="text-gray-600">This is an isolated demo that won’t touch your existing routes.</p>

      <section className="rounded-2xl border p-6 bg-white">
        <h2 className="font-semibold mb-3">Home</h2>
        <p className="text-sm text-gray-600 mb-4">Try the search flow →</p>
        <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white" href="/m3/search">
          Open Search
        </a>
      </section>

      <section className="rounded-2xl border p-6 bg-white">
        <h2 className="font-semibold mb-3">Wireframes/Flows</h2>
        <ul className="list-disc ml-6 text-sm">
          <li>Search keys: survey_no, layout_name, door_no, coordinates, free-text (fuzzy)</li>
          <li>Map: hover summary, click → focus, bbox/zoom to selected parcel, highlight polygon</li>
          <li>Results panel: score badge, quick facts, tabs</li>
          <li>Details page per parcel</li>
        </ul>
      </section>
    </main>
  );
}
