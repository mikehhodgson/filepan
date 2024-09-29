import { lstatSync, readdirSync } from 'fs';
//import { extname } from 'path';

export const handleDroppedFiles = (browserWindow) => (event, arg) => {
  console.log('Dropped File(s):', arg);

  if (arg.length != 1) {
    browserWindow.webContents.send(
      'update-files',
      'Need single directory path'
    );
    return;
  }

  const path = arg[0];

  try {
    const stats = lstatSync(path);
    if (stats.isDirectory()) {
      browserWindow.webContents.send(
        'update-files',
        listFilesInDirectory(path)
      );
      return;
    } else {
      browserWindow.webContents.send(
        'update-files',
        'Did not receive directory'
      );
      return;
    }
  } catch (error) {}

  browserWindow.webContents.send('update-files', `Received no path.`);
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
