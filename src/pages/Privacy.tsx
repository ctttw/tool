import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <>

      <Helmet>
        <title>{t('privacy.title')} - Utility Lab</title>
        <meta name="description" content={t('privacy.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('privacy.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('privacy.subtitle')}</p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent space-y-8">
        <div className="text-sm opacity-80 space-y-4 font-sans leading-relaxed text-left">
          <p><strong>{t('privacy.copyrightTitle')}</strong></p>
          <p>{t('privacy.copyrightText')}</p>
          <div className="w-8 h-[1px] bg-fg-editorial opacity-30 my-8"></div>
          <p><strong>{t('privacy.privacyTitle')}</strong></p>
          <p>{t('privacy.privacyIntro')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>{t('privacy.localTitle')}</strong>{t('privacy.localText')}</li>
            <li><strong>{t('privacy.dataTitle')}</strong>{t('privacy.dataText')}</li>
            <li><strong>{t('privacy.trackTitle')}</strong>{t('privacy.trackText')}</li>
          </ul>
          <p className="mt-6 pt-6 border-t border-fg-editorial/30 text-xs font-mono uppercase tracking-widest opacity-60">
            {t('privacy.footer')}
          </p>
        </div>
      </div>
    </div>
  
    </>
  );
}
