const express = require('express');
const router = express.Router();
const Token = require('../controller/tokenController');
const linkValidate = require('../middleware/linkVAlidation');

router.post("/", linkValidate, Token.TokenContractAddress);
router.get("/", linkValidate, Token.readContract);
router.post("/write/", linkValidate, Token.writeContract);
module.exports = router;