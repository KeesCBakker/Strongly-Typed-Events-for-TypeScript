echo ""
echo "Pulling the latest:"
git pull

cd packages

echo ""
echo "Upgrading ste-core:"
cd ste-core
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading ste-events:"
cd ste-events
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading ste-signals:"
cd ste-signals
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading ste-simple-events:"
cd ste-simple-events
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading strongly-typed-Events:"
cd strongly-typed-events
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading ste-browser:"
cd ste-browser
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading ste-promise-events:"
cd ste-promise-events
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading ste-promise-signals:"
cd ste-promise-signals
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading ste-promise-simple-events:"
cd ste-promise-simple-events
npx npm-check-updates -u
cd ..

echo ""
echo "Upgrading root:"
cd ..
npx npm-check-updates -u

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