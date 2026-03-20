import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  KeyRound,
  Search,
  Copy,
  Check,
  X,
} from 'lucide-react'
import { useVaultStore } from '../store/useStore'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'

const EMPTY_ACCOUNT = {
  company: '',
  username: '',
  password: '',
  notes: '',
}

function AccountForm({ initial, onSave, onCancel }) {
  const { t } = useTranslation()
  const [form, setForm] = useState(initial || EMPTY_ACCOUNT)
  const [showPwd, setShowPwd] = useState(false)

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const valid = form.company.trim() && form.username.trim()

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('vault.company')} *</label>
        <input
          type="text"
          value={form.company}
          onChange={e => set('company', e.target.value)}
          className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
          placeholder="Google, LinkedIn, ..."
        />
      </div>
      <div>
        <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('vault.username')} *</label>
        <input
          type="text"
          value={form.username}
          onChange={e => set('username', e.target.value)}
          className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('vault.password')}</label>
        <div className="relative">
          <input
            type={showPwd ? 'text' : 'password'}
            value={form.password}
            onChange={e => set('password', e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 pr-10 text-white placeholder-dark-500 text-sm outline-none transition-colors font-mono"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPwd(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors"
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-dark-300 text-xs font-medium mb-1.5">{t('vault.notes')}</label>
        <textarea
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          rows={2}
          className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-3 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors resize-none"
          placeholder="Security questions, account type, ..."
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

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-lg transition-colors ${
        copied
          ? 'text-green-400 bg-green-400/10'
          : 'text-dark-400 hover:text-white hover:bg-dark-700'
      }`}
      title={copied ? t('vault.copied') : label}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

function AccountCard({ account, onEdit, onDelete }) {
  const { t } = useTranslation()
  const [showPwd, setShowPwd] = useState(false)

  return (
    <div className="bg-dark-900 border border-dark-700 hover:border-dark-600 rounded-xl p-5 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <KeyRound size={16} className="text-primary-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{account.company}</h3>
            {account.notes && (
              <p className="text-dark-500 text-xs mt-0.5 truncate max-w-32">{account.notes}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-dark-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Credentials */}
      <div className="space-y-2.5">
        {/* Username */}
        <div className="flex items-center gap-2 bg-dark-800 rounded-lg px-3 py-2">
          <div className="flex-1 min-w-0">
            <p className="text-dark-500 text-xs mb-0.5">{t('vault.username')}</p>
            <p className="text-dark-200 text-xs font-mono truncate">{account.username}</p>
          </div>
          <CopyButton text={account.username} label={t('vault.copyUsername')} />
        </div>

        {/* Password */}
        {account.password && (
          <div className="flex items-center gap-2 bg-dark-800 rounded-lg px-3 py-2">
            <div className="flex-1 min-w-0">
              <p className="text-dark-500 text-xs mb-0.5">{t('vault.password')}</p>
              <p className="text-dark-200 text-xs font-mono tracking-widest">
                {showPwd ? account.password : '••••••••'}
              </p>
            </div>
            <button
              onClick={() => setShowPwd(p => !p)}
              className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
              title={showPwd ? t('vault.hidePassword') : t('vault.showPassword')}
            >
              {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <CopyButton text={account.password} label={t('vault.copyPassword')} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function AccountVault() {
  const { t } = useTranslation()
  const { accounts, addAccount, updateAccount, deleteAccount } = useVaultStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editAccount, setEditAccount] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = accounts.filter(a =>
    !search || a.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('vault.title')}</h1>
          <p className="text-dark-400 text-sm">{accounts.length} {t('common.noData') === 'No data' ? 'accounts' : '条记录'}</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          {t('vault.add')}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('vault.search')}
          className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg pl-9 pr-9 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mb-4">
            <KeyRound size={28} className="text-dark-500" />
          </div>
          <p className="text-dark-300 text-base font-medium mb-2">{t('vault.noAccounts')}</p>
          <p className="text-dark-500 text-sm mb-6">{t('vault.addFirst')}</p>
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            {t('vault.add')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(account => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={() => setEditAccount(account)}
              onDelete={() => setDeleteTarget(account)}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title={t('vault.add')} size="md">
        <AccountForm
          onSave={(form) => { addAccount(form); setAddOpen(false) }}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editAccount} onClose={() => setEditAccount(null)} title={t('vault.edit')} size="md">
        {editAccount && (
          <AccountForm
            initial={editAccount}
            onSave={(form) => { updateAccount(editAccount.id, form); setEditAccount(null) }}
            onCancel={() => setEditAccount(null)}
          />
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteAccount(deleteTarget?.id)}
        message={t('vault.confirmDelete')}
      />
    </div>
  )
}
