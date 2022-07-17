const Web3 = require("web3");
const Contract = require("./../contractAbi");

const web3 = new Web3();

exports.nft = async (req, res) => {
  const networkId = await web3.eth.net.getId();
  const account = web3.eth.accounts.wallet.add(
    process.env.ADMIN_WALLET_PRIVATE_KEY
  );

  const myContract = new web3.eth.Contract(
    Contract.contractAbi,
    "0x9278E1E006b82b35f6480090257D4C81F5aEa694"
  );

  console.log(account);
  let numTokens;
  //   try {
  //     numTokens = await connectedContract.balanceOf(
  //       "0xA776F1523Eb7aEd1ad202Bb924b03A8275B4D4fc"
  //     );
  //     const allNft = await connectedContract.getNftOfUser(
  //       "0xA776F1523Eb7aEd1ad202Bb924b03A8275B4D4fc"
  //     );

  //     const tokenDetaisl = await connectedContract.getProductInfo(1);

  //     console.log(
  //       // web3.utils.hexToNumberString(numTokens),
  //       // allNft,
  //       new Date(
  //         web3.utils.hexToNumberString(tokenDetaisl.ProductExpiryDate) * 1000
  //       ),
  //       "sdsd"
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
};
