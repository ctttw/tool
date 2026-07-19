import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import GuideModal from '../components/GuideModal';

export default function Percentage() {
  const { t } = useTranslation();
  const [calc1X, setCalc1X] = useState('');
  const [calc1Y, setCalc1Y] = useState('');
  
  const [calc2X, setCalc2X] = useState('');
  const [calc2Y, setCalc2Y] = useState('');

  const [calc3X, setCalc3X] = useState('');
  const [calc3Y, setCalc3Y] = useState('');

  const calc1Result = (parseFloat(calc1X) && parseFloat(calc1Y)) ? (parseFloat(calc1X) / 100 * parseFloat(calc1Y)) : null;
  const calc2Result = (parseFloat(calc2X) && parseFloat(calc2Y)) ? (parseFloat(calc2X) / parseFloat(calc2Y) * 100) : null;
  const calc3Result = (parseFloat(calc3X) && parseFloat(calc3Y)) ? ((parseFloat(calc3Y) - parseFloat(calc3X)) / parseFloat(calc3X) * 100) : null;

  return (
    <>

      <Helmet>
        <title>{t('percentage.title')} - Utility Lab</title>
        <meta name="description" content={t('percentage.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('percentage.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('percentage.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('percentage.desc1')}<br/><br/>
          {t('percentage.desc2')}
        </p>
      </header>

      <div className="space-y-8">
        {/* Calculator 1 */}
        <div className="border border-fg-editorial p-8 bg-transparent">
          <h2 className="text-sm uppercase tracking-widest font-mono opacity-60 mb-6 flex items-center">
            {t('percentage.calc1_title')}
            <GuideModal title={t('percentage.guideTitle')}>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>{t('common.inputRule')}</strong>：<br/><span className="whitespace-pre-line">{t('percentage.guide1')}</span></li>
                <li><strong>{t('common.calcLogic')}</strong>：<br/><span className="whitespace-pre-line">{t('percentage.guide2')}</span></li>
              </ul>
            </GuideModal>
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <input
              type="number"
              placeholder="0"
              value={calc1X}
              onChange={(e) => setCalc1X(e.target.value)}
              className="w-full sm:w-24 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 text-center font-mono text-xl placeholder:opacity-30"
            />
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">% OF</span>
            <input
              type="number"
              placeholder="0"
              value={calc1Y}
              onChange={(e) => setCalc1Y(e.target.value)}
              className="w-full flex-1 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-xl placeholder:opacity-30 text-center"
            />
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">{t('percentage.is')}</span>
            <div className="w-full sm:w-32 border border-fg-editorial bg-fg-editorial text-bg-editorial font-mono font-bold text-xl p-3 text-center">
              {calc1Result !== null ? calc1Result.toPrecision(6).replace(/\.?0+$/, '') : '—'}
            </div>
          </div>
        </div>

        {/* Calculator 2 */}
        <div className="border border-fg-editorial p-8 bg-transparent">
          <h2 className="text-sm uppercase tracking-widest font-mono opacity-60 mb-6">{t('percentage.calc2_title')}</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <input
              type="number"
              placeholder="0"
              value={calc2X}
              onChange={(e) => setCalc2X(e.target.value)}
              className="w-full flex-1 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-xl placeholder:opacity-30 text-center"
            />
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">{t('percentage.is')}</span>
            <input
              type="number"
              placeholder="0"
              value={calc2Y}
              onChange={(e) => setCalc2Y(e.target.value)}
              className="w-full flex-1 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-xl placeholder:opacity-30 text-center"
            />
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">{t('percentage.of')}</span>
            <div className="w-full sm:w-32 border border-fg-editorial bg-fg-editorial text-bg-editorial font-mono font-bold text-xl p-3 text-center flex items-center justify-center gap-1">
              {calc2Result !== null ? calc2Result.toPrecision(6).replace(/\.?0+$/, '') : '—'} <span className="text-sm opacity-60">%</span>
            </div>
          </div>
        </div>

        {/* Calculator 3 */}
        <div className="border border-fg-editorial p-8 bg-transparent">
          <h2 className="text-sm uppercase tracking-widest font-mono opacity-60 mb-6">{t('percentage.calc3_title')}</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">{t('percentage.from')}</span>
            <input
              type="number"
              placeholder="0"
              value={calc3X}
              onChange={(e) => setCalc3X(e.target.value)}
              className="w-full flex-1 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-xl placeholder:opacity-30 text-center"
            />
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">{t('percentage.to')}</span>
            <input
              type="number"
              placeholder="0"
              value={calc3Y}
              onChange={(e) => setCalc3Y(e.target.value)}
              className="w-full flex-1 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-xl placeholder:opacity-30 text-center"
            />
            <div className={`w-full sm:w-32 border border-fg-editorial font-mono font-bold text-xl p-3 text-center flex items-center justify-center gap-1 ${
              calc3Result === null 
                ? 'bg-transparent text-fg-editorial/30' 
                : 'bg-fg-editorial text-bg-editorial'
            }`}>
              {calc3Result !== null ? (calc3Result > 0 ? '+' : '') + calc3Result.toPrecision(6).replace(/\.?0+$/, '') : '—'} <span className="text-sm opacity-60">%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  
    </>
  );
}
