echo "Upgrading NCU:"
npm install -g npm-check-updates

cd packages

echo "Upgrading ste-core:"
cd ste-core
ncu -u
npm install
cd ..

echo "Upgrading ste-events:"
cd ste-events
ncu -u
npm install
cd ..

echo "Upgrading ste-signals:"
cd ste-signals
ncu -u
npm install
cd ..

echo "Upgrading ste-simple-events:"
cd ste-simple-events
ncu -u
npm install
cd ..

echo "Upgrading strongly-typed-Events:"
cd strongly-typed-events
ncu -u
npm install
cd ..

echo "Upgrading ste-browser:"
cd ste-browser
ncu -u
npm install
cd ..

echo "Upgrading root:"
cd ..
ncu -u
npm install

echo "Building & testing:"
npm run build
npm test

git add .
git commit -m "Packages upgrade"

echo "Ready!"