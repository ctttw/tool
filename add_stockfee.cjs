const fs = require('fs');

const zh = require('./src/locales/zh.json');
const en = require('./src/locales/en.json');
const ja = require('./src/locales/ja.json');
const es = require('./src/locales/es.json');

// nav
zh.nav.stockfee = "股票手續費";
en.nav.stockfee = "Stock Fee";
ja.nav.stockfee = "株式手数料";
es.nav.stockfee = "Tarifa de Acciones";

// home
zh.home.tools.stockfee = { title: "股票手續費", desc: "計算台股買賣成本、手續費、稅金及投資淨損益。" };
en.home.tools.stockfee = { title: "Stock Fee", desc: "Calculate stock trading costs, fees, taxes and net profit." };
ja.home.tools.stockfee = { title: "株式手数料", desc: "株式の取引コスト、手数料、税金、純利益を計算します。" };
es.home.tools.stockfee = { title: "Tarifa de Acciones", desc: "Calcule costos comerciales, tarifas, impuestos y ganancias netas." };

// stockfee
zh.stockfee = {
  title: "股票手續費計算", subtitle: "Stock Fee Calculator",
  desc1: "快速計算台股買賣手續費、證交稅及損益。",
  desc2: "投資股票時，除了股價本身的價差，手續費與證交稅也是影響獲利的重要因素。本工具提供買賣雙邊的完整試算，支援自訂手續費折數、最低手續費限制，以及不同證券類型的稅率差異，讓您在進出場前精準掌握成本與實際獲利。",
  buyPrice: "買入股價 Buy Price", sellPrice: "賣出股價 Sell Price", shares: "股數 Shares",
  discount: "手續費折數 Brokerage Discount", minFee: "最低手續費 Min Fee", taxRate: "證交稅率 Tax Rate",
  taxStock: "一般股票 Stock (0.3%)", taxEtf: "ETF (0.1%)", taxDayTrade: "現股當沖 Day Trade (0.15%)",
  guideTitle: "股票手續費操作指南",
  guide1: "買賣股價：請輸入成交價格。股數：台股一張為 1000 股。手續費折數：券商折扣，6折輸入60，無折扣輸入100。最低手續費：未達此金額時之低收門檻。",
  guide2: "買進手續費 = 買入股價 × 股數 × 0.1425% × 折數\n賣出手續費 = 賣出股價 × 股數 × 0.1425% × 折數\n證交稅 = 賣出股價 × 股數 × 稅率\n買進成本 = 買價總額 + 買進手續費\n賣出收入 = 賣價總額 - 賣出手續費 - 證交稅\n淨損益 = 賣出收入 - 買進成本\n(計算結果均無條件捨去至整數)",
  buyCost: "買進總成本", sellRevenue: "賣出總收入", buyFee: "買進手續費", sellFee: "賣出手續費",
  tax: "證券交易稅", netProfit: "淨損益", roi: "報酬率 ROI", result: "試算結果", price: "股價 Price", amount: "總額 Amount", fees: "各項費用 Fees", profit: "損益 Profit"
};

en.stockfee = {
  title: "Stock Fee Calculator", subtitle: "Stock Fee Calculator",
  desc1: "Quickly calculate stock trading fees, taxes, and profits.",
  desc2: "In addition to the price difference, fees and taxes are important factors affecting profitability. This tool provides a complete calculation of buying and selling costs, supporting custom broker discounts and different tax rates.",
  buyPrice: "Buy Price", sellPrice: "Sell Price", shares: "Shares",
  discount: "Brokerage Discount (%)", minFee: "Min Brokerage Fee", taxRate: "Tax Rate",
  taxStock: "Stock (0.3%)", taxEtf: "ETF (0.1%)", taxDayTrade: "Day Trade (0.15%)",
  guideTitle: "Stock Fee Guide",
  guide1: "Enter buy/sell prices and shares. Brokerage Discount: e.g. 60 for 40% off. Min Fee: Minimum fee charged by the broker.",
  guide2: "Brokerage Fee = Price × Shares × 0.1425% × Discount.\nTax = Sell Price × Shares × Tax Rate.\nNet Profit = Sell Revenue - Buy Cost.",
  buyCost: "Total Buy Cost", sellRevenue: "Total Sell Revenue", buyFee: "Buy Fee", sellFee: "Sell Fee",
  tax: "Transaction Tax", netProfit: "Net Profit", roi: "ROI", result: "Calculation Result", price: "Price", amount: "Amount", fees: "Fees", profit: "Profit"
};

