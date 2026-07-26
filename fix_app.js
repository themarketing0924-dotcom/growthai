const fs = require('fs');
const file = './src/App.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Add import
const importLine = "import MainLandingPage from './pages/MainLandingPage';";
lines.splice(8, 0, importLine);

// Find the start of the <Route path="/" element={
let startIdx = lines.findIndex(l => l.includes('<Route path="/" element={'));
let endIdx = lines.findIndex(l => l.includes('<Route path="*" element={wrap(<NotFoundPage />)} />'));

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = '      <Route path="/" element={wrap(<MainLandingPage />)} />';
    lines.splice(startIdx, endIdx - startIdx, replacement);
}

fs.writeFileSync(file, lines.join('\n'));
console.log('App.tsx fixed');
