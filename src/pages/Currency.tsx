import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { ArrowLeftRight, RefreshCcw } from 'lucide-react';
import GuideModal from '../components/GuideModal';

export default function Currency() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | string>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TWD');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await response.json();
      if (data.rates) {
        setRates(data.rates);
        setLastUpdated(new Date(data.time_last_update_unix * 1000).toLocaleString());
      }
    } catch (error) {
      console.error('Failed to fetch rates', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fromCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = amount ? (Number(amount) * (rates[toCurrency] || 1)).toFixed(2) : '0.00';
  const currencies = Object.keys(rates).length > 0 ? Object.keys(rates) : [fromCurrency, toCurrency];

  return (
    <>
      <Helmet htmlAttributes={{ lang: t('layout.lang', 'zh-TW') }}>
        <title>{t('currency.title', '匯率換算')} - Utility Lab</title>
        <meta name="description" content={t('currency.desc1', '即時獲取全球主要貨幣匯率，快速進行跨幣別換算。')} />
      </Helmet>
      
      <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
        <header className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('currency.title', '匯率換算')}</h1>
          <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6 flex items-center gap-2">
            {t('currency.subtitle', 'Currency Converter')}
            <GuideModal title={t('currency.title', '匯率換算')}>
              <ul className="list-disc pl-5 space-y-2 text-left">
                <li><strong>API</strong>: 使用 open.er-api.com 提供的免費匯率資料。</li>
                <li><strong>更新</strong>: 每小時自動更新最新匯率。也可點擊下方按鈕手動更新。</li>
              </ul>
            </GuideModal>
          </p>
          <p className="text-sm opacity-70 leading-relaxed font-medium">
            {t('currency.desc1', '即時獲取全球主要貨幣匯率，快速進行跨幣別換算。')}
          </p>
        </header>

        <div className="border border-fg-editorial p-8 md:p-12 bg-transparent space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('currency.amount', '金額 Amount')}</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent border border-fg-editorial text-fg-editorial p-4 outline-none focus:bg-fg-editorial/5 transition-colors font-mono text-xl"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('currency.from', '從 From')}</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-transparent border border-fg-editorial text-fg-editorial p-4 outline-none focus:bg-fg-editorial/5 transition-colors font-mono cursor-pointer appearance-none"
                  aria-label="From Currency"
                >
                  {currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSwap}
              aria-label="Swap Currencies"
              className="p-4 border border-fg-editorial rounded-full hover:bg-fg-editorial hover:text-bg-editorial transition-colors mt-8 md:mt-[4.5rem] md:shrink-0 group"
            >
              <ArrowLeftRight size={20} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>

            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('currency.converted', '換算後 Converted')}</label>
                <div className="w-full bg-fg-editorial/5 border border-fg-editorial/30 text-fg-editorial p-4 font-mono text-xl overflow-hidden text-ellipsis whitespace-nowrap min-h-[62px] flex items-center">
                  {loading ? '...' : convertedAmount}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('currency.to', '換算為 To')}</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-transparent border border-fg-editorial text-fg-editorial p-4 outline-none focus:bg-fg-editorial/5 transition-colors font-mono cursor-pointer appearance-none"
                  aria-label="To Currency"
                >
                  {currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-fg-editorial/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-60">
            <div>
              {t('currency.rate', '匯率 Rate')}: 1 {fromCurrency} = {rates[toCurrency] || '...'} {toCurrency}
            </div>
            <div className="flex items-center gap-3">
              <span>{t('currency.last_updated', '最後更新')}: {lastUpdated}</span>
              <button 
                onClick={fetchRates} 
                disabled={loading}
                className="hover:text-fg-editorial transition-colors disabled:opacity-50 p-1"
                aria-label="Refresh Rates"
                title="Refresh Rates"
              >
                <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
