import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Briefcase,
  FileText,
  Trophy,
  Clock,
  XCircle,
  Plus,
  ExternalLink,
  TrendingUp,
} from 'lucide-react'
import { useJobStore, useCVStore, JOB_STATUSES } from '../store/useStore'
import StatusBadge from '../components/ui/StatusBadge'

function StatCard({ icon: Icon, label, value, color, bgColor }) {
  return (
    <div className={`p-5 bg-dark-900 border border-dark-700 rounded-xl`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-dark-400 text-sm font-medium">{label}</span>
        <div className={`w-9 h-9 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon size={18} className={color} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  )
}

export default function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { jobs } = useJobStore()
  const { cvs } = useCVStore()

  const counts = {
    total: jobs.length,
    wishlist: jobs.filter(j => j.status === 'wishlist').length,
    applied: jobs.filter(j => j.status === 'applied').length,
    interview: jobs.filter(j => j.status === 'interview' || j.status === 'phoneScreen' || j.status === 'oa').length,
    offer: jobs.filter(j => j.status === 'offer').length,
    rejected: jobs.filter(j => j.status === 'rejected').length,
  }

  const recentJobs = jobs.slice(0, 6)

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">{t('dashboard.title')}</h1>
        <p className="text-dark-400 text-sm">
          {t('dashboard.welcome')} — {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard
          icon={Briefcase}
          label={t('dashboard.totalApps')}
          value={counts.total}
          color="text-blue-400"
          bgColor="bg-blue-500/10"
        />
        <StatCard
          icon={Clock}
          label={t('dashboard.wishlist')}
          value={counts.wishlist}
          color="text-slate-400"
          bgColor="bg-slate-500/10"
        />
        <StatCard
          icon={TrendingUp}
          label={t('dashboard.applied')}
          value={counts.applied}
          color="text-indigo-400"
          bgColor="bg-indigo-500/10"
        />
        <StatCard
          icon={Briefcase}
          label={t('dashboard.interviewing')}
          value={counts.interview}
          color="text-yellow-400"
          bgColor="bg-yellow-500/10"
        />
        <StatCard
          icon={Trophy}
          label={t('dashboard.offers')}
          value={counts.offer}
          color="text-green-400"
          bgColor="bg-green-500/10"
        />
        <StatCard
          icon={XCircle}
          label={t('dashboard.rejected')}
          value={counts.rejected}
          color="text-red-400"
          bgColor="bg-red-500/10"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="xl:col-span-2 bg-dark-900 border border-dark-700 rounded-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-700">
            <h2 className="text-white font-semibold text-base">{t('dashboard.recentApplications')}</h2>
            <button
              onClick={() => navigate('/jobs')}
              className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
            >
              {t('dashboard.viewAll')}
            </button>
          </div>
          <div className="divide-y divide-dark-800">
            {recentJobs.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Briefcase size={32} className="text-dark-600 mx-auto mb-3" />
                <p className="text-dark-400 text-sm mb-4">{t('dashboard.noApplications')}</p>
                <button
                  onClick={() => navigate('/jobs')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  {t('dashboard.addFirst')}
                </button>
              </div>
            ) : (
              recentJobs.map(job => (
                <div key={job.id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-dark-800/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white text-sm font-medium truncate">{job.company}</span>
                      {job.websiteUrl && (
                        <a
                          href={job.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-500 hover:text-primary-400 transition-colors"
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                    <span className="text-dark-400 text-xs">{job.position}</span>
                  </div>
                  <StatusBadge status={job.status} />
                  <span className="text-dark-500 text-xs whitespace-nowrap">{formatDate(job.createdAt)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions + CV Summary */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-5">
            <h2 className="text-white font-semibold text-base mb-4">{t('dashboard.quickActions')}</h2>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/jobs')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg transition-all text-sm font-medium text-white group"
              >
                <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center">
                  <Plus size={16} className="text-primary-400" />
                </div>
                {t('dashboard.addJob')}
              </button>
              <button
                onClick={() => navigate('/cv')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg transition-all text-sm font-medium text-white group"
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-green-400" />
                </div>
                {t('dashboard.uploadCV')}
              </button>
            </div>
          </div>

          {/* CV Summary */}
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-base">{t('nav.cvManager')}</h2>
              <span className="text-dark-400 text-xs">{cvs.length} {t('landing.statsResumes')}</span>
            </div>
            {cvs.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-dark-400 text-xs mb-3">{t('cv.noCV')}</p>
                <button
                  onClick={() => navigate('/cv')}
                  className="text-primary-400 hover:text-primary-300 text-xs font-medium transition-colors"
                >
                  {t('cv.addFirst')}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {cvs.slice(0, 4).map(cv => (
                  <div key={cv.id} className="flex items-center gap-3 px-3 py-2 bg-dark-800 rounded-lg">
                    <FileText size={14} className="text-blue-400 flex-shrink-0" />
                    <span className="text-dark-200 text-xs font-medium truncate flex-1">{cv.name}</span>
                  </div>
                ))}
                {cvs.length > 4 && (
                  <button
                    onClick={() => navigate('/cv')}
                    className="text-primary-400 hover:text-primary-300 text-xs font-medium transition-colors w-full text-left pl-1"
                  >
                    +{cvs.length - 4} more
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Application Pipeline */}
          {jobs.length > 0 && (
            <div className="bg-dark-900 border border-dark-700 rounded-xl p-5">
              <h2 className="text-white font-semibold text-base mb-4">Pipeline</h2>
              <div className="space-y-2">
                {JOB_STATUSES.map(s => {
                  const count = jobs.filter(j => j.status === s.value).length
                  const pct = jobs.length ? Math.round((count / jobs.length) * 100) : 0
                  if (count === 0) return null
                  return (
                    <div key={s.value} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${s.color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={s.textColor}>{t(`status.${s.value}`)}</span>
                          <span className="text-dark-400">{count}</span>
                        </div>
                        <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                          <div className={`h-full ${s.color} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
