// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ItemNFT_V1 is ERC721Enumerable, Ownable {
    uint256 public tokenId;
    address public AdminAddress;
    mapping(address => bool) public whitelistedAddresses;
    mapping(uint256 => Warranty) TokenWarranty;
    mapping(uint256 => Product) TokenProduct;
    mapping(address => uint256[]) TokenUser;

    struct Product {
        string ProductId;
        string ProductName;
        string Category;
        string ProductSerialNumber;
        uint256 ProductPurchaseDate;
        uint256 ProductExpiryDate;
        uint256 ProductwarrantyDuration;
        uint256 ProductPrice;
        address ProductOwnerAddress;
    }

    struct Warranty {
        uint256 ProductPurchaseDate;
        string ProductSerialNumber;
        uint256 ProductExpiryDate;
    }

    struct NFTDetails {
        uint256 tokenId;
        Warranty warrentyDetails;
    }

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        AdminAddress = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == AdminAddress, "Not Authorized");
        _;
    }

    modifier onlyWhitelisted() {
        require(whitelistedAddresses[msg.sender], "Not Authorized ");
        _;
    }

    function mint(
        string memory _productId,
        string memory _productName,
        string memory _category,
        uint256 _productWarrantyDuration,
        uint256 _productPrice,
        address _ownerAddress,
        string memory _productSerialNumber
    ) public onlyWhitelisted {
        require(_ownerAddress == address(_ownerAddress), "Invalid address");

        tokenId = tokenId + 1;

        Product memory ProductInfo = Product({
            ProductId: _productId,
            ProductName: _productName,
            ProductSerialNumber: _productSerialNumber,
            Category: _category,
            ProductwarrantyDuration: _productWarrantyDuration * 1 days,
            ProductPurchaseDate: block.timestamp,
            ProductExpiryDate: block.timestamp +
                _productWarrantyDuration *
                1 days,
            ProductPrice: _productPrice,
            ProductOwnerAddress: _ownerAddress
        });

        Warranty memory ProductWarranty = Warranty({
            ProductPurchaseDate: block.timestamp,
            ProductExpiryDate: block.timestamp +
                _productWarrantyDuration *
                1 days,
            ProductSerialNumber: _productSerialNumber
        });

        TokenProduct[tokenId] = ProductInfo;

        TokenWarranty[tokenId] = ProductWarranty;

        TokenUser[_ownerAddress].push(tokenId);

        _safeMint(_ownerAddress, tokenId);
    }

    function getProductInfo(uint256 _tokenId)
        public
        view
        returns (Product memory)
    {
        require(_tokenId <= tokenId, "Invalid Token Id");
        Product memory p = TokenProduct[_tokenId];
        return p;
    }

    function getWarrentyInfo(uint256 _tokenId)
        public
        view
        returns (Warranty memory)
    {
        require(_tokenId <= tokenId, "Invalid Token Id");
        Warranty memory w = TokenWarranty[_tokenId];
        return w;
    }

    function isInWarrenty(uint256 _tokenId) public view returns (bool) {
        require(_tokenId <= tokenId, "Invalid Token Id");
        Warranty memory w = TokenWarranty[_tokenId];
        return block.timestamp <= w.ProductExpiryDate;
    }

    function getNftTokenIdOfUser(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return TokenUser[_address];
    }

    function getNftOfUser(address _address)
        public
        view
        returns (NFTDetails[] memory)
    {
        uint256[] memory allTokens = TokenUser[_address];
        NFTDetails[] memory _allNFTDetailsOfUser = new NFTDetails[](
            allTokens.length
        );
        for (uint8 i = 0; i < allTokens.length; i++) {
            Warranty memory w = getWarrentyInfo(allTokens[i]);
            _allNFTDetailsOfUser[i] = NFTDetails({
                tokenId: allTokens[i],
                warrentyDetails: w
            });
        }

        return _allNFTDetailsOfUser;
    }

    function whilelistAddress(address _address) public onlyAdmin {
        require(!whitelistedAddresses[_address], "Already whitelisted");
        whitelistedAddresses[_address] = true;
    }
}
