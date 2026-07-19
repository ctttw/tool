import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import GuideModal from '../components/GuideModal';

export default function PasswordGen() {
  const { t } = useTranslation();
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let chars = '';
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      setPassword('');
      return;
    }

    let generated = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      generated += chars[array[i] % chars.length];
    }
    setPassword(generated);
    setCopied(false);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <>

      <Helmet>
        <title>{t('password.title')} - Utility Lab</title>
        <meta name="description" content={t('password.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('password.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('password.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('passwordgen.desc1')}<br/><br/>
          {t('passwordgen.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent space-y-8">
        <div>
          <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2 flex items-center justify-between">
            <div className="flex items-center">
              產生的密碼 Generated Password
              <GuideModal title={t('passwordgen.guideTitle')}>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li><strong>{t('common.inputRule')}</strong>：<br/><span className="whitespace-pre-line">{t('passwordgen.guide1')}</span></li>
                  <li><strong>{t('common.calcLogic')}</strong>：<br/><span className="whitespace-pre-line">{t('passwordgen.guide2')}</span></li>
                </ul>
              </GuideModal>
            </div>
            <button 
              onClick={generatePassword}
              className="hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span className="hidden sm:inline">{t('passwordgen.regenerate')}</span>
            </button>
          </label>
          <div className="relative group">
            <input
              type="text"
              readOnly
              value={password}
              className="w-full bg-fg-editorial/5 border border-fg-editorial text-fg-editorial p-4 outline-none font-mono text-xl md:text-2xl tracking-widest break-all"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-bg-editorial border border-fg-editorial hover:bg-fg-editorial hover:text-bg-editorial transition-colors"
              title="複製密碼"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-fg-editorial">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs uppercase tracking-widest font-mono opacity-60">
                {t('password.length')}: <span className="text-fg-editorial font-bold opacity-100">{length}</span>
              </label>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-fg-editorial"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 accent-fg-editorial"
              />
              <span className="text-sm font-mono opacity-80 group-hover:opacity-100 transition-opacity">{t('passwordgen.uppercase')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 accent-fg-editorial"
              />
              <span className="text-sm font-mono opacity-80 group-hover:opacity-100 transition-opacity">{t('passwordgen.lowercase')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 accent-fg-editorial"
              />
              <span className="text-sm font-mono opacity-80 group-hover:opacity-100 transition-opacity">{t('passwordgen.numbers')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 accent-fg-editorial"
              />
              <span className="text-sm font-mono opacity-80 group-hover:opacity-100 transition-opacity">!@# (符號)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
}
