const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting custom build process for Vercel...');

try {
  // Build the client-side app with Vite
  console.log('Building client with Vite...');
  execSync('vite build', { stdio: 'inherit' });

  // Check if a server file is required (for server-side rendering or custom API)
  const serverFilePath = path.join(__dirname, 'server.js');
  if (!fs.existsSync(serverFilePath)) {
    console.log('Server file not found. Creating a simple server file for Vercel...');
    
    // Create a basic server file if not exists (adjust as per your app needs)
    const serverFileContent = `
      const express = require('express');
      const path = require('path');
      
      const app = express();
      const PORT = process.env.PORT || 3000;
      
      app.use(express.static(path.join(__dirname, 'dist')));
      
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      });
      
      app.listen(PORT, () => {
        console.log('Server running on port', PORT);
      });
    `;

    // Write the server file
    fs.writeFileSync(serverFilePath, serverFileContent, 'utf-8');
    console.log('Simple server file created at:', serverFilePath);
  }

  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
