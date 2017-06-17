

# Installing dependencies
npm version I am running on my local is 3.8.9
node version I am running on my local is v7.4.0

Run `npm install` to install all the dependencies. 


# Runing Geth app
`geth --testnet --rpc --rpcaddr "0.0.0.0" --rpcport 8545 --rpccorsdomain "*" --datadir ~/.ethereum-testnet console`

# Running the app
`npm start`

# Enable watchman
start the application with nodemon will automatically listen to all client-side changes without restarting the app.
```
nodemon
```

# Troubleshooting
This app is assuming you are running your geth app locally at 'http://localhost:8545'. If you are running Geth on other ports, you will need to set 'Access-Control-Allow-Origin' header yourself in app.js.

If you get 'couldn't connect to node XXXX' error in the console, the cause is very likely the params you use to run your geth app. Make sure to add '--rpccorsdomain "*" in the params. A complete list of params are listed here: https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options

If you get an error saying the account is locked, you will need to pre-auth your eth account which you plan to send money from. Include param `--unlock {your eth addr to send money from}` when starting your geth app.
