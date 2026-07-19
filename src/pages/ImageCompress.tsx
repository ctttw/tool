import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useRef, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';
import { UploadCloud, Download, Loader2, FileImage } from 'lucide-react';
import GuideModal from '../components/GuideModal';

export default function ImageCompress() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [maxSizeMB, setMaxSizeMB] = useState('1');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type.startsWith('image/')) {
        setFile(selected);
        setCompressedFile(null);
        setPreviewUrl(URL.createObjectURL(selected));
      }
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);

    try {
      const options = {
        maxSizeMB: parseFloat(maxSizeMB),
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const result = await imageCompression(file, options);
      setCompressedFile(result);
    } catch (error) {
      console.error('Compression failed', error);
      alert(`${t('image.title')}失敗。`);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file?.name || 'image.jpg'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>

      <Helmet>
        <title>{t('image.title')} - Utility Lab</title>
        <meta name="description" content={t('image.desc1', t('home.desc'))} />
      </Helmet>
      <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-300 p-8 pt-12">
      <header className="text-center">
        <h1 className="text-4xl font-serif italic tracking-tight text-fg-editorial mb-4">{t('image.title')}</h1>
        <p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t('image.subtitle')}</p>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          {t('imagecompress.desc1')}<br/><br/>
          {t('imagecompress.desc2')}
        </p>
      </header>

      <div className="border border-fg-editorial p-8 md:p-12 bg-transparent">
        
        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-fg-editorial hover:bg-fg-editorial/5 p-12 text-center cursor-pointer transition-colors relative"
          >
            <div className="absolute right-4 top-4" onClick={(e) => e.stopPropagation()}>
               <GuideModal title={t('image.guideTitle')}>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li><strong>{t('common.inputRule')}</strong>：<br/><span className="whitespace-pre-line">{t('imagecompress.guide1')}</span></li>
                  <li><strong>{t('common.calcLogic')}</strong>：<br/><span className="whitespace-pre-line">{t('imagecompress.guide2')}</span></li>
                </ul>
              </GuideModal>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center text-fg-editorial">
              <UploadCloud size={32} className="mb-4 opacity-50 stroke-1" />
              <p className="font-serif italic text-lg mb-2">{t('imagecompress.select_image')}</p>
              <p className="text-[10px] font-mono tracking-widest uppercase opacity-50">{t('imagecompress.local_only')}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex items-center justify-between p-4 border-b border-fg-editorial">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-fg-editorial flex items-center justify-center shrink-0 opacity-50">
                  <FileImage size={24} className="stroke-1" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-widest truncate">{file.name}</p>
                  <p className="text-[10px] font-mono opacity-50">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setCompressedFile(null); setPreviewUrl(null); }}
                className="text-[10px] font-mono uppercase tracking-widest hover:opacity-50 transition-opacity"
              >
                Reset
              </button>
            </div>

            {previewUrl && (
              <div className="relative border border-fg-editorial bg-transparent h-64 flex items-center justify-center p-4">
                <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain grayscale opacity-80 mix-blend-multiply" />
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-fg-editorial">
              <label className="block text-xs uppercase tracking-widest font-mono opacity-60">TARGET SIZE (MB)</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={maxSizeMB}
                  onChange={(e) => setMaxSizeMB(e.target.value)}
                  className="w-32 bg-transparent border-b border-fg-editorial text-fg-editorial rounded-none p-2 outline-none focus:border-b-2 font-mono text-center text-xl"
                />
                <button
                  onClick={handleCompress}
                  disabled={isCompressing}
                  className="flex-1 py-3 px-4 bg-fg-editorial text-bg-editorial font-mono text-xs uppercase tracking-[0.2em] hover:bg-fg-editorial/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  {isCompressing ? <Loader2 size={14} className="animate-spin stroke-1" /> : 'COMPRESS'}
                </button>
              </div>
            </div>

            {compressedFile && (
              <div className="p-6 border border-fg-editorial flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 mb-2">{t('imagecompress.compressed')}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-serif italic tracking-tighter">
                      {(compressedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <span className="text-xs font-mono opacity-40 line-through">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3 px-6 border border-fg-editorial hover:bg-fg-editorial hover:text-bg-editorial font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors"
                >
                  <Download size={14} className="stroke-1" />
                  DOWNLOAD
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  
    </>
  );
}
