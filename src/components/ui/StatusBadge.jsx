import { useTranslation } from 'react-i18next'
import { JOB_STATUSES, useStatusStore } from '../../store/useStore'

export default function StatusBadge({ status }) {
  const { t } = useTranslation()
  const { customStatuses } = useStatusStore()

  const builtIn = JOB_STATUSES.find(s => s.value === status)
  if (builtIn) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${builtIn.color} ${builtIn.textColor}`}>
        {t(`status.${status}`)}
      </span>
    )
  }

  const custom = customStatuses.find(s => s.id === status)
  const config = custom || { label: status, color: 'bg-slate-500', textColor: 'text-slate-300' }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.textColor}`}>
      {config.label}
    </span>
  )
}
