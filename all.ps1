cd packages

echo ""
echo "Upgrading and auditing ste-core:"
cd ste-core
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing ste-events:"
cd ste-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing ste-signals:"
cd ste-signals
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing ste-simple-events:"
cd ste-simple-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing strongly-typed-Events:"
cd strongly-typed-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing ste-browser:"
cd ste-browser
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing ste-promise-events:"
cd ste-promise-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing ste-promise-signals:"
cd ste-promise-signals
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing ste-promise-simple-events:"
cd ste-promise-simple-events
ncu -u
npm install
npm audit fix
cd ..

echo ""
echo "Upgrading and auditing root:"
cd ..
ncu -u
npm install
npm audit fix

echo ""
echo "Building & testing:"

ncu -u
npm install
npm run build
npm test

git add .
git commit -m "Audit fixes & upgrades"
git push

echo ""
echo "Publish"
npm run make

echo ""
echo "Ready!"