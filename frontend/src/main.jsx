import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ScreenCheck from './ScreenCheck';
import DisableActions from './utils/DisableActions';
import "@fontsource/unifont"; 
import "@fontsource/unifont/400.css"; // Specify weight

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <DisableActions/>
      <ScreenCheck/>
  </React.StrictMode>
);
