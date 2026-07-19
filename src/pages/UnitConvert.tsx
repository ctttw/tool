import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import GuideModal from '../components/GuideModal';

type UnitCategory = 'length' | 'weight' | 'area';

const units = {
  length: [
    { id: 'm', label: '公尺 (m)', factor: 1 },
    { id: 'km', label: '公里 (km)', factor: 1000 },
    { id: 'cm', label: '公分 (cm)', factor: 0.01 },
    { id: 'mm', label: '毫米 (mm)', factor: 0.001 },
    { id: 'inch', label: '英吋 (inch)', factor: 0.0254 },
    { id: 'foot', label: '英呎 (foot)', factor: 0.3048 },
    { id: 'yard', label: '英碼 (yard)', factor: 0.9144 },
    { id: 'mile', label: '英哩 (mile)', factor: 1609.344 },
  ],
  weight: [
    { id: 'kg', label: '公斤 (kg)', factor: 1 },
    { id: 'g', label: '公克 (g)', factor: 0.001 },
    { id: 'mg', label: '毫克 (mg)', factor: 0.000001 },
    { id: 't', label: '公噸 (t)', factor: 1000 },
    { id: 'lb', label: '磅 (lb)', factor: 0.45359237 },
    { id: 'oz', label: '盎司 (oz)', factor: 0.02834952 },
  ],
  area: [
    { id: 'sqm', label: '平方公尺 (m²)', factor: 1 },
    { id: 'sqkm', label: '平方公里 (km²)', factor: 1000000 },
    { id: 'ha', label: '公頃 (ha)', factor: 10000 },
    { id: 'are', label: '公畝 (a)', factor: 100 },
    { id: 'ping', label: '坪', factor: 3.305785 },
    { id: 'sqft', label: '平方英呎 (sq ft)', factor: 0.092903 },
    { id: 'acre', label: '英畝 (acre)', factor: 4046.856 },
  ]
};

export default function UnitConvert() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState(units.length[0].id);
  const [toUnit, setToUnit] = useState(units.length[1].id);
  const [inputValue, setInputValue] = useState('1');

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    setFromUnit(units[cat][0].id);
    setToUnit(units[cat][1].id);
  };

  const currentUnits = units[category];
  
  const fromFactor = currentUnits.find(u => u.id === fromUnit)?.factor || 1;
  const toFactor = currentUnits.find(u => u.id === toUnit)?.factor || 1;

  const result = parseFloat(inputValue) 
    ? (parseFloat(inputValue) * fromFactor / toFactor).toPrecision(8).replace(/\.?0+$/, '') 
    : '';

  return (
    <>

      <Helmet>
        <title>{t('unitconvert.title')} - Utility Lab</title>
        <meta name="description" content={t('unitconvert.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('unitconvert.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('unitconvert.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('unitconvert.desc1')}<br/><br/>
          {t('unitconvert.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent">
        <div className="flex gap-2 p-1 border border-fg-editorial mb-12">
          <div className="absolute right-0 top-0 -mt-8">
             <GuideModal title={t('unitconvert.guideTitle')}>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>輸入規範</strong>：<br/>1. 先選擇上方的「長度」、「重量」或「面積」分類。<br/>2. 在「{t('unitconvert.from')}」輸入數值，並選擇原始單位。<br/>3. 選擇「轉換為」的目標單位。<br/>4. 點擊中間的箭頭按鈕可一鍵互換單位。</li>
                <li><strong>{t('common.calcLogic')}</strong>：<br/>{t('unitconvert.guide2')}</li>
              </ul>
            </GuideModal>
          </div>
          <button
            onClick={() => handleCategoryChange('length')}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${category === 'length' ? 'bg-fg-editorial text-bg-editorial' : 'text-fg-editorial hover:bg-fg-editorial/10'}`}
          >
            {t('unitconvert.length')}
          </button>
          <button
            onClick={() => handleCategoryChange('weight')}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${category === 'weight' ? 'bg-fg-editorial text-bg-editorial' : 'text-fg-editorial hover:bg-fg-editorial/10'}`}
          >
            {t('unitconvert.weight')}
          </button>
          <button
            onClick={() => handleCategoryChange('area')}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${category === 'area' ? 'bg-fg-editorial text-bg-editorial' : 'text-fg-editorial hover:bg-fg-editorial/10'}`}
          >
            {t('unitconvert.area')}
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col gap-8">
            <div className="flex-1 space-y-4">
              <label className="block text-xs uppercase tracking-widest font-mono opacity-60">{t('unitconvert.from')}</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-1/2 bg-transparent border-b border-fg-editorial text-fg-editorial text-xl rounded-none p-2 outline-none focus:border-b-2 font-mono text-center"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-1/2 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-center cursor-pointer"
                >
                  {currentUnits.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-center -my-4 relative z-10">
              <button 
                onClick={() => {
                  setFromUnit(toUnit);
                  setToUnit(fromUnit);
                  setInputValue(result || '');
                }}
                className="p-3 bg-bg-editorial border border-fg-editorial text-fg-editorial hover:bg-fg-editorial hover:text-bg-editorial transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M11 18l-4 4-4-4"/><path d="M17 14V2"/><path d="M21 6l-4-4-4 4"/></svg>
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <label className="block text-xs uppercase tracking-widest font-mono opacity-60">{t('unitconvert.to')}</label>
              <div className="flex gap-4">
                <div className="w-1/2 border border-fg-editorial bg-fg-editorial text-bg-editorial text-xl p-2 font-bold font-mono overflow-x-auto whitespace-nowrap flex items-center justify-center">
                  {result || '0'}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-1/2 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-center cursor-pointer"
                >
                  {currentUnits.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
}
