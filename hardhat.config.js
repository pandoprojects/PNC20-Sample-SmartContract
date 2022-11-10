/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-etherscan");
 const path = require('path')
 require('dotenv').config({ path: path.join(__dirname, '/.env') })
 // url for pando eth rpc url http://localhost:16888'
 module.exports = {
   networks:{
     hardhat:{
 
     },
     pando_privatenet: {
      url: `http://localhost:18888/rpc`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 361,
      gasPrice: 4000000000000
    },
     rinkeby:{
       url:"https://eth-rinkeby.alchemyapi.io/v2/g_eW4eELnEgyahDENxbLUeXfwn0CMaUL",
       accounts:[process.env.PRIVATE_KEY]
     }
   },
   etherscan: {
     apiKey: {
       rinkeby: '7AP687JM9SG11VUBPP1CZCEX5IQFZW4ASA'
     },
    },
   solidity: {
     version:"0.8.11",
     settings: {
       optimizer: {
         enabled: true,
         runs: 200,
       },
     },
   },
 };
 