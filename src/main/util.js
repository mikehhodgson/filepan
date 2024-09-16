import { lstatSync, readdirSync } from 'fs';
//import { extname } from 'path';

export const handleDroppedFiles = (event, arg) => {
  console.log('Dropped File(s):', arg);

  if (arg.length != 1) {
    return 'Need single directory path';
  }

  const path = arg[0];

  try {
    const stats = lstatSync(path);
    if (stats.isDirectory()) {
      return listFilesInDirectory(path);
    } else {
      return 'Did not receive directory';
    }
  } catch (error) {}

  return `Received no path.`;
};

//const supportedFileTypes = ['jpg', 'png', 'jpeg'];

function listFilesInDirectory(directoryPath) {
  const fileNames = [];
  const dirents = readdirSync(directoryPath);
  for (const dirent of dirents) {
    //if (supportedFileTypes.includes(extname(dirent).toLowerCase())) {
    fileNames.push(dirent);
    //}
  }
  return fileNames;
}
