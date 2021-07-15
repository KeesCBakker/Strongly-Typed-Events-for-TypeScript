cd packages

echo ""
echo "Auditing ste-core:"
cd ste-core
npm install
npm audit fix
cd ..

echo ""
echo "Auditing ste-events:"
cd ste-events
npm install
npm audit fix
cd ..

echo ""
echo "Auditing ste-signals:"
cd ste-signals
npm install
npm audit fix
cd ..

echo ""
echo "Auditing ste-simple-events:"
cd ste-simple-events
npm install
npm audit fix
cd ..

echo ""
echo "Auditing strongly-typed-Events:"
cd strongly-typed-events
npm install
npm audit fix
cd ..

echo ""
echo "Auditing ste-browser:"
cd ste-browser
npm install
npm audit fix
cd ..

echo ""
echo "Auditing ste-promise-events:"
cd ste-promise-events
npm install
npm audit fix
cd ..

echo ""
echo "Auditing ste-promise-signals:"
cd ste-promise-signals
npm install
npm audit fix
cd ..

echo ""
echo "Auditing ste-promise-simple-events:"
cd ste-promise-simple-events
npm install
npm audit fix
cd ..

echo ""
echo "Auditing root:"
cd ..
npm install
npm audit fix

echo ""
echo "Building & testing:"

npm install
npm run build
npm test

git add .
git commit -m "Audit fixes"
git push

echo ""
echo "Ready!"