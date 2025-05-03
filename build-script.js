// Custom build script for Vercel deployment
const { execSync } = require('child_process');

console.log('Starting custom build process for Vercel...');

try {
  // Build the client-side app with Vite
  console.log('Building client with Vite...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Create a simple server file for Vercel if needed
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}