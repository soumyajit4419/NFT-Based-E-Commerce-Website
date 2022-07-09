const mongoose = require("mongoose");
const shortid = require("shortid");

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    wallet_address: String,
    blockchain: String,
    profile_image: String,
    profile_name: String,
    bio: String,
    instagram: String,
    facebook: String,
    twitter: String,
    telegram: String,
    email: String,
    ip_address: String,
    transfer_address: String,
    transfer_status: Boolean,
    multiple_transfer: Boolean,
    is_verified: Boolean,
    is_blocked: Boolean,
    collectibles: [
      {
        _id: { type: String, default: shortid.generate },
        name: String,
        token_id: String,
        quantity: String,
        creator: String,
        cover_image: String,
        music: String,
        on_auction: Boolean,
        on_sale: Boolean,
        item_price: String,
        tx_hash: String,
      },
    ],
    ip_list: [
      {
        _id: { type: String, default: shortid.generate },
        ip_address: String,
        geo_location: String,
      },
    ],
    nfts: [
      {
        _id: { type: String, default: shortid.generate },
        token_id: String,
        tx_hash: String,
        creator: String,
        owner: String,
        initial_price: String,
        on_sale: Boolean,
        music: String,
        cover_image: String,
        on_auction: Boolean,
        auction_address: String,
        auction_end_time: String,
        transfer: Boolean,
        owner_image: String,
        creator_image: String,
        name: String,
        royalty: Number,
        music: String,
        description: String,
        date: String,
      },
    ],
    activity: [
      {
        _id: { type: String, default: shortid.generate },
        activity_type: String,
        date: String,
        by: String,
        by_name: String,
        tx_hash: String,
        token_id: String,
        to_address: String,
        from_address: String,
        message: String,
        image: String,
        to: String,
        amount: String,
      },
    ],
    following: [
      {
        _id: { type: String, default: shortid.generate },
        wallet_address: String,
        date: String,
        following_image: String,
      },
    ],
    followers: [
      {
        _id: { type: String, default: shortid.generate },
        wallet_address: String,
        date: String,
        follower_image: String,
      },
    ],
  })
);

module.exports = User;
