import { Routes, Route } from "react-router-dom";

import ContactPage from "../pages/ContactPage";
import ContactDetailsPage from "../pages/ContactDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ContactPage />} />

      <Route path="/contact/:id" element={<ContactDetailsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
