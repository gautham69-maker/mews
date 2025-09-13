export function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-xl bg-gray-50 p-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  )
}
