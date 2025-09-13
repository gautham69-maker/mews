import { Card } from '@satya/ui'
import MapPlaceholder from '../components/MapPlaceholder'

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-1">SATYA Portal</h1>
        <p className="text-slate-600">Search a layout by survey number or village</p>
        <div className="mt-3">
          <input
            placeholder="Enter survey no..."
            className="w-full rounded-xl border border-slate-300 bg-white/90 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none placeholder:text-slate-400"
          />
        </div>
      </Card>

      {/* Map + Legend */}
      <Card className="p-4">
        <div className="h-6 w-full bg-green-200 rounded-md" />

        <MapPlaceholder />
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">Approved</span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700">Pending</span>
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700">Unauthorized</span>
          <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700">Dispute</span>
        </div>
      </Card>

      {/* Quick facts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-2">Quick Facts</h2>
        <ul className="text-slate-700 space-y-1">
          <li><strong>Survey:</strong> 143/2</li>
          <li><strong>Layout:</strong> Green Meadows</li>
          <li><strong>Status:</strong> Approved</li>
          <li><strong>Village:</strong> Katteri</li>
        </ul>
      </Card>
    </div>
  )
}
