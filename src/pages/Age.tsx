import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import GuideModal from '../components/GuideModal';

export default function Age() {
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const ageData = useMemo(() => {
    if (!birthDate || !targetDate) return null;
    
    const start = new Date(birthDate);
    const end = new Date(targetDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return null;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      // Get the number of days in the previous month
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Total months roughly
    const totalMonths = (years * 12) + months;

    return { years, months, days, totalDays, totalMonths };
  }, [birthDate, targetDate]);

  return (
    <>

      <Helmet>
        <title>{t('age.title')} - Utility Lab</title>
        <meta name="description" content={t('age.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('age.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('age.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('age.desc1')}<br/><br/>
          {t('age.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent">
        <div className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2 flex items-center">
              {t('age.birthDate')}
              <GuideModal title={t('age.guideTitle')}>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>{t('common.inputRule')}</strong>：<br/>{t('age.guide1')}</li>
                  <li><strong>{t('common.calcLogic')}</strong>：<br/><strong>詳細年齡</strong>：計算目標日期減去出生日期的完整年數、月數與天數，並自動處理大小月與閏年天數補齊。<br/><strong>總計月數</strong>：將經過的年數乘以 12，加上剩餘的月數。<br/><strong>總計天數</strong>：兩個日期的絕對天數差。</li>
                </ul>
              </GuideModal>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial text-lg rounded-none focus:border-b-2 block p-2 outline-none transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('age.targetDate')}</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial text-lg rounded-none focus:border-b-2 block p-2 outline-none transition-all font-mono"
            />
          </div>
        </div>

        {ageData ? (
          <div className="mt-12 bg-fg-editorial text-bg-editorial p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70 mb-6">{t('age.detailed_age')}</p>
              <div className="text-5xl md:text-7xl font-serif italic tracking-tighter flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <span>{ageData.years}<span className="text-2xl font-mono not-italic opacity-70 ml-2">{t('age.yrs')}</span></span>
                <span>{ageData.months}<span className="text-2xl font-mono not-italic opacity-70 ml-2">{t('age.mos')}</span></span>
                <span>{ageData.days}<span className="text-2xl font-mono not-italic opacity-70 ml-2">{t('age.d')}</span></span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border border-bg-editorial/30 text-center bg-bg-editorial/5">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70 mb-4">{t('age.total_months')}</p>
                <p className="text-3xl font-mono">{ageData.totalMonths.toLocaleString()}</p>
              </div>
              <div className="p-6 border border-bg-editorial/30 text-center bg-bg-editorial/5">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70 mb-4">{t('age.total_days')}</p>
                <p className="text-3xl font-mono">{ageData.totalDays.toLocaleString()}</p>
              </div>
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
