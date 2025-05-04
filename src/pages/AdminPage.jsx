import React, { useEffect } from 'react';
import CMS from 'decap-cms';
import 'decap-cms/dist/cms.css';

export default function AdminPage() {
  useEffect(() => {
    // Dynamically create CMS root if it doesn't exist
    let root = document.getElementById('cms-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'cms-root';
      document.body.appendChild(root);
    }

    // Initialize CMS
    CMS.init({
      config: '/admin/config.json',
      load_config_file: false, // Prevent automatic loading of config.yml
      root: root,
    });

  }, []);

  return <div id="cms-root"></div>;
}
