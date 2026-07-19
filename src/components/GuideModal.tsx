import { useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Info, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GuideModal({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center text-fg-editorial opacity-50 hover:opacity-100 transition-opacity ml-2 p-1 rounded-full hover:bg-fg-editorial/5"
        title={title}
        aria-label={t('common.info', 'Info')}
      >
        <Info size={16} className="stroke-1" />
      </button>

      {isOpen &&
        createPortal(
          <div 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="modal-title" 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-bg-editorial/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="absolute inset-0"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="relative bg-bg-editorial border border-fg-editorial w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t('common.close', 'Close')}
                className="absolute top-4 right-4 p-2 text-fg-editorial opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={20} className="stroke-1" />
              </button>
              <h3 className="text-2xl font-serif italic mb-6 border-b border-fg-editorial pb-4">
                {title}
              </h3>
              <div className="text-sm opacity-80 space-y-4 font-sans leading-relaxed text-left">
                {children}
              </div>
              <div className="mt-8 pt-6 border-t border-fg-editorial text-right">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-fg-editorial text-bg-editorial font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
