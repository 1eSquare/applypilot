import { useTranslation } from 'react-i18next'
import { JOB_STATUSES } from '../../store/useStore'

export default function StatusBadge({ status }) {
  const { t } = useTranslation()
  const config = JOB_STATUSES.find(s => s.value === status) || JOB_STATUSES[0]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.textColor}`}>
      {t(`status.${status}`)}
    </span>
  )
}
