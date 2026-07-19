import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';
import GuideModal from '../components/GuideModal';

export default function QrCode() {
  const { t } = useTranslation();
  const [text, setText] = useState('https://tyctw.github.io/');
  const [size, setSize] = useState(250);
  const [level, setLevel] = useState('H');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [margin, setMargin] = useState(4);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'utility-lab-qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Helmet>
        <title>{t('qrcode.title')} - Utility Lab</title>
        <meta name="description" content={t('qrcode.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
        <header className="text-center">
          <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('qrcode.title')}</h1>
          <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('qrcode.subtitle')}</p>
          <p className="text-sm opacity-70 leading-relaxed font-medium">
            {t('qrcode.desc1')}<br/><br/>
            {t('qrcode.desc2')}
          </p>
        </header>

        <div className="border border-fg-editorial p-8 md:p-12 bg-transparent grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2 flex items-center">
                {t('qrcode.input_text', '輸入內容 Input Text or URL')}
                <GuideModal title={t('qrcode.guideTitle')}>
                  <ul className="list-disc pl-5 space-y-2 text-left">
                    <li><strong>{t('common.inputRule')}</strong>：<br/><span className="whitespace-pre-line">{t('qrcode.guide1')}</span></li>
                    <li><strong>{t('common.calcLogic')}</strong>：<br/><span className="whitespace-pre-line">{t('qrcode.guide2')}</span></li>
                  </ul>
                </GuideModal>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent border border-fg-editorial text-fg-editorial p-4 outline-none focus:bg-fg-editorial/5 transition-colors font-mono min-h-[120px] resize-y"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('qrcode.size', '尺寸 Size')} ({size}px)
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="10"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-fg-editorial"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('qrcode.margin', '邊距 Margin')} ({margin})
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-fg-editorial"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('qrcode.fg_color', '前景色 Foreground')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-10 w-full cursor-pointer bg-transparent border border-fg-editorial"
                  />
                  <input 
                    type="text" 
                    value={fgColor} 
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full bg-transparent border border-fg-editorial text-fg-editorial p-2 text-xs font-mono outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('qrcode.bg_color', '背景色 Background')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-full cursor-pointer bg-transparent border border-fg-editorial"
                  />
                  <input 
                    type="text" 
                    value={bgColor} 
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full bg-transparent border border-fg-editorial text-fg-editorial p-2 text-xs font-mono outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                {t('qrcode.error_correction', '容錯率 Error Correction')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['L', 'M', 'Q', 'H'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`py-2 border font-mono text-xs ${level === lvl ? 'bg-fg-editorial text-bg-editorial border-fg-editorial' : 'border-fg-editorial/30 hover:border-fg-editorial/80'}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px] mt-2 opacity-50 font-mono">
                L(7%), M(15%), Q(25%), H(30%)
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={!text}
              className="w-full flex items-center justify-center gap-3 bg-fg-editorial text-bg-editorial py-4 font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <Download size={16} />
              {t('qrcode.download', '下載 PNG 圖片 Download PNG')}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 p-8 border border-fg-editorial bg-fg-editorial/5 lg:sticky lg:top-8 h-full min-h-[400px]">
            <div 
              ref={qrRef}
              className="p-4 shadow-xl border border-black/10 overflow-hidden bg-white"
              style={{ backgroundColor: bgColor }}
            >
              <QRCodeCanvas 
                value={text || ' '} 
                size={size}
                level={level}
                marginSize={margin}
                fgColor={fgColor}
                bgColor={bgColor}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxWidth: '100%',
                  display: 'block' 
                }}
              />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">
              {text ? t('qrcode.preview', '即時預覽 Live Preview') : t('qrcode.waiting', '等待輸入... Waiting...')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
