const fs = require('fs');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('useTranslation')) {
    // try to insert useTranslation if it makes sense, but we should assume most have it.
    console.log(`Warning: ${filePath} might not have useTranslation`);
  }

  replacements.forEach(([from, to]) => {
    content = content.replace(from, to);
  });
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/components/GuideModal.tsx', [
  ['title="操作指南"', 'title={title}'],
  ['>                  Close                </button>', `>                  {t('common.close')}                </button>`]
]);
let guideContent = fs.readFileSync('src/components/GuideModal.tsx', 'utf-8');
if (!guideContent.includes('useTranslation')) {
    guideContent = guideContent.replace('import { Info, X } from "lucide-react";', 'import { Info, X } from "lucide-react";\nimport { useTranslation } from "react-i18next";');
    guideContent = guideContent.replace('const [isOpen, setIsOpen] = useState(false);', 'const [isOpen, setIsOpen] = useState(false);\n  const { t } = useTranslation();');
    fs.writeFileSync('src/components/GuideModal.tsx', guideContent);
}

replaceInFile('src/pages/Home.tsx', [
  ['<span className="text-xs font-mono uppercase tracking-widest">Introduction</span>', '{t(\'home.introduction\') && <span className="text-xs font-mono uppercase tracking-widest">{t(\'home.introduction\')}</span>}'],
  ['<p>Local Processing</p>', '<p>{t(\'home.local_processing\')}</p>'],
  ['<p>Zero Data Tracking</p>', '<p>{t(\'home.zero_tracking\')}</p>'],
  ['<p>Instant Access</p>', '<p>{t(\'home.instant_access\')}</p>']
]);

replaceInFile('src/pages/Age.tsx', [
  ['<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-6">DETAILED AGE</p>', '<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-6">{t(\'age.detailed_age\')}</p>'],
  ['<span>{ageData.years}<span className="text-2xl font-mono not-italic opacity-50 ml-2">YRS</span></span>', '<span>{ageData.years}<span className="text-2xl font-mono not-italic opacity-50 ml-2">{t(\'age.yrs\')}</span></span>'],
  ['<span>{ageData.months}<span className="text-2xl font-mono not-italic opacity-50 ml-2">MOS</span></span>', '<span>{ageData.months}<span className="text-2xl font-mono not-italic opacity-50 ml-2">{t(\'age.mos\')}</span></span>'],
  ['<span>{ageData.days}<span className="text-2xl font-mono not-italic opacity-50 ml-2">D</span></span>', '<span>{ageData.days}<span className="text-2xl font-mono not-italic opacity-50 ml-2">{t(\'age.d\')}</span></span>'],
  ['<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-4">TOTAL MONTHS</p>', '<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-4">{t(\'age.total_months\')}</p>'],
  ['<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-4">TOTAL DAYS</p>', '<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-4">{t(\'age.total_days\')}</p>']
]);

replaceInFile('src/pages/Bmi.tsx', [
  ['<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-6">INDEX RESULT</p>', '<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-6">{t(\'bmi.index_result\')}</p>']
]);

replaceInFile('src/pages/DateDiff.tsx', [
  ['<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-6">TOTAL DAYS</p>', '<p className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-6">{t(\'datediff.total_days\')}</p>']
]);

replaceInFile('src/pages/ImageCompress.tsx', [
  ['<p className="font-serif italic text-lg mb-2">Select or drag image file</p>', '<p className="font-serif italic text-lg mb-2">{t(\'imagecompress.select_image\')}</p>'],
  ['<p className="text-[10px] font-mono tracking-widest uppercase opacity-50">Local Processing Only</p>', '<p className="text-[10px] font-mono tracking-widest uppercase opacity-50">{t(\'imagecompress.local_only\')}</p>'],
  ['<p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 mb-2">COMPRESSED</p>', '<p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 mb-2">{t(\'imagecompress.compressed\')}</p>']
]);

replaceInFile('src/pages/PdfMerge.tsx', [
  ['<p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">PDF Merger</p>', '<p className="text-xs uppercase tracking-widest font-mono opacity-50 mb-6">{t(\'pdfmerge.title\')}</p>'],
  ['<p className="font-serif italic text-lg mb-2">Select or drag PDF files</p>', '<p className="font-serif italic text-lg mb-2">{t(\'pdfmerge.select_pdf\')}</p>'],
  ['<p className="text-[10px] font-mono tracking-widest uppercase opacity-50">Local Processing Only</p>', '<p className="text-[10px] font-mono tracking-widest uppercase opacity-50">{t(\'pdfmerge.local_only\')}</p>']
]);

replaceInFile('src/pages/Percentage.tsx', [
  ['<span className="text-xs uppercase tracking-widest font-mono opacity-60">IS</span>', '<span className="text-xs uppercase tracking-widest font-mono opacity-60">{t(\'percentage.is\')}</span>'],
  ['<span className="text-xs uppercase tracking-widest font-mono opacity-60">IS</span>', '<span className="text-xs uppercase tracking-widest font-mono opacity-60">{t(\'percentage.is\')}</span>'],
  ['<span className="text-xs uppercase tracking-widest font-mono opacity-60">OF</span>', '<span className="text-xs uppercase tracking-widest font-mono opacity-60">{t(\'percentage.of\')}</span>'],
  ['<span className="text-xs uppercase tracking-widest font-mono opacity-60">FROM</span>', '<span className="text-xs uppercase tracking-widest font-mono opacity-60">{t(\'percentage.from\')}</span>'],
  ['<span className="text-xs uppercase tracking-widest font-mono opacity-60">TO</span>', '<span className="text-xs uppercase tracking-widest font-mono opacity-60">{t(\'percentage.to\')}</span>']
]);

console.log('Text replacements done.');
