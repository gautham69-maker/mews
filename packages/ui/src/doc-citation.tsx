import { FileText } from 'lucide-react'
import { AccessBadge, FreshnessBadge } from './badges'

export function DocCitation({
  access, docType, deptName, issuedOn, verifiedOn, href
}: {
  access: 'PUBLIC'|'REQUEST'|'CONFIDENTIAL'
  docType: string
  deptName: string
  issuedOn: string
  verifiedOn?: string
  href?: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
          <FileText className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <div className="font-medium">{docType.replaceAll('_',' ')}</div>
          <div className="text-sm text-gray-600">{deptName} • Issued {issuedOn}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <AccessBadge access={access} />
        <FreshnessBadge verifiedOn={verifiedOn} />
        {href && <a className="text-sm text-blue-700 underline" href={href}>Open</a>}
      </div>
    </div>
  )
}
