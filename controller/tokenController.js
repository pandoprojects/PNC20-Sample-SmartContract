


// To Use env file Variables
require('dotenv').config();

const Web3 = require("web3");

// Artifact of FixedCategoryContract 
const compileData = require("../artifacts/contracts/PNC20.sol/PNC20.json");

// To print statements on terminal without using console.log
const logger = require('../services/logger');

class Token {
    /**
     * @desc deploy smart contract on pando blockchain
     * @author sakshi garg
     * @param {string} tokenName name of the token
     * @param {string} tokenSymbol symbol of the token
     * @returns {address} contract address
     */

    // url for pando eth rpc url http://localhost:16888'
    async TokenContractAddress(req, res) {
        try {
            const { tokenName, tokenSymbol } = req.body;
            logger.info(`200 : Input has validated successfully`);
            const web3 = await new Web3("http://localhost:18888/rpc")
            logger.info(`200 : Web3 connection with Blockchain has built successfully`);
            const account = await web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);
            logger.info(`200 : Account address : ${account.address}`);
            let abi = compileData.abi;
            let contractBytecode = compileData.bytecode;
            const result = await new web3.eth.Contract(abi).deploy({
                data: contractBytecode,
                arguments: [tokenName, tokenSymbol]
            })
                .send({ gas: "10000000", from: account.address })
            logger.info(`200 : Contract deployed to : ${result.options.address}`);
            res.json({ "contract address ": result.options.address });
        }
        catch (error) {
            logger.error(`500: error: ${error.message} ${error.stack}`);
            res.status(500).json({ Error: "Internal Server Error" });
        }
    }

    /**
     * @desc get smart contract details from pando blockchain
     * @author sakshi garg
     * @param {string} address contract address of smart contract
     * @param {string} owner who has deploy the smart contract or has owner of particular supply of token 
     * @param {string} spender who has right to use that token on behalf of owner of that token
     * @param {string} methodName name of the function present on that smart contract
     * @returns {number, string, boolean} return particular type of data
     */
    async readContract(req, res) {
        try {
            const { address, methodName, owner, spender } = req.query;
            const web3 = await new Web3("http://localhost:18888/rpc")
            logger.info(`200 : Web3 connection with Blockchain has built successfully`);
            const account = await web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);
            logger.info(`200 : Account address : ${account.address}`);
            let abi = compileData.abi;
            const contract = await new web3.eth.Contract(abi, address)
            let result;

            if (methodName === "totalSupply") {
                result = await contract.methods.totalSupply().call();
            }
            else if (methodName === "name") {
                result = await contract.methods.name().call();
            }
            else if (methodName === "owner") {
                result = await contract.methods.owner().call();
            }
            else if (methodName === "decimals") {
                result = await contract.methods.decimals().call();
            }
            else if (methodName === "symbol") {
                result = await contract.methods.symbol().call();
            }
            else if (methodName === "balanceOf" && owner) {
                result = await contract.methods.balanceOf(owner).call();
            }
            else if (methodName === "allowance" && owner && spender) {
                result = await contract.methods.allowance(owner, spender).call();
            }
            if (!result) {
                return res.status(404).send("Method name not found");
            }
            let resultString = `Contract call for ${methodName} and result is `;
            res.json({ resultString, result });
        }
        catch (error) {
            logger.error(`500: error: ${error.message}`);
            res.status(500).json({ Error: "Internal Server Error" });
        }
    }

    /**
     * @desc do transaction for particular function of smart contract on pando blockchain
     * @author sakshi garg
     * @param {string} address contract address of smart contract
     * @param {string} owner who has deploy the smart contract or has owner of particular supply of token 
     * @param {string} spender who has right to use that token on behalf of owner of that token
     * @param {string} methodName name of the function present on that smart contract
     * @param {string} recipientAddr whom address we want to send some token.
     * @param {number} pdropAmountInWei manipulate with token amount
     * @param {number} approval for approve or dis-approve the spender request 
     * @returns {number, string, boolean} return particular type of data
     */
    async writeContract(req, res) {
        try {
            const { recipientAddr, pdropAmountInWei, address, methodName, owner, spender, approval } = req.body
            const web3 = await new Web3("http://localhost:18888/rpc")
            logger.info(`200 : Web3 connection with Blockchain has built successfully`);
            const account = await web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);
            logger.info(`200 : Account address : ${account.address}`);
            let abi = compileData.abi;
            const contract = await new web3.eth.Contract(abi, address)
            let dataFunction;
            if (methodName === "transfer" && recipientAddr && pdropAmountInWei) {
                dataFunction = contract.methods.transfer(recipientAddr, pdropAmountInWei).encodeABI();
            }
            else if (methodName === "unpause") {
                dataFunction = contract.methods.unpause().encodeABI()
            }
            else if (methodName === "pause") {
                dataFunction = contract.methods.pause().encodeABI()
            }
            else if (methodName === "renounceOwnership") {
                dataFunction = contract.methods.renounceOwnership().encodeABI()
            }
            else if (methodName === "transferOwnership" && owner) {
                dataFunction = contract.methods.transferOwnership(owner).encodeABI()
            }
            else if (methodName === "burn" && pdropAmountInWei) {
                dataFunction = contract.methods.burn(pdropAmountInWei).encodeABI()
            }
            else if (methodName === "increaseAllowance" && spender && pdropAmountInWei) {
                dataFunction = contract.methods.increaseAllowance(spender, pdropAmountInWei).encodeABI()
            }
            else if (methodName === "decreaseAllowance" && spender && pdropAmountInWei) {
                dataFunction = contract.methods.decreaseAllowance(spender, pdropAmountInWei).encodeABI()
            }
            else if (methodName === "mint" && recipientAddr && pdropAmountInWei) {
                dataFunction = contract.methods.mint(recipientAddr, pdropAmountInWei).encodeABI()
            }
            else if (methodName === "approve" && spender && approval) {
                dataFunction = contract.methods.approve(spender, approval).encodeABI()
            }
            else if (methodName === "burnFrom" && owner && pdropAmountInWei) {
                dataFunction = contract.methods.burnFrom(owner, pdropAmountInWei).encodeABI()
            }
            else if (methodName === "transferFrom" && owner && recipientAddr && pdropAmountInWei) {
                dataFunction = contract.methods.transferFrom(owner, recipientAddr, pdropAmountInWei).encodeABI()
            }

            if (!dataFunction) {
                return res.status(404).send("Method name not found");
            }
            const count = await web3.eth.getTransactionCount(account.address);

            const createTransaction = await web3.eth.accounts.signTransaction({
                "from": account.address,
                "nonce": web3.utils.toHex(count),
                "gas": web3.utils.toHex(10000000),
                "to": address,
                "data": dataFunction
            },
                process.env.PRIVATE_KEY
            );

            // Deploy transaction
            const createReceipt = await web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            );

            logger.info(`Transaction successful with hash: ${createReceipt.transactionHash}`);
            logger.info(`Transaction details: ${JSON.stringify(createReceipt, null, "  ")}`);
            res.status(200).json({ "Transaction Detail": createReceipt });
        }
        catch (err) {
            logger.error(`500: error: ${err.message}`);
            res.status(500).json({ Error: "Internal Server Error" });
        }
    }
}
module.exports = new Token();