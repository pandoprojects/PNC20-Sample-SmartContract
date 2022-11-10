
const linkCheck = require('link-check');
const logger = require('../services/logger');

// url for pando eth rpc url http://localhost:16888'

const linkValidate = async (req, res, next) => {
    linkCheck('http://localhost:18888/rpc', async(err, result)=> {
        logger.info(`200: ${result.link} is ${result.status}`);
        if (err || result.status === 'dead') {
            let errorMessage = err ? err : result.err
            logger.error(`500: ${errorMessage}`);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
        else {
            linkCheck('http://localhost:16888', async(err, result)=> {
                logger.info(`200: ${result.link} is ${result.status}`);
                if (err || result.status === 'dead') {
                    let errorMessage = err ? err : result.err
                    logger.error(`500: ${errorMessage}`);
                    return res.status(500).json({ Error: "Internal Server Error" });
                }
                next();
            })
        }
    })
}
module.exports = linkValidate
