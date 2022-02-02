import { ethers } from "ethers";

import {
  bellyChanceBid,
  bellyErc20,
  bellyErc721,
  bellyLoot,
} from "./contracts/addresses";

const bellyERC721abi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_tokenIds","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allBellyCharacters","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyCharacterERC721.CharacterClass","name":"characterClass","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bellyCharactersForSale","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyCharacterERC721.CharacterClass","name":"characterClass","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_buyer","type":"address"},{"internalType":"contract ERC20","name":"bellyToken","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"collectionName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collectionNameSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getItemsForSale","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyCharacterERC721.CharacterClass","name":"characterClass","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"internalType":"struct BellyCharacterERC721.BellyCharacter[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyTokens","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyCharacterERC721.CharacterClass","name":"characterClass","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"internalType":"struct BellyCharacterERC721.BellyCharacter[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfTokensForSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getTokenExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getTokenMetaData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getTokenOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getTotalNumberOfTokensOwnedByAnAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"itemsForSale","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum BellyCharacterERC721.CharacterClass","name":"_characterClass","type":"uint8"},{"internalType":"contract IERC20","name":"bellyToken","type":"address"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"mintBellyCharacter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"initialPrice","type":"uint256"}],"name":"toggleForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenNameExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
);

const bellyErc20Abi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_tokenIds","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allCryptoCards","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyERC721.CardType","name":"cardType","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_buyer","type":"address"},{"internalType":"contract ERC20","name":"bellyToken","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"collectionName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collectionNameSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cryptoCardsForSale","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyERC721.CardType","name":"cardType","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getItemsForSale","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyERC721.CardType","name":"cardType","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"internalType":"struct BellyERC721.CryptoCard[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyTokens","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"enum BellyERC721.CardType","name":"cardType","type":"uint8"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"address payable","name":"mintedBy","type":"address"},{"internalType":"address","name":"currentOwner","type":"address"},{"internalType":"address","name":"previousOwner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"numberOfTransfers","type":"uint256"},{"internalType":"bool","name":"forSale","type":"bool"}],"internalType":"struct BellyERC721.CryptoCard[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfTokensForSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getTokenExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getTokenMetaData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getTokenOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getTotalNumberOfTokensOwnedByAnAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"itemsForSale","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum BellyERC721.CardType","name":"_cardType","type":"uint8"},{"internalType":"contract IERC20","name":"bellyToken","type":"address"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"uint256","name":"initialPrice","type":"uint256"}],"name":"mintCryptoCard","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"toggleForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenNameExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
);

const bellyDropsAbi = JSON.parse(
  '[{"inputs":[{"internalType":"address","name":"_dropsOwner","type":"address"},{"internalType":"address","name":"_vrfCoordinator","type":"address"},{"internalType":"address","name":"_linkToken","type":"address"},{"internalType":"address","name":"_bellyERC721","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"bytes32","name":"_keyHash","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"CrateOpened","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"bellyERC721","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dropsOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keyHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ERC20","name":"_bellyToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"openCrate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"rawFulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
);

const bellyChanceBidAbi = JSON.parse(
  '[{"inputs":[{"internalType":"address","name":"_vrfCoordinator","type":"address"},{"internalType":"address","name":"_linkToken","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"bytes32","name":"_keyHash","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"components":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address payable","name":"creator","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"totalValue","type":"uint256"},{"internalType":"uint256","name":"valueAcumulated","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"indexed":false,"internalType":"struct BellyChanceBid.ChanceBidItem","name":"","type":"tuple"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"player","type":"address"}],"indexed":false,"internalType":"struct BellyChanceBid.BidFor[]","name":"","type":"tuple[]"}],"name":"ChanceBidCompleted","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allChanceBids","outputs":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address payable","name":"creator","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"totalValue","type":"uint256"},{"internalType":"uint256","name":"valueAcumulated","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"bidsForItems","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"player","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"chanceBidsCompleted","outputs":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"winner","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"totalPrice","type":"uint256"},{"internalType":"uint256","name":"forAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalAmount","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"createChanceBid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"debugProbs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enterChanceBid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"finishHolders","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"player","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"itemId","type":"uint256"}],"name":"getBidsForItem","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"player","type":"address"}],"internalType":"struct BellyChanceBid.BidFor[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompletedChanceBids","outputs":[{"components":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"winner","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"totalPrice","type":"uint256"},{"internalType":"uint256","name":"forAmount","type":"uint256"}],"internalType":"struct BellyChanceBid.ChanceBidItemCompleted[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"itemsCount","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keyHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"rawFulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemId","type":"uint256"},{"internalType":"string","name":"_tokenUri","type":"string"},{"internalType":"address","name":"_winner","type":"address"},{"internalType":"uint256","name":"_total","type":"uint256"},{"internalType":"uint256","name":"_paidFor","type":"uint256"}],"name":"saveCompletedItem","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
);

export const initialState = {
  provider: {},
  bellyERC721Contract: {},
  bellyERC20Contract: {},
  bellyDropsContract: {},
  bellyChanceBidContract: {},
  signer: {},
  web3Modal: {},
  myItems: [],
  marketItems: [],
  wallet: "",
  balance: 0,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_MARKET_ITEMS: "SET_MARKET_ITEMS",
  SET_WALLET: "SET_WALLET",
  SET_BALANCE: "SET_BALANCE",
  SET_MY_ITEMS: "SET_MY_ITEMS",
};

const getContract = (type, signer) => {
  switch (type) {
    case "ERC20":
      return new ethers.Contract(bellyErc20, bellyErc20Abi, signer);
    case "ERC721":
      return new ethers.Contract(bellyErc721, bellyERC721abi, signer);
    case "LOOT":
      let contract = new ethers.Contract(bellyLoot, bellyDropsAbi, signer);
      return contract;
    case "CHANCE_BID":
      let changeBid = new ethers.Contract(
        bellyChanceBid,
        bellyChanceBidAbi,
        signer
      );
      return changeBid;
    default:
      break;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        authorized: true,
      };
    case actionTypes.SET_MARKET_ITEMS:
      return {
        ...state,
        marketItems: action.marketItems,
      };
    case actionTypes.SET_MY_ITEMS:
      return {
        ...state,
        myItems: action.myItems,
        balance: action.balance,
      };
    case actionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case actionTypes.SET_WALLET:
      return {
        ...state,
        bellyERC721Contract: getContract("ERC721", action.signer),
        bellyERC20Contract: getContract("ERC20", action.signer),
        bellyDropsContract: getContract("LOOT", action.signer),
        bellyChanceBidContract: getContract("CHANCE_BID", action.signer),
        signer: action.signer,
        wallet: action.wallet,
        provider: action.provider,
        web3Modal: action.web3Modal,
      };
    default:
      return state;
  }
};

export default reducer;
