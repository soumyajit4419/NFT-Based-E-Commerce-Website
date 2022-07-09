var express = require("express");
var router = express.Router();
const UserController = require("../controllers/User");

router.post("/get_collectibles", UserController.getCollectibles);

router.post("/check_user", UserController.checkUser);

router.post("/create", UserController.saveUser);

router.post("/get_user_details", UserController.getUserDetails);
// router.post("/create_user", UserController.saveUser);

router.post("/create_new_collectible", UserController.createCollectibles);

router.get("/get_more_users", UserController.getMoreUsers);

router.post("/update_collectible_history", UserController.updateCollectible);

router.post("/start_collectible_sale", UserController.startCollectibleSale);

router.post("/add_token_info", UserController.addTokenInfo);

// router.post("/update_many", UserController.updateMany);

router.post("/update_user_info", UserController.updateUserInfo);

router.post("/stop_collectible_sale", UserController.stopCollectibleSale);
router.post("/stop_nft_sale", UserController.stopNftSale);

router.post("/start_nft_sale", UserController.startNftSale);

router.post("/add_token_info_multiple", UserController.addCollectibleInfo);

router.get("/get_collectibles", UserController.getCollectibles);

router.post("/update_nft_history", UserController.updateNftDetails);

router.post("/update_profile_image", UserController.updateProfileImage);

router.post("/get_token_info", UserController.getTokenInfo);

router.post("/start_auction", UserController.startAuciton);

router.post("/get_collectible_info", UserController.getCollectibleInfo);

router.post("/put_on_sale", UserController.putOnSale);

router.post("/get_auction_details", UserController.getAuctionInfo);

router.post("/create_auction", UserController.createAuction);

router.post("/create_bid", UserController.createBid);

router.get("/top_nft", UserController.topNft);

router.get("/top_users", UserController.getTopUsers);

router.post("/search_key_word", UserController.getSearch);

router.get("/get_more_nfts", UserController.getMoreNft);
router.get("/get_more_auction", UserController.getMoreAuction);

router.get("/get_more_collectibles", UserController.getMoreCollectibles);

router.post("/bid_withdraw", UserController.bidWithdraw);

router.post("/send_email", UserController.sendEmail);

router.get("/get_activities", UserController.getActivities);

router.get("/top_auction");
router.get("/top_sale");

router.post("/get_top_playlist");

router.post("/get_top_music");

router.post("/get_top_art");

router.post("/get_live_auction");

router.post("/");

module.exports = router;
