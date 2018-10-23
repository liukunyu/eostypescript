asc ./src/helloworld.ts -o ./helloworld/helloworld.wast --optimize --validate 
cd ./helloworld/
sed -i.bak 's/,/_/g' helloworld.wast && rm helloworld.wast.bak
