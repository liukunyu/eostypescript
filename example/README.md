##### 编译合约
```
1.
cd到gxctypescript/example目录下
cd /Users/sky/code/gxctypescript/example
2.
./scripts/02-compile.sh
3.将当前目录下的helloworld目录拷贝到gxchain安装目录下
cp -r helloworld ~/gxb_install
4.删除helloworld/helloworld.wast文件中的abort相关的代码(包括调用的地方)
5.编译wast到wasm
./bin/wat2wasm helloworld/helloworld.wast -o helloworld/helloworld.wasm

```

##### 部署合约
```
deploy_contract h11 nathan 0 0 /Users/sky/gxb_install/helloworld GXC true
```

##### 调用合约
```
call_contract nathan h11 null create "{\"user\":\"1\",\"\game\":\"2\", \"num_rows\":3,\"num_cols\":4,\"seed\":5}" GXC true
```

