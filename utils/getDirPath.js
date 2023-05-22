import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export const getDirPath = (curPath, url = '') => {
  const dirName = fileURLToPath(curPath);
  return join(dirname(dirName), url);
};
