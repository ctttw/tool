const fs = require('fs');

const data = {
  en: {
    datediff: { guideTitle: 'Date Diff Guide' },
    percentage: { guideTitle: 'Percentage Guide' },
    passwordgen: { guideTitle: 'Password Generator Guide' },
    qrcode: { guideTitle: 'QR Code Guide' }
  },
  zh: {
    datediff: { guideTitle: '日期差計算操作指南' },
    percentage: { guideTitle: '百分比計算操作指南' },
    passwordgen: { guideTitle: '密碼產生器操作指南' },
    qrcode: { guideTitle: 'QR 碼產生器操作指南' }
  },
  ja: {
    datediff: { guideTitle: '日付差分計算ガイド' },
    percentage: { guideTitle: 'パーセント計算ガイド' },
    passwordgen: { guideTitle: 'パスワード生成ガイド' },
    qrcode: { guideTitle: 'QRコード生成ガイド' }
  },
  es: {
    datediff: { guideTitle: 'Guía de Diferencia de Fechas' },
    percentage: { guideTitle: 'Guía de Porcentaje' },
    passwordgen: { guideTitle: 'Guía de Generador de Contraseñas' },
    qrcode: { guideTitle: 'Guía de Código QR' }
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
