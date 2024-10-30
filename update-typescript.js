const fs = require('fs');
const path = require('path');

const directory = './src'; // your source folder

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Regex to find class properties without initializers
  const regex = /(private|public|protected|readonly)\s+(\w+):\s+(\w+)(\s*\/\/.*)?;/g;
  content = content.replace(regex, '$1 $2!: $3;');

  fs.writeFileSync(file, content);
}

function processDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.ts')) {
      processFile(filePath);
    }
  });
}

processDirectory(directory);
