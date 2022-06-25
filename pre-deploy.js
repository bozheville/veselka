const fs = require('fs');

const appVersion = JSON.parse(fs.readFileSync('./package.json')).version;
const time = Date.now();

fs.writeFileSync('./.env.local',
`NEXT_PUBLIC_RELEASE_DATE=${time}
NEXT_PUBLIC_RELEASE_VERSION=${appVersion}
`);
