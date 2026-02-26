/**
 * App.tsx is the routing layer this file: 
 * 1. Enables client-side routing.
 * 2. Defines all page URLs.
 * 3. Controls what components renders for each path.
 * 4. Wraps everything with shared layout (Navbar + Foot)
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import ApplicationDetails from "./pages/ApplicationDetails";

/**
 * 
 * @returns screens ro be render on a full page.
 * @BrowserRouter enables clean URLs, Back button support, clean-side navigation.
 * @AppNavar enables a Navbar
 * @Routes Looks at the current URL and match one of these routes.
 * @Route Links/paths to the location of you shared information with
 * @AppFooter enables and displays eacha foot 
 *
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />}/>
          <Route path="/add" element={<AddApplication />}/>
          <Route path="/applications/:id" element={<ApplicationDetails />} />
        </Routes>
        <AppFooter />
    </BrowserRouter>
  );
}

