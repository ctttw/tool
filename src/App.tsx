import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ZipCode from './pages/ZipCode';
import Bmi from './pages/Bmi';
import Age from './pages/Age';
import DateDiff from './pages/DateDiff';
import Percentage from './pages/Percentage';
import UnitConvert from './pages/UnitConvert';
import PdfMerge from './pages/PdfMerge';
import ImageCompress from './pages/ImageCompress';
import Discount from './pages/Discount';
import PasswordGen from './pages/PasswordGen';
import QrCode from './pages/QrCode';
import Privacy from './pages/Privacy';
import StockFee from './pages/StockFee';
import Currency from './pages/Currency';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="zipcode" element={<ZipCode />} />
          <Route path="bmi" element={<Bmi />} />
          <Route path="age" element={<Age />} />
          <Route path="datediff" element={<DateDiff />} />
          <Route path="percentage" element={<Percentage />} />
          <Route path="unitconvert" element={<UnitConvert />} />
          <Route path="discount" element={<Discount />} />
          <Route path="passwordgen" element={<PasswordGen />} />
          <Route path="qrcode" element={<QrCode />} />
          <Route path="pdfmerge" element={<PdfMerge />} />
          <Route path="imagecompress" element={<ImageCompress />} />
          <Route path="stockfee" element={<StockFee />} />
          <Route path="currency" element={<Currency />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
