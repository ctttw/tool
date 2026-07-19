const fs = require('fs');

const updateLang = (file, data) => {
  const path = `src/locales/${file}.json`;
  if (!fs.existsSync(path)) return;
  let content = JSON.parse(fs.readFileSync(path, 'utf-8'));
  content.home.introduction = data.introduction;
  content.home.title = data.title;
  content.home.desc = data.desc;
  content.home.local_processing = data.local_processing;
  content.home.zero_tracking = data.zero_tracking;
  content.home.instant_access = data.instant_access;
  fs.writeFileSync(path, JSON.stringify(content, null, 2));
};

updateLang('en', {
  introduction: "About Utility Lab",
  title: "Built for Efficiency,\nSecure Local Utilities.",
  desc: "Say goodbye to complex online services and privacy risks. We provide a suite of professional, lightweight, and zero-latency web tools. All data processing and calculations are performed entirely in your browser without uploading to any server, ensuring the fastest response times and 100% data privacy. Your reliable companion for everyday digital tasks.",
  local_processing: "100% Local Processing",
  zero_tracking: "Zero Server Tracking",
  instant_access: "Instant Access & Fluid UX"
});

updateLang('ja', {
  introduction: "Utility Lab について",
  title: "効率を追求した\n究極の安全ローカルツール",
  desc: "複雑なオンラインサービスやプライバシーのリスクに別れを告げましょう。プロフェッショナルで軽量、遅延のない実用的なWebツールを提供します。すべてのデータ処理と計算はブラウザ内で完結し、サーバーへのアップロードは一切ありません。最高最速のレスポンスと100%のデータプライバシーを保証します。",
  local_processing: "100% ローカル処理",
  zero_tracking: "サーバー追跡ゼロ",
  instant_access: "瞬時にアクセス可能な体験"
});

updateLang('es', {
  introduction: "Acerca de Utility Lab",
  title: "Diseñado para la Eficiencia,\nHerramientas Locales Seguras.",
  desc: "Diga adiós a los servicios en línea complejos y los riesgos de privacidad. Ofrecemos un conjunto de herramientas web profesionales, ligeras y sin latencia. Todo el procesamiento de datos se realiza en su navegador sin subir nada a ningún servidor, garantizando la máxima velocidad y total privacidad de datos.",
  local_processing: "100% Procesamiento Local",
  zero_tracking: "Cero Seguimiento de Servidor",
  instant_access: "Acceso Instantáneo y Fluido"
});

