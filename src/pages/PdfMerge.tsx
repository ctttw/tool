import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useRef, ChangeEvent } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FilePlus, Trash2, Download, Loader2 } from 'lucide-react';
import GuideModal from '../components/GuideModal';

export default function PdfMerge() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file: File) => file.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `merged_${new Date().getTime()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Merge failed', error);
      alert(`${t('pdfmerge.title')}失敗，請確定檔案沒有損壞或受到密碼保護。`);
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <>

      <Helmet>
        <title>{t('pdfmerge.title')} - Utility Lab</title>
        <meta name="description" content={t('pdfmerge.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('pdfmerge.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('pdfmerge.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('pdfmerge.desc1')}<br/><br/>
          {t('pdfmerge.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent">
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-fg-editorial hover:bg-fg-editorial/5 p-12 text-center cursor-pointer transition-colors relative"
        >
          <div className="absolute right-4 top-4" onClick={(e) => e.stopPropagation()}>
             <GuideModal title={t('pdfmerge.guideTitle')}>
              <ul className="list-disc pl-5 space-y-2 text-left">
                <li><strong>{t('common.inputRule')}</strong>：<br/><span className="whitespace-pre-line">{t('pdfmerge.guide1')}</span></li>
                <li><strong>{t('common.calcLogic')}</strong>：<br/><span className="whitespace-pre-line">{t('pdfmerge.guide2')}</span></li>
              </ul>
            </GuideModal>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            multiple
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center text-fg-editorial">
            <FilePlus size={32} className="mb-4 opacity-50 stroke-1" />
            <p className="font-serif italic text-lg mb-2">{t('pdfmerge.select_pdf')}</p>
            <p className="text-[10px] font-mono tracking-widest uppercase opacity-50">{t('pdfmerge.local_only')}</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-12 pt-8 border-t border-fg-editorial">
            <h3 className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-4">{t('pdfmerge.selected_files')} ({files.length})</h3>
            <ul className="space-y-0 mb-8 border-t border-fg-editorial">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between p-3 border-b border-fg-editorial hover:bg-fg-editorial/5 transition-colors group">
                  <span className="text-xs font-mono truncate mr-4 flex-1">
                    <span className="opacity-50 mr-2">{(index + 1).toString().padStart(2, '0')}</span> 
                    {file.name}
                  </span>
                  <div className="flex items-center gap-6 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono uppercase tracking-widest">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <button 
                      onClick={() => removeFile(index)}
                      className="hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={14} className="stroke-1" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isMerging}
              className="w-full py-4 bg-fg-editorial text-bg-editorial font-mono text-xs uppercase tracking-[0.2em] hover:bg-fg-editorial/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              {isMerging ? (
                <>
                  <Loader2 size={14} className="animate-spin stroke-1" />
                  MERGING...
                </>
              ) : (
                <>
                  <Download size={14} className="stroke-1" />
                  MERGE &amp; DOWNLOAD
                </>
              )}
            </button>
            {files.length < 2 && (
              <p className="text-center text-[10px] font-mono uppercase tracking-widest text-rose-500/70 mt-4">{t('pdfmerge.require_two')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  
    </>
  );
}
