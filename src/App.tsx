import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import ApplicationDetails from "./pages/ApplicationDetails";

export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />}/>
          <Route path="/add" element={<AddApplication />}/>
          <Route path="applications/:id" element={<ApplicationDetails />}/>
        </Routes>
        <AppFooter />
    </BrowserRouter>
  );
}

