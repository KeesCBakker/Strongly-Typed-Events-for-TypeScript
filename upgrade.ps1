echo ""
echo "Upgrading NCU:"
npm install -g npm-check-updates
npm audit fix

cd packages

echo ""
echo "Upgrading ste-core:"
cd ste-core
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading ste-events:"
cd ste-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading ste-signals:"
cd ste-signals
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading ste-simple-events:"
cd ste-simple-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading strongly-typed-Events:"
cd strongly-typed-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading ste-browser:"
cd ste-browser
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading root:"
cd ..
ncu -u
npm install
npm audit fix

echo ""
echo "Building & testing:"
npm run build
npm test

git add .
git commit -m "Packages upgrade"
git push

echo ""
echo "Ready!"