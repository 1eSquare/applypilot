import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  KeyRound,
  PuzzleIcon,
  ChevronRight,
  Globe,
  Plane,
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { path: '/cv', icon: FileText, key: 'cvManager' },
  { path: '/jobs', icon: Briefcase, key: 'jobTracker' },
  { path: '/vault', icon: KeyRound, key: 'accountVault' },
]

export default function Sidebar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(next)
    localStorage.setItem('applypilot_lang', next)
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-dark-900 border-r border-dark-700 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-dark-700">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Plane size={16} className="text-white" />
          </div>
          <span className="text-white font-semibold text-base tracking-tight">ApplyPilot</span>
        </NavLink>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ path, icon: Icon, key }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-600/30'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`
            }
          >
            <Icon size={18} />
            <span>{t(`nav.${key}`)}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-5 space-y-2 border-t border-dark-700 pt-4">
        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all duration-150"
        >
          <Globe size={18} />
          <span className="flex-1 text-left">
            {i18n.language === 'zh' ? 'English' : '中文'}
          </span>
        </button>

        {/* Get Extension CTA */}
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white transition-all duration-150 group"
          onClick={() => window.open('https://chrome.google.com/webstore', '_blank')}
        >
          <PuzzleIcon size={18} />
          <span className="flex-1 text-left">{t('nav.getExtension')}</span>
          <ChevronRight size={14} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  )
}
