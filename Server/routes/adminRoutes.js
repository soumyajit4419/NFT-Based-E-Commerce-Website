var express = require("express");
var router = express.Router();
const adminController = require("../controllers/Admin");
var useragent = require('express-useragent');
router.use(useragent.express());

router.post("/adminCreate", adminController.adminCreate);

router.post("/admin_login", adminController.adminLogin);

router.get("/check_admin", adminController.checkAdmin);

router.post("/change_user_status", adminController.changeStatus);

router.get("/get_all_users_data", adminController.getAllUsers);

router.get("/get_all_nfts", adminController.getAllNfts);

router.get("/get_all_collectibles", adminController.getAllCollectibles);

router.post("/change_verify", adminController.changeVerify);

router.delete("/delete_nft", adminController.deleteNft);
router.delete("/delete_collectible", adminController.deleteCollectible);

router.post("/change_block", adminController.changeBlock);

router.get("/get_all_auctions", adminController.getAllAuctions);

router.post("/get_ip_info", adminController.getIpInfo);

router.post("/update_social_info", adminController.uploadSocialInfo);

router.post("/block_ip_address", adminController.blockIp);

router.get("/all_activities", adminController.getAllActivities);

router.get("/get_admin", adminController.getAdminDetail);

router.post("/admin_updateTFA", adminController.updateTFA);

router.post("/admin_tfa_login", adminController.tfaLogin);

router.get("/get_admin_activity", adminController.getAdminactivity);

router.get("/getblockedip", adminController.getBlockIp);

router.post("/deleteblockedip", adminController.deleteBlockIp);

router.post("/insertblockedip", adminController.createBlockIp);

module.exports = router;
