'use client'

import { useState } from 'react'

export function Tabs({
  tabs, defaultTab, children
}: {
  tabs: { id: string; label: string }[]
  defaultTab: string
  children: (ctx: { active: string }) => React.ReactNode
}) {
  const [active, setActive] = useState(defaultTab)
  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-xl border px-3 py-2 text-sm ${
              active === t.id ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {children({ active })}
    </div>
  )
}
