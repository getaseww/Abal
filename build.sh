
cd "api"

npm run build   

cd "../app"

npm run build

cp -r build "../api/dist"

cd "../api"

mv "dist/build" "dist/public"
cp "package.json" "/dist"


# Zip the file
zip -r '/dist' . -i 'dist.zip'