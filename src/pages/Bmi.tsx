import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import GuideModal from '../components/GuideModal';

export default function Bmi() {
  const { t } = useTranslation();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const heightInMeters = h / 100;
    return w / (heightInMeters * heightInMeters);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return '體重過輕 Underweight';
    if (bmi < 24) return '正常範圍 Normal';
    if (bmi < 27) return '過重 Overweight';
    if (bmi < 30) return '輕度肥胖 Obese Class I';
    if (bmi < 35) return '中度肥胖 Obese Class II';
    return '重度肥胖 Obese Class III';
  };

  const bmi = calculateBMI();
  const status = bmi ? getBMIStatus(bmi) : null;

  return (
    <>

      <Helmet>
        <title>{t('bmi.title')} - Utility Lab</title>
        <meta name="description" content={t('bmi.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('bmi.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('bmi.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('bmi.desc1')}<br/><br/>
          {t('bmi.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent">
        <div className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2 flex items-center">
              {t('bmi.height')}
              <GuideModal title={t('bmi.guideTitle')}>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>輸入規範</strong>：<br/>身高：請輸入您的實際身高，單位為公分 (cm)。<br/>體重：請輸入您的實際體重，單位為公斤 (kg)。</li>
                  <li><strong>計算邏輯</strong>：<br/>BMI = 體重(kg) / [身高(m)]²<br/>由系統自動計算並四捨五入至小數點後第一位。</li>
                </ul>
                <div className="text-xs opacity-70">
                  <p><strong>分級標準：</strong></p>
                  <ul className="list-disc pl-5">
                    <li>BMI &lt; 18.5：體重過輕</li>
                    <li>18.5 ≤ BMI &lt; 24：正常範圍</li>
                    <li>24 ≤ BMI &lt; 27：過重</li>
                    <li>27 ≤ BMI &lt; 30：輕度肥胖</li>
                    <li>30 ≤ BMI &lt; 35：中度肥胖</li>
                    <li>BMI ≥ 35：重度肥胖</li>
                  </ul>
                </div>
              </GuideModal>
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial text-xl rounded-none focus:border-b-2 block p-2 outline-none transition-all placeholder:opacity-30 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('bmi.weight')}</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="65"
              className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial text-xl rounded-none focus:border-b-2 block p-2 outline-none transition-all placeholder:opacity-30 font-mono"
            />
          </div>
        </div>

        {bmi !== null && status && (
          <div className="mt-12 bg-fg-editorial text-bg-editorial p-8 md:p-12 text-center animate-in slide-in-from-bottom-4 duration-500">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70 mb-6">{t('bmi.index_result')}</p>
            <div className="text-8xl md:text-9xl font-serif italic tracking-tighter mb-8">
              <span>{bmi.toFixed(1)}</span>
            </div>
            <div className="inline-block px-8 py-3 border border-bg-editorial/30 bg-bg-editorial/10 backdrop-blur-sm">
              <p className="font-mono text-sm uppercase tracking-widest">{status}</p>
            </div>
          </div>
        )}

        {bmi === null && (
          <div className="mt-16 pt-12 border-t border-fg-editorial flex flex-col items-center justify-center text-center opacity-30">
             <p className="text-xs font-mono uppercase tracking-widest">{t('common.awaiting')}</p>
          </div>
        )}
      </div>
    </div>
  
    </>
  );
}
