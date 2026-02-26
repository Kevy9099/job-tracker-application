/** React entry point file, this file:
 * 1. Finds the <div><div> in the index.html
 * 2. Creates a React root.
 * 3. Renders an entire app inside.
 * 4. wraps it in StrictMode.
 * 5. Loads Booststrap globb
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
