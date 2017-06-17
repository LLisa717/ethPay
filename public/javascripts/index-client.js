var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8454"));


var coinbase = web3.eth.coinbase;
console.log(coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));


// solidity code code
var source = "" +
"contract test {\n" +
"   function multiply(uint a) constant returns(uint d) {\n" +
"       return a * 7;\n" +
"   }\n" +
"}\n";

var compiled = web3.eth.compile.solidity(source);
var code = compiled.code;
// contract json abi, this is autogenerated using solc CLI
var abi = compiled.info.abiDefinition;

var myContract;

function createExampleContract() {
    // hide create button
    document.getElementById('create').style.visibility = 'hidden';
    document.getElementById('code').innerText = code;

    // let's assume that coinbase is our account
    web3.eth.defaultAccount = web3.eth.coinbase;

    // create contract
    document.getElementById('status').innerText = "transaction sent, waiting for confirmation";
    web3.eth.contract(abi).new({data: code}, function (err, contract) {
        if(err) {
            console.error(err);
            return;

        // callback fires twice, we only want the second call when the contract is deployed
        } else if(contract.address){

            myContract = contract;
            console.log('address: ' + myContract.address);
            document.getElementById('status').innerText = 'Mined!';
            document.getElementById('call').style.visibility = 'visible';
        }
    });
}

function callExampleContract() {
    // this should be generated by ethereum
    var param = parseInt(document.getElementById('value').value);

    // call the contract
    var res = myContract.multiply(param);
    document.getElementById('result').innerText = res.toString(10);
}
