echo "----------------------------"
echo "|     Boot strap Lerna     |"
echo "----------------------------"

yarn lerna bootstrap

echo "----------------------------"
echo "|      Build Packages      |"
echo "----------------------------"

# Build renderer
pushd ./packages/scarlet-renderer
yarn build
popd
# TODO: make this apply to all relevant packages

echo "----------------------------"
echo "|      🎉🎉🎉🎉🎉🎉🎉      |"
echo "|    Appliaction: 🥾 ed     |"
echo "----------------------------"

