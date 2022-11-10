Detail of Smart Contract
1. The purpose to create fungible smart contract is to tell you that pandochain is compatible with ethereum.

How to launch the project on your local system
1. Install editor, node js, npm and create an account on pandochain
2. Install all the project dependencies by running below command
    npm install
3. Now update the .env file variables 
    PORT=<Your server listening port>
    PRIVATE_KEY=<your wallet private key>
    rpcURL=<your adaptor chain http url>


4. Now we are ready to start the server by running below command
    node server.js

How to test the api and smart contract
1. By hiting this url [http://localhost:5000/api/token] with required parameters and routes on post man or as an third party apis.
2. If you want to test smart contract part then write unit test cases using hardhat or truffle or can check on online ide which is remix ide or hit read and write apis.

How to deploy the smart contract
1. By hitting api
2. By running deploy script using below command
    npx hardhat run script/deploy.js
3. Can deploy by using remix ide and changing the environment to Injected Provider Metamask

##http://localhost:18888/rpc
is url for pando eth rpc url