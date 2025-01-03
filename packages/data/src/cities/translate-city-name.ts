import path from 'path';
import fs from 'fs';

import cities from './saudi-arabia.json';

const filePath = path.join(
  __dirname,
  `../../../../../../packages/shared/src/lib/data/cities/saudi.json`
);

fs.writeFile(filePath, JSON.stringify(cities, null, 2), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`File saved at: ${filePath}`);
});
