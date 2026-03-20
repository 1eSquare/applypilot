import { useTranslation } from 'react-i18next'
import Modal from './Modal'

export default function ConfirmDialog({ isOpen, onClose, onConfirm, message }) {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('common.confirm')} size="sm">
      <p className="text-dark-300 text-sm mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-dark-300 hover:text-white bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
        >
          {t('common.cancel')}
        </button>
        <button
          onClick={() => { onConfirm(); onClose() }}
          className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
        >
          {t('common.delete')}
        </button>
      </div>
    </Modal>
  )
}
