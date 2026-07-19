import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import GuideModal from '../components/GuideModal';

export default function StockFee() {
  const { t } = useTranslation();
  
  const [buyPrice, setBuyPrice] = useState('100');
  const [sellPrice, setSellPrice] = useState('110');
  const [shares, setShares] = useState('1000');
  const [discount, setDiscount] = useState('100'); // 100 means no discount
  const [minFee, setMinFee] = useState('20');
  const [taxRate, setTaxRate] = useState('0.003'); // default stock

  const result = useMemo(() => {
    const buyP = parseFloat(buyPrice);
    const sellP = parseFloat(sellPrice);
    const s = parseInt(shares, 10);
    const d = parseFloat(discount);
    const m = parseFloat(minFee);
    const tax = parseFloat(taxRate);

    if (isNaN(buyP) || isNaN(sellP) || isNaN(s) || isNaN(d) || isNaN(m) || isNaN(tax) || s <= 0) {
      return null;
    }

    const standardFeeRate = 0.001425;
    
    // Calculate Buy
    let rawBuyFee = Math.floor(buyP * s * standardFeeRate * (d / 100));
    const buyFeeAmt = Math.max(m, rawBuyFee);
    const buyCost = Math.floor(buyP * s) + buyFeeAmt;

    // Calculate Sell
    let rawSellFee = Math.floor(sellP * s * standardFeeRate * (d / 100));
    const sellFeeAmt = Math.max(m, rawSellFee);
    const taxAmt = Math.floor(sellP * s * tax);
    const sellRevenue = Math.floor(sellP * s) - sellFeeAmt - taxAmt;

    const netProfit = sellRevenue - buyCost;
    const roi = buyCost > 0 ? (netProfit / buyCost) * 100 : 0;

    return {
      buyFeeAmt,
      buyCost,
      sellFeeAmt,
      taxAmt,
      sellRevenue,
      netProfit,
      roi
    };

  }, [buyPrice, sellPrice, shares, discount, minFee, taxRate]);

  return (
    <>

      <Helmet>
        <title>{t('stockfee.title')} - Utility Lab</title>
        <meta name="description" content={t('stockfee.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('stockfee.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('stockfee.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('stockfee.desc1')}<br/><br/>
          {t('stockfee.desc2')}
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center">
            <h2 className="text-xl font-serif italic tracking-wide">
              {t('common.inputRule', '輸入參數')}
            </h2>
            <GuideModal title={t('stockfee.guideTitle')}>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>{t('common.inputRule')}</strong>：<br/>{t('stockfee.guide1')}</li>
                <li><strong>{t('common.calcLogic')}</strong>：<br/><span className="whitespace-pre-line">{t('stockfee.guide2')}</span></li>
              </ul>
            </GuideModal>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('stockfee.buyPrice')}
                </label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-2 outline-none focus:border-b-2 font-mono text-lg transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('stockfee.sellPrice')}
                </label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-2 outline-none focus:border-b-2 font-mono text-lg transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                {t('stockfee.shares')}
              </label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-2 outline-none focus:border-b-2 font-mono text-lg transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('stockfee.discount')} (%)
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-2 outline-none focus:border-b-2 font-mono text-lg transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                  {t('stockfee.minFee')}
                </label>
                <input
                  type="number"
                  value={minFee}
                  onChange={(e) => setMinFee(e.target.value)}
                  className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-2 outline-none focus:border-b-2 font-mono text-lg transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
                {t('stockfee.taxRate')}
              </label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full bg-transparent border border-fg-editorial text-fg-editorial p-3 outline-none focus:bg-fg-editorial/5 font-mono text-sm transition-colors cursor-pointer appearance-none"
              >
                <option value="0.003">{t('stockfee.taxStock')}</option>
                <option value="0.001">{t('stockfee.taxEtf')}</option>
                <option value="0.0015">{t('stockfee.taxDayTrade')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-fg-editorial text-bg-editorial p-8 flex flex-col justify-center">
          <h2 className="text-xl font-serif italic tracking-wide mb-6 opacity-80">
            {t('stockfee.result')}
          </h2>
          {result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-mono opacity-60 mb-1">{t('stockfee.buyFee')}</p>
                  <p className="text-xl font-mono">{result.buyFeeAmt.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-mono opacity-60 mb-1">{t('stockfee.buyCost')}</p>
                  <p className="text-xl font-mono">{result.buyCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-mono opacity-60 mb-1">{t('stockfee.sellFee')}</p>
                  <p className="text-xl font-mono">{result.sellFeeAmt.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-mono opacity-60 mb-1">{t('stockfee.tax')}</p>
                  <p className="text-xl font-mono">{result.taxAmt.toLocaleString()}</p>
                </div>
                <div className="col-span-2 border-t border-bg-editorial/30 pt-4">
                  <p className="text-[10px] uppercase tracking-widest font-mono opacity-60 mb-1">{t('stockfee.sellRevenue')}</p>
                  <p className="text-xl font-mono">{result.sellRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t border-bg-editorial pt-6">
                <p className="text-xs uppercase tracking-widest font-mono opacity-60 mb-2">{t('stockfee.netProfit')}</p>
                <div className="flex items-end gap-4">
                  <p className={`text-4xl md:text-5xl font-mono font-medium ${result.netProfit > 0 ? 'text-[#a1e4ba] dark:text-[#a1e4ba]' : result.netProfit < 0 ? 'text-[#ff9c9c] dark:text-[#ff9c9c]' : ''}`}>
                    {result.netProfit > 0 ? '+' : ''}{result.netProfit.toLocaleString()}
                  </p>
                  <p className="text-lg font-mono opacity-80 pb-1">
                    ({result.roi > 0 ? '+' : ''}{result.roi.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs font-mono uppercase tracking-widest opacity-50">{t('common.awaiting')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  
    </>
  );
}
