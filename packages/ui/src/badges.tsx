import { Pill } from './primitives'
import { differenceInDays } from 'date-fns'

export function RiskBadge({ score }: { score: number }) {
  const hue = 120 - Math.min(120, score * 12) // 0..120
  return (
    <Pill className="bg-amber-400/90 text-black">
      <span className="mr-2">Risk Score:</span><strong>{score.toFixed(1)}/10</strong>
    </Pill>
  )
}

export function AccessBadge({ access }: { access: 'PUBLIC'|'REQUEST'|'CONFIDENTIAL' }) {
  const style =
    access === 'PUBLIC' ? 'bg-green-100 text-green-700' :
    access === 'REQUEST' ? 'bg-yellow-100 text-yellow-800' :
    'bg-rose-100 text-rose-700'
  return <Pill className={style}>{access === 'REQUEST' ? 'Request (Fee)' : access}</Pill>
}

export function FreshnessBadge({ verifiedOn }: { verifiedOn?: string }) {
  if (!verifiedOn) return <Pill className="bg-gray-100 text-gray-700">Unverified</Pill>
  const days = Math.max(0, differenceInDays(new Date(), new Date(verifiedOn)))
  const stale = days > 90
  return (
    <Pill className={stale ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}>
      {stale ? `Stale • ${days}d` : `Fresh • ${days}d`}
    </Pill>
  )
}
