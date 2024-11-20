import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Installation } from "./pages/Installation/Installation";
import { Examples } from "./pages/Examples/Examples";
import { API } from "./pages/API/API";
import { Accessibility } from "./pages/Accessibility/Accessibility";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="installation" element={<Installation />} />
          <Route path="examples" element={<Examples />} />
          <Route path="api" element={<API />} />
          <Route path="accessibility" element={<Accessibility />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
