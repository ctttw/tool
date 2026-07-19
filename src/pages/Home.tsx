import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const tools = [
  { path: '/zipcode', key: 'zipcode', num: '01' },
  { path: '/bmi', key: 'bmi', num: '02' },
  { path: '/age', key: 'age', num: '03' },
  { path: '/datediff', key: 'datediff', num: '04' },
  { path: '/percentage', key: 'percentage', num: '05' },
  { path: '/unitconvert', key: 'unitconvert', num: '06' },
  { path: '/currency', key: 'currency', num: '07' },
  { path: '/discount', key: 'discount', num: '08' },
  { path: '/stockfee', key: 'stockfee', num: '09' },
  { path: '/passwordgen', key: 'passwordgen', num: '10' },
  { path: '/qrcode', key: 'qrcode', num: '11' },
  { path: '/pdfmerge', key: 'pdfmerge', num: '12' },
  { path: '/imagecompress', key: 'imagecompress', num: '13' },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('layout.title')} - {t('layout.subtitle')}</title>
        <meta name="description" content={t('home.desc')} />
      </Helmet>
      <div className="flex flex-col h-full animate-in fade-in duration-500 min-h-screen lg:min-h-0">
      <div className="border-b border-fg-editorial p-8 lg:p-12 xl:p-16 flex flex-col xl:flex-row xl:items-end justify-between gap-8 shrink-0">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6 opacity-60">
             <div className="w-8 h-[1px] bg-fg-editorial"></div>
             {t('home.introduction') && <span className="text-xs font-mono uppercase tracking-widest">{t('home.introduction')}</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif italic tracking-tighter mb-6 leading-[1.15]">
            {t('home.title').split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p className="text-sm opacity-70 leading-relaxed font-medium">
            {t('home.desc')}
          </p>
        </div>
        <div className="text-[10px] font-mono tracking-widest uppercase opacity-40 xl:text-right flex flex-col gap-1">
          <p>{t('home.local_processing')}</p>
          <p>{t('home.zero_tracking')}</p>
          <p>{t('home.instant_access')}</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 auto-rows-[minmax(16rem,1fr)]">
        {tools.map((tool, index) => {
          const isRightEdge = (index + 1) % 4 === 0;
          const isBottomRow = index >= tools.length - 4;
          return (
            <Link 
              key={tool.path}
              to={tool.path}
              aria-label={t(`home.tools.${tool.key}.title`, t(`nav.${tool.key}`))}
              className={`
                p-8 flex flex-col justify-between group 
                hover:bg-fg-editorial hover:text-bg-editorial transition-colors duration-300 cursor-pointer
                border-fg-editorial border-b
                ${isBottomRow ? 'xl:border-b-0' : 'xl:border-b'}
                ${isRightEdge ? 'xl:border-r-0' : 'xl:border-r'}
                ${(index % 2 === 0) ? 'sm:border-r' : 'sm:border-r-0'}
              `}
            >
              <div className="flex justify-between items-start mb-8 lg:mb-16 xl:mb-0">
                <span className="font-mono text-xs opacity-50">{tool.num}</span>
                <div className="w-2 h-2 rounded-full border border-current"></div>
              </div>
              <div>
                <h2 className="text-2xl font-serif mb-2">{t(`home.tools.${tool.key}.title`, t(`nav.${tool.key}`))}</h2>
                <p className="text-xs opacity-70 leading-relaxed">{t(`home.tools.${tool.key}.desc`)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  
    </>
  );
}
