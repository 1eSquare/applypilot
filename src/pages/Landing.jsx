import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Plane,
  FileText,
  Briefcase,
  KeyRound,
  PuzzleIcon,
  ChevronRight,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  BarChart3,
} from 'lucide-react'

export default function Landing() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(next)
    localStorage.setItem('applypilot_lang', next)
  }

  const features = [
    {
      icon: FileText,
      titleKey: 'landing.feature1Title',
      descKey: 'landing.feature1Desc',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Briefcase,
      titleKey: 'landing.feature2Title',
      descKey: 'landing.feature2Desc',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: KeyRound,
      titleKey: 'landing.feature3Title',
      descKey: 'landing.feature3Desc',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      icon: Zap,
      titleKey: 'landing.feature4Title',
      descKey: 'landing.feature4Desc',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ]

  const stats = [
    { value: '2,400+', key: 'landing.statsJobs' },
    { value: '1,200+', key: 'landing.statsResumes' },
    { value: '800+', key: 'landing.statsUsers' },
  ]

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Plane size={16} className="text-white" />
            </div>
            <span className="text-white font-semibold text-base">ApplyPilot</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-dark-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-dark-800"
            >
              <Globe size={16} />
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors"
            >
              {t('landing.getStarted')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-600/10 border border-primary-600/20 rounded-full text-primary-400 text-xs font-medium mb-6">
            <Zap size={12} />
            <span>{t('landing.heroSub')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-dark-300 bg-clip-text text-transparent">
            {t('landing.hero')}
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('landing.heroDesc')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-all duration-150 shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 hover:-translate-y-0.5"
            >
              {t('landing.getStarted')}
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => window.open('https://chrome.google.com/webstore', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all duration-150 border border-dark-600 hover:border-dark-500"
            >
              <PuzzleIcon size={18} />
              {t('landing.getExtension')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-dark-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map(({ value, key }) => (
              <div key={key}>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-dark-400 text-sm">{t(key)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {i18n.language === 'zh' ? '一切你需要的求职工具' : 'Everything You Need to Land Your Dream Job'}
            </h2>
            <p className="text-dark-400 text-base max-w-xl mx-auto">
              {i18n.language === 'zh'
                ? '专为海外留学生设计，帮你在竞争激烈的求职季保持领先'
                : 'Built for international students navigating competitive job markets worldwide'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, titleKey, descKey, color, bg }) => (
              <div
                key={titleKey}
                className="p-6 bg-dark-900 border border-dark-700 rounded-2xl hover:border-dark-600 transition-colors group"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 ${bg} rounded-xl mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{t(titleKey)}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extension CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-900/40 to-dark-900 border border-primary-700/30 rounded-2xl p-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600/20 rounded-2xl mb-6">
              <PuzzleIcon size={28} className="text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{t('landing.extensionTitle')}</h2>
            <p className="text-dark-300 text-base max-w-lg mx-auto mb-8 leading-relaxed">
              {t('landing.extensionDesc')}
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
              {[
                i18n.language === 'zh' ? '一键填写申请表' : 'One-click form fill',
                i18n.language === 'zh' ? '支持100+求职网站' : 'Works on 100+ job sites',
                i18n.language === 'zh' ? '与App数据同步' : 'Syncs with your app',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-dark-300 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={() => window.open('https://chrome.google.com/webstore', '_blank')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-150 shadow-lg shadow-primary-600/20"
            >
              <PuzzleIcon size={18} />
              {t('landing.extensionCta')}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {i18n.language === 'zh' ? '三步开始你的求职之旅' : 'Get Started in 3 Steps'}
          </h2>
          <p className="text-dark-400 mb-14 text-base">
            {i18n.language === 'zh' ? '简单、快速、高效' : 'Simple, fast, and effective'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: FileText,
                title: i18n.language === 'zh' ? '上传你的简历' : 'Upload Your Resume',
                desc: i18n.language === 'zh' ? '支持多份简历，针对不同岗位准备最佳版本' : 'Upload multiple resumes tailored to different roles',
              },
              {
                step: '02',
                icon: Briefcase,
                title: i18n.language === 'zh' ? '追踪求职进展' : 'Track Your Applications',
                desc: i18n.language === 'zh' ? '记录每个职位的申请状态和备注信息' : 'Log every application with status, notes, and links',
              },
              {
                step: '03',
                icon: Zap,
                title: i18n.language === 'zh' ? '插件自动填写' : 'Auto-Fill with Extension',
                desc: i18n.language === 'zh' ? '打开申请页面，一键填写所有信息' : 'Open any job page and fill forms in one click',
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-5xl font-black text-dark-800 mb-4">{step}</div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-dark-800 border border-dark-700 rounded-xl mb-4">
                  <Icon size={22} className="text-primary-400" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {i18n.language === 'zh' ? '准备好了吗？' : 'Ready to Take Off?'}
          </h2>
          <p className="text-dark-400 mb-8 text-base">
            {i18n.language === 'zh' ? '免费使用，数据本地存储，随时开始。' : 'Free to use. Data stored locally. Start now.'}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-150 shadow-xl shadow-primary-600/25 hover:-translate-y-0.5"
          >
            {t('landing.getStarted')}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8 px-6 text-center text-dark-500 text-sm">
        <p>© 2024 ApplyPilot · {i18n.language === 'zh' ? '为留学生而生' : 'Built for International Students'}</p>
      </footer>
    </div>
  )
}
