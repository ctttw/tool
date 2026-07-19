import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import GuideModal from '../components/GuideModal';

export default function Discount() {
  const { t } = useTranslation();
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('100'); // 打幾t('discount.off'), e.g. 85 = 85折
  const [serviceFee, setServiceFee] = useState('10'); // 10%
  const [serviceFeeBase, setServiceFeeBase] = useState<'original' | 'discounted'>('original');

  const result = useMemo(() => {
    const price = parseFloat(originalPrice);
    const disc = parseFloat(discount);
    const fee = parseFloat(serviceFee);

    if (isNaN(price) || isNaN(disc) || isNaN(fee)) return null;

    const discountedPrice = price * (disc / 100);
    let feeAmount = 0;
    
    if (serviceFeeBase === 'original') {
      feeAmount = price * (fee / 100);
    } else {
      feeAmount = discountedPrice * (fee / 100);
    }

    const totalPrice = discountedPrice + feeAmount;
    const saved = price + feeAmount - totalPrice; // Not completely accurate if fee base is different, but let's say saved = original - discountedPrice.
    // wait, if no discount, total is price + fee.
    // if discount, total is discountedPrice + feeAmount.
    // saved is (price + originalFee) - (discountedPrice + feeAmount).
    const originalTotal = price + (price * (fee / 100));
    const totalSaved = originalTotal - totalPrice;

    return {
      discountedPrice,
      feeAmount,
      totalPrice,
      totalSaved: totalSaved > 0 ? totalSaved : 0,
    };
  }, [originalPrice, discount, serviceFee, serviceFeeBase]);

  return (
    <>

      <Helmet>
        <title>{t('discount.title')} - Utility Lab</title>
        <meta name="description" content={t('discount.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('discount.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('discount.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('discount.desc1')}<br/><br/>
          {t('discount.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent space-y-8">
        <div>
          <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2 flex items-center">
            {t('discount.original')}
            <GuideModal title={t('discount.guideTitle')}>
              <ul className="list-disc pl-5 space-y-2">
                <li>{t('discount.guide1')}</li>
                <li>{t('discount.guide2')}</li>
                <li>{t('discount.guide3')}</li>
                <li>{t('discount.guide4')}</li>
              </ul>
            </GuideModal>
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder={t('discount.placeholder')}
            className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-3 outline-none focus:border-b-2 font-mono text-2xl transition-all placeholder:opacity-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
              {t('discount.discount')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-3 outline-none focus:border-b-2 font-mono text-xl transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono opacity-50">%</span>
            </div>
            <p className="text-[10px] opacity-50 mt-2 font-mono uppercase tracking-widest">{t('discount.discountHint')}</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-2">
              {t('discount.service')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                className="w-full bg-transparent border-b border-fg-editorial text-fg-editorial p-3 outline-none focus:border-b-2 font-mono text-xl transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono opacity-50">%</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-mono opacity-60 mb-4">
            {t('discount.feeBase')}
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setServiceFeeBase('original')}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors border border-fg-editorial ${
                serviceFeeBase === 'original' 
                  ? 'bg-fg-editorial text-bg-editorial' 
                  : 'text-fg-editorial hover:bg-fg-editorial/10'
              }`}
            >
              {t('discount.feeBaseOriginal')}
            </button>
            <button
              onClick={() => setServiceFeeBase('discounted')}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors border border-fg-editorial ${
                serviceFeeBase === 'discounted' 
                  ? 'bg-fg-editorial text-bg-editorial' 
                  : 'text-fg-editorial hover:bg-fg-editorial/10'
              }`}
            >
              {t('discount.feeBaseDiscounted')}
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-12 bg-fg-editorial text-bg-editorial p-8 md:p-10 animate-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center text-sm font-mono opacity-80">
              <span className="uppercase tracking-widest">{t('discount.discountedAmount')}</span>
              <span>{result.discountedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-mono opacity-80">
              <span className="uppercase tracking-widest">{t('discount.serviceFeeLabel')} ({serviceFee}%)</span>
              <span>+{result.feeAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-mono text-green-400">
              <span className="uppercase tracking-widest">{t('discount.totalSaved')}</span>
              <span>-{result.totalSaved.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="pt-6 mt-6 border-t border-bg-editorial/30 flex justify-between items-end">
              <span className="text-xs uppercase tracking-widest font-mono opacity-70 mb-1">{t('discount.finalTotal')}</span>
              <span className="text-5xl font-serif italic">
                {result.totalPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  
    </>
  );
}
