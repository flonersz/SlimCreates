
//import {ethers} from 'ethers';

function ConnectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    const address = provider.provider.selectedAddress
    const adressInicio = address.slice(0, 4)
    const adressFim = address.slice(-4)
    const resultado = adressInicio + '...' + adressFim
    var carteira = document.getElementById('butao')
    carteira.innerText = resultado
}

document.getElementById("butao").addEventListener("click", ConnectWallet);


async function Buy() {
    const transaction = {
        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        value: ethers.utils.parseEther('0.1')
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    const signer = provider.getSigner();
    const address = provider.provider.selectedAddress
    if (address == null) {
        window.alert('nao conectado')
    }
    if (chainId == 137) {
        const tx = await signer.sendTransaction(transaction);
    } else {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethers.utils.hexValue(137) }],
        });
    }
}

document.getElementById("buying").addEventListener("click", Buy);