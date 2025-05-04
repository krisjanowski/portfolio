export default {
    // existing config...
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          admin: 'public/admin/index.html'  // NEW!
        }
      }
    }
  }