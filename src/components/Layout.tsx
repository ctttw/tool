import { Link, Outlet, useLocation } from 'react-router-dom';
import {  
  Home, MapPin, Activity, CalendarHeart, CalendarClock, 
  Percent, ArrowLeftRight, FileCode2, ImageDown, Menu, X, Search,
  Receipt, Key, QrCode, Globe, TrendingUp, CircleDollarSign } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Helmet } from 'react-helmet-async';
import GuideModal from './GuideModal';

const navItems = [
  { path: '/', key: 'home', icon: Home },
  { path: '/zipcode', key: 'zipcode', icon: MapPin },
  { path: '/bmi', key: 'bmi', icon: Activity },
  { path: '/age', key: 'age', icon: CalendarHeart },
  { path: '/datediff', key: 'datediff', icon: CalendarClock },
  { path: '/percentage', key: 'percentage', icon: Percent },
  { path: '/unitconvert', key: 'unitconvert', icon: ArrowLeftRight },
  { path: '/currency', key: 'currency', icon: CircleDollarSign },
  { path: '/discount', key: 'discount', icon: Receipt },
  { path: '/stockfee', key: 'stockfee', icon: TrendingUp },
  { path: '/passwordgen', key: 'passwordgen', icon: Key },
  { path: '/qrcode', key: 'qrcode', icon: QrCode },
  { path: '/pdfmerge', key: 'pdfmerge', icon: FileCode2 },
  { path: '/imagecompress', key: 'imagecompress', icon: ImageDown },
];

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);
  const { t, i18n } = useTranslation();

  const filteredNavItems = navItems.filter(item => {
    // fallback to key if nav.key is not found, but it should be found
    const label = t(`nav.${item.key}`, item.key);
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <title>{t('layout.title')} - {t('layout.subtitle')}</title>
        <meta name="description" content={t('home.desc')} />
        <link rel="canonical" href={`https://tyctw.github.io${location.pathname === '/' ? '' : location.pathname}`} />
        <meta property="og:url" content={`https://tyctw.github.io${location.pathname === '/' ? '' : location.pathname}`} />
        <meta property="og:site_name" content="Utility Lab" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Utility Lab",
          "url": "https://tyctw.github.io/",
          "description": "A collection of simple, fast, and secure local web utilities.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All"
        })}
      </script>

      </Helmet>
    <div className="flex h-screen bg-bg-editorial overflow-hidden font-sans text-fg-editorial">
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-fg-editorial/20 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-bg-editorial border-r border-fg-editorial transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="h-24 flex flex-col justify-end px-6 pb-6 border-b border-fg-editorial shrink-0">
          <h1 className="text-3xl font-serif italic tracking-tight leading-none mb-1">
            {t('layout.title')}
          </h1>
          <p className="text-[9px] uppercase tracking-[0.2em] font-semibold opacity-60">
            {t('layout.subtitle')}
          </p>
        </div>

        <div className="p-4 border-b border-fg-editorial shrink-0">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 stroke-1" />
            <input
              type="text"
              aria-label={t('layout.search')}
              placeholder={t('layout.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border border-fg-editorial text-fg-editorial text-xs font-mono px-3 py-2 pl-9 outline-none focus:bg-fg-editorial/5 transition-colors placeholder:opacity-30"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {filteredNavItems.length > 0 ? (
            filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  aria-label={t(`nav.${item.key}`, item.key)}
                  className={`flex items-center gap-3 px-3 py-2.5 transition-colors duration-300 group ${
                    isActive 
                      ? 'bg-fg-editorial text-bg-editorial' 
                      : 'text-fg-editorial hover:bg-fg-editorial hover:text-bg-editorial'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} />
                  <span className="font-medium tracking-wide text-sm">{t(`nav.${item.key}`, item.key)}</span>
                </Link>
              );
            })
          ) : (
            <div className="px-3 py-4 text-xs font-mono uppercase tracking-widest opacity-40 text-center">
              {t('layout.noTools')}
            </div>
          )}
        </nav>
        <div className="p-4 border-t border-fg-editorial shrink-0">
          <div className="mb-4 relative">
            <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <select aria-label="Language"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="w-full bg-transparent border border-fg-editorial text-fg-editorial text-xs font-mono py-2 pl-9 pr-3 outline-none focus:bg-fg-editorial/5 appearance-none cursor-pointer"
            >
              <option value="zh">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className="text-[10px] font-mono uppercase opacity-50 tracking-tighter">
            {t('layout.version')} 2.4.0 / {t('layout.build')} 2024<br/>
            TAIPEI, TAIWAN — UTC+8
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-bg-editorial border-b border-fg-editorial flex items-center justify-between px-4 lg:hidden shrink-0">
          <div className="flex items-center">
            <button 
              aria-label="Open Menu"
              onClick={() => setIsOpen(true)}
              className="p-2 -ml-2 text-fg-editorial hover:bg-fg-editorial hover:text-bg-editorial transition-colors"
            >
              <Menu size={20} />
            </button>
            <span className="ml-2 font-serif text-xl italic tracking-tight">
              {navItems.find(i => i.path === location.pathname) ? t(`nav.${navItems.find(i => i.path === location.pathname)!.key}`) : t('layout.title')}
            </span>
          </div>
          <div className="relative w-28">
            <Globe size={14} className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50" />
            <select aria-label="Language"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="w-full bg-transparent border border-fg-editorial text-fg-editorial text-[10px] font-mono py-1.5 pl-7 pr-2 outline-none focus:bg-fg-editorial/5 appearance-none cursor-pointer"
            >
              <option value="zh">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="es">Español</option>
            </select>
          </div>
        </header>
        
        <main ref={mainRef} className="flex-1 overflow-auto flex flex-col relative">
          <div className="flex-1 shrink-0 flex flex-col">
            <Outlet />
          </div>
          
          <footer className="h-16 flex items-center px-6 lg:px-12 justify-between border-t border-fg-editorial shrink-0 mt-auto">
            <div className="text-[10px] font-mono opacity-50 tracking-tighter flex items-center gap-4">
              <span className="uppercase">© 2024 Utility Lab</span>
              <div className="hidden sm:flex gap-2">
                <div className="w-1 h-1 bg-fg-editorial rounded-full"></div>
                <div className="w-1 h-1 bg-fg-editorial rounded-full opacity-20"></div>
                <div className="w-1 h-1 bg-fg-editorial rounded-full opacity-20"></div>
              </div>
            </div>
            <div className="text-[10px] font-mono flex items-center opacity-50 hover:opacity-100 transition-opacity">
              <Link to="/privacy" className="uppercase tracking-widest flex items-center gap-2">
                {t('layout.privacy')}
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  
    </>
  );
}
