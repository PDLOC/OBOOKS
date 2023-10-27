
      
      //*========== [CONNECT WALLET] ===========
      let publicKey;

      //1: Auto connect
      (async () => {
         await window.phantom.solana.connect();
         publicKey = window.phantom.solana.publicKey.toBase58(); //[1,1,1,1]
         console.log(publicKey);
      })();


      //2: Manual connect
      const connectWallet = async () => {
         await window.phantom.solana.connect();

         publicKey = window.phantom.solana.publicKey.toBase58(); //[1,1,1,1]
         console.log(publicKey);
      }

      //========== [MINT NFT PUBLIC KEY] ==========
      const SHYFT_API_KEY = "FvtQ-DsN9H3YDIYw";

      const toTransaction = (encodedTransaction) => solanaWeb3.Transaction.from(Uint8Array.from(atob(encodedTransaction), c => c.charCodeAt(0)));

      //https://api.shyft.to/sol/v1
      const mintNft = async () => {
         var myHeaders = new Headers();
         myHeaders.append("x-api-key", SHYFT_API_KEY);

         const fileInput = document.querySelector("#fileInput");

         var formdata = new FormData();
         formdata.append("network", "devnet");
         formdata.append("wallet", publicKey);
         formdata.append("name", "FPOLY NFT");
         formdata.append("symbol", "FPL");
         formdata.append("description", "FPL Token makes Web3 so easy!");
         formdata.append("attributes", '[{"trait_type":"dev power","value":"over 900"}]');
         formdata.append("external_url", "https://shyft.to");
         formdata.append("max_supply", "1");
         formdata.append("royalty", "5");
         formdata.append("file", fileInput.files[0]);
         formdata.append("data", fileInput.files[0]);
         formdata.append("receiver", publicKey);
         formdata.append('service_charge', `{ "receiver": "7TfMNSZ2UHznQBmKF3QJG7VpiF4kKR6Pc9UaFQVfy5zs",  "amount": 0.01}`);

         var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
         };

         fetch("https://api.shyft.to/sol/v1/nft/create_detach", requestOptions)
         .then(async response => {
            let res = await response.json();
            let transaction = toTransaction(res.result.encoded_transaction);

            const signedTransaction = await window.phantom.solana.signTransaction(transaction);
            const connection = new solanaWeb3.Connection("https://api.devnet.solana.com");
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());

            console.log("TRANSACTION CONFIRMED!!!");
         })
         .catch(error => console.log('error', error));
      }

      //MINT PRIV KEY
      const PRIV_KEY_WALLET = "4XMJ5M6wopsvVmBMC8jpShcVETUAAbF2aVKy4ZtqxXDmHUgDcywGhy817vVN2dwJqU6crhWpsoHVtcFAAPRtkGNc";
      const mintNftPriv = async () => {
         var myHeaders = new Headers();
         myHeaders.append("x-api-key", SHYFT_API_KEY);

         const fileInput = document.querySelector("#fileInput");

         var formdata = new FormData();
         formdata.append("network", "devnet");
         formdata.append("private_key", PRIV_KEY_WALLET);
         formdata.append("name", "FPOLY NFT");
         formdata.append("symbol", "FPL");
         formdata.append("description", "FPL Token makes Web3 so easy!");
         formdata.append("attributes", '[{"trait_type":"dev power","value":"over 900"}]');
         formdata.append("external_url", "https://shyft.to");
         formdata.append("max_supply", "1");
         formdata.append("royalty", "5");
         formdata.append("file", fileInput.files[0]);
         formdata.append("data", fileInput.files[0]);
         formdata.append("receiver", publicKey);
         formdata.append('service_charge', `{ "receiver": "7TfMNSZ2UHznQBmKF3QJG7VpiF4kKR6Pc9UaFQVfy5zs",  "amount": 0.01}`);

         var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
         };

         fetch("https://api.shyft.to/sol/v1/nft/create", requestOptions)
         .then(async response => {
            console.log("TRANSACTION CONFIRMED!!!");
         })
         .catch(error => console.log('error', error));
      }

      //=========== [TRANSFER SOLANA] ==========
      const transferSol = async () => {
         var myHeaders = new Headers();
         myHeaders.append("x-api-key", SHYFT_API_KEY);
         myHeaders.append("Content-Type", "application/json");

         var raw = JSON.stringify({
         "network": "devnet",
         "from_address": "6JsGtLmCMMTwceJwvK6E8u6BS6o3tF6jGCZYavoJnPAL", //Nguoi gui
         "to_address": "377vDNEfgVVteu9mGLGU8affwjQucu31Es5UrnUPcutX", //Nguoi nhan
         "amount": 0.1,
         });

         var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
         };

         fetch("https://api.shyft.to/sol/v1/wallet/send_sol", requestOptions)
         .then(async response => {
            let res = await response.json();
            let transaction = toTransaction(res.result.encoded_transaction);

            const signedTransaction = await window.phantom.solana.signTransaction(transaction);
            const connection = new solanaWeb3.Connection("https://api.devnet.solana.com");
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());

            console.log("TRANSFER SUCCESSFULLY!!!");
         })
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
      }
