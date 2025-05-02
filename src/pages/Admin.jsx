import React, { useEffect } from 'react';

export default function Admin() {
  useEffect(() => {
    // 1. inject the CMS script
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/decap-cms@3.6.2/dist/decap-cms.js';
    s.onload = () => {
      // 2. manual init once the script is ready
      window.CMS_MANUAL_INIT = true;
      CMS.init({ config: '/config.yml' });
    };
    document.body.appendChild(s);

    // cleanup if you ever unmount
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  // 3. Render the mount point
  return <div id="nc-root" style={{ height: '100vh' }} />;
}
