import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import GuideModal from '../components/GuideModal';

export default function DateDiff() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const diffData = useMemo(() => {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    // Standardize to UTC midnight to avoid DST issues
    const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    
    const diffTime = Math.abs(utc2 - utc1);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    return { totalDays, weeks, remainingDays, isPast: utc2 < utc1 };
  }, [startDate, endDate]);

  return (
    <>

      <Helmet>
        <title>{t('datediff.title')} - Utility Lab</title>
        <meta name="description" content={t('datediff.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('datediff.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('datediff.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('datediff.desc1')}<br/><br/>
          {t('datediff.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent">
        <div className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2 flex items-center">
              開始日期 Start Date
              <GuideModal title={t('datediff.guideTitle')}>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>{t('common.inputRule')}</strong>：<br/><span className="whitespace-pre-line">{t('datediff.guide1')}</span></li>
                  <li><strong>{t('common.calcLogic')}</strong>：<br/><span className="whitespace-pre-line">{t('datediff.guide2')}</span></li>
                </ul>
              </GuideModal>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial text-lg rounded-none focus:border-b-2 block p-2 outline-none transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('datediff.endDate')}</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial text-lg rounded-none focus:border-b-2 block p-2 outline-none transition-all font-mono"
            />
          </div>
        </div>

        {diffData ? (
          <div className="mt-12 bg-fg-editorial text-bg-editorial p-8 md:p-12 text-center animate-in slide-in-from-bottom-4 duration-500">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70 mb-6">{t('datediff.total_days')}</p>
            <div className="text-8xl md:text-9xl font-serif italic tracking-tighter flex items-baseline justify-center gap-2 mb-8">
              {diffData.isPast && <span className="text-5xl opacity-50">-</span>}
              <span>{diffData.totalDays.toLocaleString()}</span>
            </div>
            <div className="inline-block px-8 py-3 border border-bg-editorial/30 bg-bg-editorial/10 font-mono text-sm uppercase tracking-widest">
              {t('datediff.approx')} <span className="font-bold">{diffData.weeks}</span> {t('datediff.weeks')} &amp; <span className="font-bold">{diffData.remainingDays}</span> {t('datediff.days')}
            </div>
          </div>
        ) : (
          <div className="mt-16 pt-12 border-t border-fg-editorial flex flex-col items-center justify-center text-center opacity-30">
            <p className="text-xs font-mono uppercase tracking-widest">{t('common.awaiting')}</p>
          </div>
        )}
      </div>
    </div>
  
    </>
  );
}
