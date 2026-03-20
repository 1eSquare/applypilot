import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Plus,
  ExternalLink,
  Trash2,
  Pencil,
  Search,
  Briefcase,
  FileText,
  X,
} from 'lucide-react'
import { useJobStore, useCVStore, JOB_STATUSES } from '../store/useStore'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import StatusBadge from '../components/ui/StatusBadge'

const EMPTY_JOB = {
  company: '',
  position: '',
  status: 'wishlist',
  websiteUrl: '',
  cvId: '',
  notes: '',
}

function JobForm({ initial, cvs, onSave, onCancel }) {
  const { t } = useTranslation()
  const [form, setForm] = useState(initial || EMPTY_JOB)

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const valid = form.company.trim() && form.position.trim()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('jobs.company')} *</label>
          <input
            type="text"
            value={form.company}
            onChange={e => set('company', e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
            placeholder="Google, Meta, ..."
          />
        </div>
        <div>
          <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('jobs.position')} *</label>
          <input
            type="text"
            value={form.position}
            onChange={e => set('position', e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
            placeholder="Software Engineer, PM, ..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('jobs.status')}</label>
          <select
            value={form.status}
            onChange={e => set('status', e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white text-sm outline-none transition-colors"
          >
            {JOB_STATUSES.map(s => (
              <option key={s.value} value={s.value}>{t(`status.${s.value}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('jobs.cv')}</label>
          <select
            value={form.cvId}
            onChange={e => set('cvId', e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white text-sm outline-none transition-colors"
          >
            <option value="">{t('jobs.selectCV')}</option>
            {cvs.map(cv => (
              <option key={cv.id} value={cv.id}>{cv.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('jobs.website')}</label>
        <input
          type="url"
          value={form.websiteUrl}
          onChange={e => set('websiteUrl', e.target.value)}
          className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
          placeholder={t('jobs.websitePlaceholder')}
        />
      </div>

      <div>
        <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('jobs.notes')}</label>
        <textarea
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          rows={3}
          className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors resize-none"
          placeholder={t('jobs.notesPlaceholder')}
        />
      </div>

      <div className="flex gap-3 justify-end pt-1">
        <button
          onClick={onCancel}
          className="px-4 py-2.5 text-sm text-dark-300 hover:text-white bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
        >
          {t('common.cancel')}
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={!valid}
          className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          {t('common.save')}
        </button>
      </div>
    </div>
  )
}

export default function JobTracker() {
  const { t } = useTranslation()
  const { jobs, addJob, updateJob, deleteJob } = useJobStore()
  const { cvs } = useCVStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editJob, setEditJob] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = jobs.filter(j => {
    const matchSearch = !search ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.position.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || j.status === filterStatus
    return matchSearch && matchStatus
  })

  const getCVName = (cvId) => cvs.find(c => c.id === cvId)?.name || ''

  const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('jobs.title')}</h1>
          <p className="text-dark-400 text-sm">{filtered.length} {t('landing.statsJobs')}</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          {t('jobs.add')}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('jobs.search')}
            className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-dark-900 border border-dark-700 text-dark-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            {t('jobs.filterAll')}
          </button>
          {JOB_STATUSES.map(s => (
            <button
              key={s.value}
              onClick={() => setFilterStatus(s.value)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                filterStatus === s.value
                  ? `${s.color} text-white`
                  : 'bg-dark-900 border border-dark-700 text-dark-300 hover:text-white hover:bg-dark-800'
              }`}
            >
              {t(`status.${s.value}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-dark-900 border border-dark-700 rounded-xl">
          <Briefcase size={32} className="text-dark-600 mb-3" />
          <p className="text-dark-300 text-base font-medium mb-2">{t('jobs.noJobs')}</p>
          <p className="text-dark-500 text-sm mb-6">{t('jobs.addFirst')}</p>
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            {t('jobs.add')}
          </button>
        </div>
      ) : (
        <div className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium">{t('jobs.company')}</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium">{t('jobs.position')}</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium">{t('jobs.status')}</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium hidden md:table-cell">{t('jobs.cv')}</th>
                <th className="text-left px-4 py-3 text-dark-400 text-xs font-medium hidden lg:table-cell">{t('jobs.createdAt')}</th>
                <th className="text-right px-4 py-3 text-dark-400 text-xs font-medium">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-dark-800/50 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{job.company}</span>
                      {job.websiteUrl && (
                        <a
                          href={job.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-500 hover:text-primary-400 transition-colors opacity-0 group-hover:opacity-100"
                          title={t('jobs.visitSite')}
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-dark-300 text-sm">{job.position}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    {job.cvId && (
                      <div className="flex items-center gap-1.5 text-dark-400 text-xs">
                        <FileText size={12} />
                        <span className="truncate max-w-24">{getCVName(job.cvId)}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-dark-500 text-xs hidden lg:table-cell">{formatDate(job.createdAt)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {job.websiteUrl && (
                        <a
                          href={job.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-dark-400 hover:text-primary-400 hover:bg-dark-700 rounded-lg transition-colors"
                          title={t('jobs.visitSite')}
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <button
                        onClick={() => setEditJob(job)}
                        className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(job)}
                        className="p-1.5 text-dark-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title={t('jobs.add')} size="lg">
        <JobForm
          cvs={cvs}
          onSave={(form) => { addJob(form); setAddOpen(false) }}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editJob} onClose={() => setEditJob(null)} title={t('jobs.edit')} size="lg">
        {editJob && (
          <JobForm
            initial={editJob}
            cvs={cvs}
            onSave={(form) => { updateJob(editJob.id, form); setEditJob(null) }}
            onCancel={() => setEditJob(null)}
          />
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteJob(deleteTarget?.id)}
        message={t('jobs.confirmDelete')}
      />
    </div>
  )
}
