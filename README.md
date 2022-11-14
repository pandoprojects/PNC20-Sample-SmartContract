# Detail about PNC20
1. PNC20 is a fungible token deployed on pandochain which is compatible with ethereum.
2. It has all features and functioanlity that a standard ERC-20 token contains. 

## Prerequisites for running smart contract 
1. Firstly set-up and run [Pando-Network-Protocal](https://github.com/pandoprojects/pando-network-protocol) locally.
2. And then, run [Pando-eth-rpc-library](https://github.com/pandoprojects/Pando-eth-rpc-libary) locally.

## How to launch the project on your local system

1. Install editor, node js, npm and create an account on pandochain.
2. Take a clone of this project by running below command-

```
git clone https://github.com/pandoprojects/PNC20-Sample-SmartContract.git

```

3. Install all the project dependencies by running below command-

```
npm install

```
    
4. Now create a file,named .env and update the file with below variables declaration-

```
    PORT=(Your server listening port)
    PRIVATE_KEY=(your wallet private key)S
    rpcURL=(your adaptor chain http url)
```

5. Now we are ready to start the server by running below command-

```
    node server.js
```    

## How to deploy the smart contract
1. By hitting apis on this url [http://localhost:5000/api/token](http://localhost:5000/api/token) with required parameters and routes,
   
   PNC20 API references: [link here](https://chainapi.pandoproject.org/#3264a320-4fb3-4fac-bcfd-840ce07f48e7)
   
2. By running deployment script using with network flag below command-

```
    npx hardhat run script/PNC20_deploy.js --network=pando_privatenet
```
3. You can also deploy it by using remix ide and changing the environment to Injected Provider Metamask.

## How to test the apis and smart contract

1. By hiting apis on this url [http://localhost:5000/api/token](http://localhost:5000/api/token) with required parameters and routes on post man or as an third party apis.
2. If you want to test smart contract functionality individually then you can write unit test cases using hardhat or truffle.


## API References

PNC20 API references: [link here](https://chainapi.pandoproject.org/#3264a320-4fb3-4fac-bcfd-840ce07f48e7)


For more detai please refer our official documents [Click here](https://docs.pandoproject.org/pandoproject/smart-contracts)

## License

The PNC20 protocol reference implementation is licensed under the [GNU License](https://github.com/pandoprojects/PNC20-Sample-SmartContract/blob/main/LICENSE)


