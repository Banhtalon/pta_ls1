const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      try {
        execSync(`node -c "${fullPath}"`, { stdio: 'ignore' });
      } catch (e) {
        console.error(`\x1b[31mSyntax error in ${fullPath}\x1b[0m`);
        process.exit(1);
      }
    }
  }
}

console.log('Checking JavaScript syntax...');
checkDir('js');
console.log('\x1b[32mAll JS files passed syntax check.\x1b[0m');
