const fs = require('fs');

const data = {
  en: {
    common: { close: 'Close', guide: 'Guide' },
    home: {
      introduction: 'Introduction',
      local_processing: 'Local Processing',
      zero_tracking: 'Zero Data Tracking',
      instant_access: 'Instant Access'
    },
    age: {
      detailed_age: 'DETAILED AGE',
      yrs: 'YRS',
      mos: 'MOS',
      d: 'D',
      total_months: 'TOTAL MONTHS',
      total_days: 'TOTAL DAYS'
    },
    bmi: { index_result: 'INDEX RESULT' },
    datediff: { total_days: 'TOTAL DAYS' },
    imagecompress: {
      select_image: 'Select or drag image file',
      local_only: 'Local Processing Only',
      compressed: 'COMPRESSED'
    },
    pdfmerge: {
      title: 'PDF Merger',
      select_pdf: 'Select or drag PDF files',
      local_only: 'Local Processing Only'
    },
    percentage: {
      is: 'IS',
      of: 'OF',
      from: 'FROM',
      to: 'TO'
    }
  },
  zh: {
    common: { close: '關閉', guide: '操作指南' },
    home: {
      introduction: '簡介',
      local_processing: '本地處理',
      zero_tracking: '零資料追蹤',
      instant_access: '即時存取'
    },
    age: {
      detailed_age: '詳細年齡',
      yrs: '年',
      mos: '月',
      d: '天',
      total_months: '總月數',
      total_days: '總天數'
    },
    bmi: { index_result: '指數結果' },
    datediff: { total_days: '總天數' },
    imagecompress: {
      select_image: '選擇或拖曳圖片檔案',
      local_only: '僅在本地處理',
      compressed: '壓縮後'
    },
    pdfmerge: {
      title: 'PDF 合併',
      select_pdf: '選擇或拖曳 PDF 檔案',
      local_only: '僅在本地處理'
    },
    percentage: {
      is: '是',
      of: '的',
      from: '從',
      to: '至'
    }
  },
  ja: {
    common: { close: '閉じる', guide: 'ガイド' },
    home: {
      introduction: 'はじめに',
      local_processing: 'ローカル処理',
      zero_tracking: 'データ追跡なし',
      instant_access: '即時アクセス'
    },
    age: {
      detailed_age: '詳細な年齢',
      yrs: '年',
      mos: 'ヶ月',
      d: '日',
      total_months: '合計月数',
      total_days: '合計日数'
    },
    bmi: { index_result: '判定結果' },
    datediff: { total_days: '合計日数' },
    imagecompress: {
      select_image: '画像ファイルを選択またはドラッグ',
      local_only: 'ローカル処理のみ',
      compressed: '圧縮後'
    },
    pdfmerge: {
      title: 'PDF結合',
      select_pdf: 'PDFファイルを選択またはドラッグ',
      local_only: 'ローカル処理のみ'
    },
    percentage: {
      is: 'は',
      of: 'の',
      from: 'から',
      to: 'まで'
    }
  },
  es: {
    common: { close: 'Cerrar', guide: 'Guía' },
    home: {
      introduction: 'Introducción',
      local_processing: 'Procesamiento Local',
      zero_tracking: 'Cero Seguimiento de Datos',
      instant_access: 'Acceso Instantáneo'
    },
    age: {
      detailed_age: 'EDAD DETALLADA',
      yrs: 'AÑOS',
      mos: 'MESES',
      d: 'DÍAS',
      total_months: 'MESES TOTALES',
      total_days: 'DÍAS TOTALES'
    },
    bmi: { index_result: 'RESULTADO DEL ÍNDICE' },
    datediff: { total_days: 'DÍAS TOTALES' },
    imagecompress: {
      select_image: 'Seleccionar o arrastrar imagen',
      local_only: 'Solo Procesamiento Local',
      compressed: 'COMPRIMIDO'
    },
    pdfmerge: {
      title: 'Fusión de PDF',
      select_pdf: 'Seleccionar o arrastrar archivos PDF',
      local_only: 'Solo Procesamiento Local'
    },
    percentage: {
      is: 'ES',
      of: 'DE',
      from: 'DE',
      to: 'A'
    }
  }
};

['en', 'zh', 'ja', 'es'].forEach(lang => {
  const filePath = `src/locales/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Merge data
    for (const [key, value] of Object.entries(data[lang])) {
      content[key] = { ...content[key], ...value };
    }
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  }
});
console.log('Translations updated.');
