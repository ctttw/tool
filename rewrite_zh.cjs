const fs = require('fs');
const path = 'src/locales/zh.json';
let content = JSON.parse(fs.readFileSync(path, 'utf-8'));

content.home.introduction = "關於 Utility Lab";
content.home.title = "為效率而生，\n極致安全的本地工具庫。";
content.home.desc = "告別繁雜的線上服務與隱私風險。我們精心打造了一系列專業、輕量且零延遲的實用工具，包含密碼產生、PDF合併、格式轉換與日常計算。所有的數據處理與運算皆在您的瀏覽器端獨立完成，無需上傳任何資料至伺服器，確保最極致的響應速度與百分之百的資料安全，隨時隨地為您的數位生活提供最可靠的支援。";
content.home.local_processing = "100% 本地端運算處理";
content.home.zero_tracking = "無伺服器、零資料追蹤";
content.home.instant_access = "即開即用的流暢體驗";

fs.writeFileSync(path, JSON.stringify(content, null, 2));
