let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0xba08DDe56fA2E5B5a1Afa8fAdd6a7CE4FA61ef1B";
const sttabi = [{"inputs":[{"internalType":"address","name":"_tokenaddress","type":"address"},{"internalType":"uint256","name":"_tokenvalue","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalvalue","type":"uint256"}],"name":"Sell","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"devtoken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endsale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenprice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalsold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

let sttcontract = new web3.eth.Contract(sttabi, sttaddr);

 
//***************** our smart-contract integration *****************/

const buystt = async () => {
  await loadweb3();
  const chainId = await web3.eth.getChainId();
  if (addr == undefined) {
    Swal.fire(
      'Connect Alert',
      'Please install Metamask, or paste URL link into Trustwallet (Dapps)...',
      'error'
    )
  }
  if (chainId !== 97) { //Change for LIVE
    Swal.fire(
      'Connect Alert',
      'Please Connect on BSC', //Change for LIVE
      'error'
    )
  }

  let ethval = document.getElementById("buyinput").value;
  if (ethval >= 0.001) {
    ethval = (ethval * Math.pow(10, 18));

    sttcontract.methods.buyOnPresale().send({ from: addr, value: ethval }).then(function (error, result) {
      Swal.fire(
        'Success!',
        'Thank you for your purchase!',
        'info'
      )
    }, function (e, processedContract) {
      Swal.fire(
        'Error!',
        'Transaction rejected!',
        'error'
      )
    });
  } 
  else {
    Swal.fire(
      'Buy Alert',
      'Buy as low as 0.001 BNB.',
      'error'
    )
  }
}


const loadweb3 = async () => {
  try {
    web3 = new web3js.myweb3(window.ethereum);
    console.log('Injected web3 detected.')
    sttcontract = new web3.eth.Contract(sttabi, sttaddr);
    let a = await ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);
    return (addr);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      Swal.fire(
        'Connect Alert',
        'Please install Metamask!',
        'error'
      )
    }
  }
};



//***************** adding our token to wallet *****************/

function addToWallet() {
  try {
    web3.currentProvider.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        'type': 'ERC20',
        'options': {
          'address': '0x8b215fd3DFFB11c84C7a2074fbEB38669501e935',
          'symbol': 'Nebula',
          'decimals': '18'
        },
      },
      id: Math.round(Math.random() * 100000)
    }, function (err, data) {
      if (!err) {
        if (data.result) {
          console.log('Token added');
        } else {
          console.log(data);
          console.log('Some error');
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
 
const showAccount = document.querySelector('.showAccount');
const TokenName = document.querySelector('.tokenName');
const TokenDecimal = document.querySelector('.decimaloftoken');
const TokenSymbol = document.querySelector('.symboloftoken');



getAccount();

async function getAccount (){
const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    account = accounts[0];
  
    showAccount.innerHTML = account.substring(0, 4)+ "...." + account.substring(account.length - 4); 
    showAccount.style.color = 'rgb(143 167 255)'

//***************** New Function name  *****************/
 
    const name = await sttcontract.methods.name().call();
    TokenName.innerHTML = name ;
    TokenName.style.color = 'rgb(143 167 255)'
    console.log(name)
   
    // decimal 
    const decimaloftoken = await sttcontract.methods.decimals().call();
    TokenDecimal.innerHTML = decimaloftoken ;
    TokenDecimal.style.color = 'rgb(143 167 255)'
     console.log(decimaloftoken);
    
    // symbol 
    const symboloftoken = await sttcontract.methods.symbol().call()
    TokenSymbol.innerHTML = symboloftoken ;
    TokenSymbol.style.color = 'rgb(143 167 255)'
   console.log(symboloftoken);
 }

contr = "0xc107BE0D881f2C1c3A79d39cE08852Aab91e385E";
document.getElementById("add").innerHTML = contr.substring(0, 5)+ "...." + contr.substring(contr.length - 5);
    add.style.color = 'rgb(143 167 255)'

//***************** some beauty jewelry  *****************/

// Set the date we're counting down to
var countDownDate = new Date("Aug 5, 2023 07:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "days " + hours + "h "
    + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
