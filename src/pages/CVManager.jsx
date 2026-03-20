import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FileText,
  Upload,
  Trash2,
  Eye,
  Plus,
  X,
  File,
} from 'lucide-react'
import { useCVStore } from '../store/useStore'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'

function formatBytes(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function CVManager() {
  const { t } = useTranslation()
  const { cvs, addCV, deleteCV } = useCVStore()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [previewCV, setPreviewCV] = useState(null)
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef()

  const handleFileChange = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      if (!name) setName(f.name.replace(/\.[^.]+$/, ''))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) {
      setFile(f)
      if (!name) setName(f.name.replace(/\.[^.]+$/, ''))
    }
  }

  const handleUpload = async () => {
    if (!file || !name.trim()) return
    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        addCV({
          name: name.trim(),
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          fileData: e.target.result, // base64
        })
        setUploadOpen(false)
        setName('')
        setFile(null)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch {
      setUploading(false)
    }
  }

  const handlePreview = (cv) => {
    setPreviewCV(cv)
  }

  const closeUpload = () => {
    setUploadOpen(false)
    setName('')
    setFile(null)
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('cv.title')}</h1>
          <p className="text-dark-400 text-sm">{cvs.length} {t('landing.statsResumes')}</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          {t('cv.upload')}
        </button>
      </div>

      {/* CV Grid */}
      {cvs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mb-4">
            <FileText size={28} className="text-dark-500" />
          </div>
          <p className="text-dark-300 text-base font-medium mb-2">{t('cv.noCV')}</p>
          <p className="text-dark-500 text-sm mb-6">{t('cv.uploadDesc')}</p>
          <button
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Upload size={16} />
            {t('cv.addFirst')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Upload card */}
          <button
            onClick={() => setUploadOpen(true)}
            className="flex flex-col items-center justify-center p-8 bg-dark-900 border-2 border-dashed border-dark-700 hover:border-primary-600/50 hover:bg-dark-800/50 rounded-xl transition-all text-dark-400 hover:text-primary-400 group"
          >
            <Plus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">{t('cv.upload')}</span>
          </button>

          {cvs.map(cv => (
            <div
              key={cv.id}
              className="bg-dark-900 border border-dark-700 hover:border-dark-600 rounded-xl p-5 transition-all group"
            >
              {/* File icon + name */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm leading-tight mb-1 truncate">{cv.name}</h3>
                  <p className="text-dark-400 text-xs truncate">{cv.fileName}</p>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center justify-between text-xs text-dark-500 mb-4">
                <span>{formatDate(cv.uploadedAt)}</span>
                {cv.fileSize && <span>{formatBytes(cv.fileSize)}</span>}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(cv)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <Eye size={13} />
                  {t('cv.preview')}
                </button>
                <button
                  onClick={() => setDeleteTarget(cv)}
                  className="flex items-center justify-center px-3 py-2 bg-dark-800 hover:bg-red-900/30 text-dark-400 hover:text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={uploadOpen} onClose={closeUpload} title={t('cv.upload')} size="md">
        <div className="space-y-5">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-primary-500 bg-primary-500/5'
                : file
                ? 'border-green-500/50 bg-green-500/5'
                : 'border-dark-600 hover:border-dark-500 bg-dark-800/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <File size={20} className="text-green-400" />
                <div className="text-left">
                  <p className="text-white text-sm font-medium">{file.name}</p>
                  <p className="text-dark-400 text-xs">{formatBytes(file.size)}</p>
                </div>
                <button
                  className="ml-2 text-dark-400 hover:text-red-400 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Upload size={24} className="text-dark-500 mx-auto mb-2" />
                <p className="text-dark-300 text-sm font-medium mb-1">{t('cv.file')}</p>
                <p className="text-dark-500 text-xs">{t('cv.uploadDesc')}</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          {/* Name Input */}
          <div>
            <label className="block text-dark-300 text-sm font-medium mb-2">{t('cv.name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('cv.namePlaceholder')}
              className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 text-sm outline-none transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={closeUpload}
              className="px-4 py-2.5 text-sm text-dark-300 hover:text-white bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || !name.trim() || uploading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
            >
              <Upload size={15} />
              {uploading ? t('common.loading') : t('cv.uploadBtn')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewCV}
        onClose={() => setPreviewCV(null)}
        title={previewCV?.name || ''}
        size="lg"
      >
        {previewCV && (
          <div>
            {previewCV.fileType === 'application/pdf' ? (
              <iframe
                src={previewCV.fileData}
                className="w-full h-96 rounded-lg border border-dark-600"
                title={previewCV.name}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-dark-800 rounded-xl">
                <File size={40} className="text-dark-500 mb-3" />
                <p className="text-dark-300 text-sm font-medium mb-1">{previewCV.fileName}</p>
                <p className="text-dark-500 text-xs mb-4">{formatBytes(previewCV.fileSize)}</p>
                <a
                  href={previewCV.fileData}
                  download={previewCV.fileName}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Download
                </a>
              </div>
            )}
            <p className="text-dark-500 text-xs mt-3">{t('cv.uploadedAt')}: {formatDate(previewCV.uploadedAt)}</p>
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteCV(deleteTarget?.id)}
        message={t('cv.confirmDelete')}
      />
    </div>
  )
}
