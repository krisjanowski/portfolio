import React, { useEffect } from "react";

export default function Admin() {
    useEffect(() => {
        import("decap-cms").then(({ default: CMS }) => {
            // Dynamically create CMS root if it doesn't exist
            let root = document.getElementById("cms-root");
            if (!root) {
                root = document.createElement("div");
                root.id = "cms-root";
                document.body.appendChild(root);
            }

            // Init CMS with explicit config.json and prevent auto-detect
            CMS.init({
                root,
                config: '/admin/config.json',
                load_config_file: false // 🚨 stops DecapCMS from trying to auto-load config.yml
            });

            // OPTIONAL: Mutation observer to remove Decap error box if it appears
            const observer = new MutationObserver(() => {
                const errorBox = document.querySelector("h1");
                if (
                    errorBox &&
                    errorBox.textContent.includes("Error") &&
                    errorBox.parentElement
                ) {
                    console.warn("Decap CMS error detected - removing error box from DOM.");
                    errorBox.parentElement.remove();
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });

            // Cleanup observer on unmount
            return () => observer.disconnect();
        }).catch(err => {
            console.error("Failed to load Decap CMS:", err);
        });
    }, []);

    // Nothing rendered by React itself
    return null;
}
