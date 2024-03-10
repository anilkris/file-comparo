const express = require('express');

const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');

const assetsFolderPath = path.join(__dirname, 'input_files');
function getDirectoryStructure(dir) {
  let structure = {}; // Initialize an empty object to hold the directory structure

  // Get all items in the current directory
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const itemPath = path.join(dir, item); // Full path to the item
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      // If the item is a directory, recurse into it
      structure[item] = getDirectoryStructure(itemPath);
    } else {
      // If the item is a file, add its full path to the array
      if (!structure['files']) {
        structure['files'] = [];
      }
      structure['files'].push(itemPath); // Use itemPath for the full path
    }
  });

  return structure;
}

app.get('/api/files', (req, res) => {
    const currentDirectory =assetsFolderPath; 
    try {
        const directoryStructure = getDirectoryStructure(currentDirectory);
        res.json(directoryStructure);
    } catch (error) {
        res.status(500).send("Error listing files");
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
