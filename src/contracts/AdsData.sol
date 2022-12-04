pragma solidity ^0.5.0;

contract AdsData {
    string public name;
    uint public packageCount = 0;
    mapping(uint => Packages) public packages;

    uint public userCount = 0;
    mapping(string => AdCompany) public adcompanyusers;
    mapping(uint => AdCompany) public users;

    uint public purchaseCount = 0;
    mapping(uint => Packages_Purchase) public packagepurchase;

   uint public alogCount = 0;
    mapping(uint => StoreLog) public storelogs;

    struct Packages {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
        
    }


 struct Packages_Purchase {
        uint id;
        string name;
        uint price;
        uint256  purdate;
        address payable powner;
        bool purchased;
    }
    
struct AdCompany {
        uint id;
        string username;
        string password;
        string email;
        
        address payable owner;
        bool active;
    }
    
struct StoreLog{
        uint id;
        uint packagepurchaseid;
        string ipfsHash; 
        uint256 logdate;
       
        address payable storelogowner;
        bool active;
    }

    event PackageCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

      event UserCreated(
        uint id,
        string username,
        string password,
        string email,
        
        address payable owner,
        bool purchased
    );

event PackagePurchaseCreated(
        uint id,
        string username,
        uint price,
        uint256  purdate,
        address payable powner,
        bool purchased
    );

    event StoreLogCreated(
        uint id,
        uint packagepurchaseid,
        
        string ipfsHash, 
        uint256 logdate,
        address payable storelogowner,
        bool active
    );


    constructor() public {
        name = "Ads Play Log DApp";
    }

    function createPackages(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        packageCount ++;
        // Create the product
        packages[packageCount] = Packages(packageCount, _name, _price, msg.sender, false);
        // Trigger an event
        emit PackageCreated(packageCount, _name, _price, msg.sender, false);
    }

 function createUser(string memory _username,string memory _password,string memory _email) public {
        // Require a valid name
        require(bytes(_username).length > 0);
        require(bytes(_password).length > 0);
        require(bytes(_email).length > 0);
        
        // Increment product count
        userCount ++;
        // Create the product
        adcompanyusers[_email] = AdCompany(userCount, _username, _password,_email, msg.sender, false);
        users[userCount] = AdCompany(userCount, _username, _password,_email, msg.sender, false);
       
        // Trigger an event
        emit UserCreated(userCount, _username, _password,_email, msg.sender, false);
    }


    function purchaseProduct(uint _id,string memory _name, uint _price,uint256 _purchasedate) public payable {
        // Fetch the product
Packages memory _packages = packages[_id];
        //Fetch the owner
        address payable _seller = _packages.owner;
        // Make sure the product has a valid id
        require(_packages.id > 0 && _packages.id <= packageCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _packages.price);
        // Require that the product has not been purchased already
       // require(!_packages.purchased);
        // Require that the buyer is not the seller
        //require(_seller != msg.sender);
        // Transfer ownership to the buyer
       // _packages.owner = msg.sender;
        // Mark as purchased
        //_packages.purchased = true;
        // Update the product
        //packages[_id] = _package;
        // Pay the seller by sending them Ether
        
        address(_seller).transfer(msg.value);
         
        purchaseCount ++;
         packagepurchase[purchaseCount] = Packages_Purchase(purchaseCount, _name, _price,_purchasedate, msg.sender, false);
       

       emit PackagePurchaseCreated(purchaseCount, _name, _price,_purchasedate ,msg.sender, true);
    }

function createLog(uint _purchaseid,string memory _hash, uint256 _logdate) public {
       
        
        alogCount ++;
        // Create the log
        storelogs[alogCount] = StoreLog(alogCount, _purchaseid, _hash,_logdate, msg.sender, false);
    
       
        // Trigger an event
        emit StoreLogCreated(logCount, _purchaseid, _hash,_logdate, msg.sender, false);
    }

    
}
