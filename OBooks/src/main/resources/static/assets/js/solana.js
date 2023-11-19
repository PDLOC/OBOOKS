
      
      //*========== [CONNECT WALLET] ===========
      let publicKey;

      // Manual connect
      const connectWallet = async () => {
         await window.phantom.solana.connect();

         publicKey = window.phantom.solana.publicKey.toBase58(); //[1,1,1,1]
         console.log(publicKey);
      }

      const SHYFT_API_KEY = "FvtQ-DsN9H3YDIYw";

      const toTransaction = (encodedTransaction) => solanaWeb3.Transaction.from(Uint8Array.from(atob(encodedTransaction), c => c.charCodeAt(0)));

      //=========== [TRANSFER SOLANA] ==========
      const transferSol = async () => {
         var myHeaders = new Headers();
         myHeaders.append("x-api-key", SHYFT_API_KEY);
         myHeaders.append("Content-Type", "application/json");

         var raw = JSON.stringify({
         "network": "devnet",
         "from_address": "BZBVGqPj1dVPenWsHZQNmq3hXb2MeLn2HqiYEd3QXqXf", //Nguoi gui
         "to_address": "2YwqccssDUBJ1mUgNKK4mT3r5iAHwSx7tdL6e7pcTVED", //Nguoi nhan
         "amount": 0.0001,
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
      
      
      
      
   
