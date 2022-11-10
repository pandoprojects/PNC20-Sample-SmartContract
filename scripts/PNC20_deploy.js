const { ethers } = require("hardhat");
async function main() {

    const PNC20Contract = await ethers.getContractFactory("PNC20");
    const pnc20Contract = await PNC20Contract.deploy(
        "PandoToken", "PNC20");
    await pnc20Contract.deployed();
    console.log("PNC20Contract contract Address", pnc20Contract.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
    // FixedCategoryContract contract Address 0xA777155c73A32322384E9705bBb9cf779F47b95b