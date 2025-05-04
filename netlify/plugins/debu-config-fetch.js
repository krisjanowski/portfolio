module.exports = {
    onInit: async ({ utils }) => {
      // Log the current environment and files being served
      console.log("Netlify Build Debug: Checking for CMS config files...");
  
      const fs = require("fs");
      const path = require("path");
  
      // Check if config.yml exists in the build folder
      const configPath = path.resolve("public/admin/config.yml");
      if (fs.existsSync(configPath)) {
        console.log("Found config.yml in the build folder");
      } else {
        console.log("No config.yml found in the build folder");
      }
  
      // Check if config.json exists in the build folder
      const configJsonPath = path.resolve("public/admin/config.json");
      if (fs.existsSync(configJsonPath)) {
        console.log("Found config.json in the build folder");
      } else {
        console.log("No config.json found in the build folder");
      }
  
      // Check other potential areas for config.yml or config.json
      const adminPath = path.resolve("public/uploads/config.yml");
      if (fs.existsSync(adminPath)) {
        console.log("Found config.yml under public/uploads");
      }
    }
  };
  