ja.stockfee = {
  title: "株式手数料計算", subtitle: "Stock Fee Calculator",
  desc1: "株式取引の手数料、税金、および利益をすばやく計算します。",
  desc2: "価格差に加えて、手数料や税金も収益性に影響を与える重要な要因です。このツールは、売買コストの完全な計算を提供し、カスタム割引や異なる税率をサポートします。",
  buyPrice: "購入価格", sellPrice: "売却価格", shares: "株数",
  discount: "手数料割引 (%)", minFee: "最低手数料", taxRate: "税率",
  taxStock: "一般株式 (0.3%)", taxEtf: "ETF (0.1%)", taxDayTrade: "デイトレード (0.15%)",
  guideTitle: "株式手数料ガイド",
  guide1: "購入/売却価格と株数を入力します。割引：例 60 は 40% オフ。最低手数料：証券会社によって請求される最低手数料。",
  guide2: "手数料 = 価格 × 株数 × 0.1425% × 割引。\n税金 = 売却価格 × 株数 × 税率。\n純利益 = 売却収入 - 購入コスト。",
  buyCost: "総購入コスト", sellRevenue: "総売却収入", buyFee: "購入手数料", sellFee: "売却手数料",
  tax: "取引税", netProfit: "純利益", roi: "ROI", result: "計算結果", price: "価格", amount: "合計", fees: "各種費用", profit: "損益"
};

es.stockfee = {
  title: "Calculadora de Tarifas de Acciones", subtitle: "Stock Fee Calculator",
  desc1: "Calcule rápidamente las tarifas, los impuestos y las ganancias del comercio de acciones.",
  desc2: "Además de la diferencia de precios, las tarifas y los impuestos son factores importantes que afectan la rentabilidad. Esta herramienta proporciona un cálculo completo de los costos.",
  buyPrice: "Precio de Compra", sellPrice: "Precio de Venta", shares: "Acciones",
  discount: "Descuento de Corretaje (%)", minFee: "Tarifa Mínima", taxRate: "Tasa de Impuesto",
  taxStock: "Acciones (0.3%)", taxEtf: "ETF (0.1%)", taxDayTrade: "Day Trade (0.15%)",
  guideTitle: "Guía de Tarifas de Acciones",
  guide1: "Ingrese precios y acciones. Descuento: ej. 60 para 40% de descuento. Tarifa Mínima: Tarifa mínima cobrada por el corredor.",
  guide2: "Tarifa = Precio × Acciones × 0.1425% × Descuento.\nImpuesto = Precio de Venta × Acciones × Tasa de Impuesto.\nBeneficio Neto = Ingreso de Venta - Costo de Compra.",
  buyCost: "Costo Total de Compra", sellRevenue: "Ingreso Total de Venta", buyFee: "Tarifa de Compra", sellFee: "Tarifa de Venta",
  tax: "Impuesto de Transacción", netProfit: "Beneficio Neto", roi: "ROI", result: "Resultado", price: "Precio", amount: "Cantidad", fees: "Tarifas", profit: "Beneficio"
};

fs.writeFileSync('./src/locales/zh.json', JSON.stringify(zh, null, 2));
fs.writeFileSync('./src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('./src/locales/ja.json', JSON.stringify(ja, null, 2));
fs.writeFileSync('./src/locales/es.json', JSON.stringify(es, null, 2));

console.log('Stock fee locales added.');
