echo ""
echo "Upgrading NCU:"
npm install -g npm-check-updates

cd packages

echo ""
echo "Upgrading ste-core:"
cd ste-core
ncu -u
cd ..

echo ""
echo "Upgrading ste-events:"
cd ste-events
ncu -u
cd ..

echo ""
echo "Upgrading ste-signals:"
cd ste-signals
ncu -u
cd ..

echo ""
echo "Upgrading ste-simple-events:"
cd ste-simple-events
ncu -u
cd ..

echo ""
echo "Upgrading strongly-typed-Events:"
cd strongly-typed-events
ncu -u
cd ..

echo ""
echo "Upgrading ste-browser:"
cd ste-browser
ncu -u
cd ..

echo ""
echo "Upgrading ste-promise-events:"
cd ste-promise-events
ncu -u
cd ..

echo ""
echo "Upgrading ste-promise-signals:"
cd ste-promise-signals
ncu -u
cd ..

echo ""
echo "Upgrading ste-promise-simple-events:"
cd ste-promise-simple-events
ncu -u
cd ..

echo ""
echo "Upgrading root:"
cd ..
ncu -u

echo ""
echo "Building & testing:"

npm install
npm run build
npm test

git add .
git commit -m "Packages upgrade"
git push

echo ""
echo "Ready!"