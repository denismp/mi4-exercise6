$(document).ready(function () {
    const derivationPath = "m/44'/60'/0'/0/";
    //const provider = ethers.providers.getDefaultProvider('ropsten');
    const provider = new ethers.providers.EtherscanProvider('ropsten');
    const address = "0x245efd2b4f953accd7bf84b1db9c625074bb54f6"; // IncrementorContract.sol deployed to metamask
    const abi = 
    [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "step",
                    "type": "uint256"
                }
            ],
            "name": "derivedIncrement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "step",
                    "type": "uint256"
                }
            ],
            "name": "externalIncrement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "step",
                    "type": "uint256"
                }
            ],
            "name": "increment",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "get",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    var contract = new ethers.Contract(address, abi, provider);

    let wallets = {};

    showView("viewHome");

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkCreateNewWallet').click(function () {
        $('#passwordCreateWallet').val('');
        $('#textareaCreateWalletResult').val('');
        showView("viewCreateNewWallet");
    });

    $('#linkImportWalletFromMnemonic').click(function () {
        $('#textareaOpenWallet').val('');
        $('#passwordOpenWallet').val('');
        $('#textareaOpenWalletResult').val('');
        $('#textareaOpenWallet').val('toddler online monitor oblige solid enrich cycle animal mad prevent hockey motor');
        showView("viewOpenWalletFromMnemonic");
    });

    $('#linkImportWalletFromFile').click(function () {
        $('#walletForUpload').val('');
        $('#passwordUploadWallet').val('');
        showView("viewOpenWalletFromFile");
    });

    $('#linkShowMnemonic').click(function () {
        $('#passwordShowMnemonic').val('');
        showView("viewShowMnemonic");
    });

    $('#linkShowAddressesAndBalances').click(function () {
        $('#passwordShowAddresses').val('');
        $('#divAddressesAndBalances').empty();
        showView("viewShowAddressesAndBalances");
    });

    $('#linkSendTransaction').click(function () {
        $('#divSignAndSendTransaction').hide();

        $('#passwordSendTransaction').val('');
        $('#transferValue').val('');
        $('#senderAddress').empty();

        $('#textareaSignedTransaction').val('');
        $('#textareaSendTransactionResult').val('');

        showView("viewSendTransaction");
    });

    $('#linkExportJson').click(function () {
        $('#passwordExportJson').val('');
        showView("viewExportJson");
    });

    $('#linkSetContract').click(function () {
        $('#passwordSetContract').val('');
        showView("viewSetContract");
    });

    $('#linkReadFromContract').click(function () {
        //$('#passwordExportJson').val('');
        showView("viewReadFromContract");
    });

    $('#buttonGenerateNewWallet').click(generateNewWallet);
    $('#buttonOpenExistingWallet').click(openWalletFromMnemonic);
    $('#buttonUploadWallet').click(openWalletFromFile);
    $('#buttonShowMnemonic').click(showMnemonic);
    $('#buttonShowAddresses').click(showAddressesAndBalances);
    $('#buttonSendAddresses').click(unlockWalletAndDeriveAddresses);
    $('#buttonSignTransaction').click(signTransaction);
    $('#buttonSendSignedTransaction').click(sendSignedTransaction);
    $('#buttonShowExportJson').click(showExportJson);
    $('#buttonSetToContract').click(showSetContract);
    $('#buttonShowReadFromContract').click(showGetFromContract);

    $('#linkDelete').click(deleteWallet);

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();

        if (localStorage.JSON) {
            $('#linkCreateNewWallet').hide();
            $('#linkImportWalletFromMnemonic').hide();
            $('#linkImportWalletFromFile').hide();

            $('#linkShowMnemonic').show();
            $('#linkShowAddressesAndBalances').show();
            $('#linkSendTransaction').show();
            $('#linkDelete').show();
            $('#linkExportJson').show();
            $('#linkToContract').show();
            $('#linkReadFromContract').show();
        }
        else {
            $('#linkShowMnemonic').hide();
            $('#linkShowAddressesAndBalances').hide();
            $('#linkSendTransaction').hide();
            $('#linkDelete').hide();
            $('#linkExportJson').hide();
            $('#linkToContract').hide();

            $('#linkCreateNewWallet').show();
            $('#linkImportWalletFromMnemonic').show();
            $('#linkImportWalletFromFile').show();
            $('#linkReadFromContract').show();
        }
    }

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        })
    }

    function showError(errorMsg) {
        $('#errorBox>p').html('Error: ' + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        })
    }

    function showLoadingProgress(percent) {
        $('#loadingBox').html("Loading... " + parseInt(percent * 100) + "% complete");
        $('#loadingBox').show();
        $('#loadingBox>header').click(function () {
            $('#errorBox').hide();
        })
    }

    function hideLoadingBar() {
        $('#loadingBox').hide();
    }

    function showLoggedInButtons() {
        $('#linkCreateNewWallet').hide();
        $('#linkImportWalletFromMnemonic').hide();
        $('#linkImportWalletFromFile').hide();
        $('#linkSetContract').hide();

        $('#linkShowMnemonic').show();
        $('#linkShowAddressesAndBalances').show();
        $('#linkSendTransaction').show();
        $('#linkDelete').show();
        $('#linkExportJson').show();
        $('#linkReadFromContract').show();
    }

    function encryptAndSaveJSON(wallet, password) {
        // TODO:
        return wallet.encrypt(password, {}, showLoadingProgress)
            .then(json => {
                localStorage['JSON'] = json;
                //console.log("json="+json);
                //exportJson(json);
                showLoggedInButtons();
            })
            .catch(showError)
            .finally(hideLoadingBar);
    }

    function decryptWallet(json, password) {
        // TODO:
        return ethers.Wallet.fromEncryptedWallet(json, password, showLoadingProgress);
    }

    function generateNewWallet() {
        // TODO;
        let password = $('#passwordCreateWallet').val();
        let wallet = ethers.Wallet.createRandom();
        //console.log("password="+password);

        encryptAndSaveJSON(wallet, password)
            .then(() => {
                showInfo("PLEASE SAVE YOUR MNEMONIC: " + wallet.mnemonic);
                $('#textareaCreateWalletResult').val(localStorage.JSON);
            });
    }

    function openWalletFromMnemonic() {
        // TODO:
        let mnemonic = $('#passwordOpenWallet').val();
        if (!ethers.HDNode.isValidMnemonic(mnemonic))
            return showError('Invalid mnemonic');

        let password = $('#passwordOpenWallet').val();
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);

        encryptAndSaveJSON(wallet, password)
            .then(() => {
                showInfo("Wallet successfully loaded!l");
                $('#textareaOpenWalletResult').val(localStorage.JSON);
                //exportJson(json);
            });
    }

    function openWalletFromFile() {
        // TODO:
        if ($('#walletForUpload')[0].files.length === 0) {
            return showError("Please select a file to upload.");
        }
        let password = $('#passwordUploadWallet').val();

        let fileReader = new FileReader();
        fileReader.onload = function () {
            let json = fileReader.result;
            //exportJson(json);

            decryptWallet(json, password)
                .then(wallet => {
                    // Check that the JSON is generated from a mnemonic and not from a single private key
                    if (!wallet.mnemonic)
                        return showError("Invalid JSON file!");

                    localStorage['JSON'] = json;
                    showInfo("Wallet successfully loaded!");
                    showLoggedInButtons();
                })
                .catch(showError)
                .finally(hideLoadingBar);
        };

        fileReader.readAsText($('#walletForUpload')[0].files[0]);
    }

    function showMnemonic() {
        // TODO:
        let password = $('#passwordShowMnemonic').val();
        let json = localStorage.JSON;
        //exportJson(json);

        decryptWallet(json, password)
            .then(wallet => {
                showInfo("Your mnemonic is: " + wallet.mnemonic);
            })
            .catch(showError)
            .finally(hideLoadingBar)
    }

    function showAddressesAndBalances() {
        // TODO:
        let password = $('#passwordShowAddresses').val();
        let json = localStorage.JSON;
        decryptWallet(json, password)
            .then(renderAddressesAndBalances)
            .catch(error => {
                $('#divAddressesAndBalances').empty();
                showError(error);
            })
            .finally(hideLoadingBar);

        function renderAddressesAndBalances(wallet) {
            $('#divAddressesAndBalances').empty();

            let masterNode = ethers.HDNode.fromMnemonic(wallet.mnemonic);

            for (let i = 0; i < 5; i++) {
                let div = $('<div id="qrcode">');
                let wallet = new ethers.Wallet(masterNode.derivePath(derivationPath + i).privateKey, provider);

                wallet.getBalance()
                    .then((balance) => {
                        div.qrcode(wallet.address);
                        div.append($(`<p>${wallet.address}: ${ethers.utils.formatEther(balance)} ETH</p>`));
                        $('#divAddressesAndBalances').append(div);
                    })
                    .catch(showError);
            }
        }
    }

    function unlockWalletAndDeriveAddresses() {
        // TODO:
        let password = $('#passwordSendTransaction').val();
        let json = localStorage.JSON;

        decryptWallet(json, password)
            .then(wallet => {
                showInfo("Wallet successfully unlocked!");
                renderAddresses(wallet);
                $('#divSignAndSendTransaction').show();
            })
            .catch(showError)
            .finally(() => {
                $('#passwordSendTransaction').val();
                hideLoadingBar();
            });

        function renderAddresses(wallet) {
            $('#senderAddress').empty();

            let masterNode = ethers.HDNode.fromMnemonic(wallet.mnemonic);
            for (let i = 0; i < 5; i++) {
                let wallet = new ethers.Wallet(masterNode.derivePath(derivationPath + i).privateKey, provider);
                let address = wallet.address;

                wallets[address] = wallet;
                let option = $(`<option id=${wallet.address}>`).text(address);
                $('#senderAddress').append(option);
            }
        }
    }

    function signTransaction() {
        // TODO:
        let senderAddress = $('#senderAddress option:selected').attr('id');

        let wallet = wallets[senderAddress];
        if (!wallet)
            return showError("Invalid address!");

        let recipient = $('#recipientAddress').val();
        if (!recipient)
            return showError("Invalid recipient!")

        let value = $('#transferValue').val();
        if (!value)
            return showError("Invalid transfer value!");

        wallet.getTransactionCount()
            .then(signTransaction)
            .catch(showError);

        function signTransaction(nonce) {
            let transaction = {
                nonce,
                gasLimit: 21000,
                gasPrice: ethers.utils.bigNumberify("20000000000"),
                to: recipient,
                value: ethers.utils.parseEther(value.toString()),
                data: "0x",
                chainId: provider.chainId
            };

            let signedTransaction = wallet.sign(transaction);
            $('#textareaSignedTransaction').val(signedTransaction);
        };
    }

    function sendSignedTransaction() {
        // TODO:
        let signedTransaction = $('#textareaSignedTransaction').val();
        provider.sendTransaction(signedTransaction)
            .then(hash => {
                let etherscanUrl = 'https://ropsten.etherscan.io/tx/' + hash;
                $('#textareaSendTransactionResult').val(etherscanUrl);
            })
            .catch(showError);
    }

    function deleteWallet() {
        // TODO:
        localStorage.clear();
        showView('viewHome');
    }

    function showExportJson() {
        // TODO: Add logic for export json.
        let password = $('#passwordExportJson').val();
        let json = localStorage.JSON;
        decryptWallet(json, password)
            .then(wallet => {
                //showInfo("Your mnemonic is: " + wallet.mnemonic);
                exportJson(json);
            })
            .catch(showError)
            .finally(hideLoadingBar)
    }

    function showGetFromContract() {
        // TODO: add logic to show read from a contract
        console.log("showGetFromContract(): called...");
        // Use the address of the contract to get the value.
        window.location.replace;
        var callPromise = contract.get();
        callPromise.then(function(result) {
            console.log("value=" + result);
            $('#textareaReadFromContract').val(result);
        });
    }

    function showSetContract() {
        // TODO: add logic to show set a contract
        console.log("showSetContract(): called...");
        let password = $('#passwordSetContract').val();
        let json = localStorage.JSON;
        decryptWallet(json, password)
            .then(wallet => {
                let masterNode = ethers.HDNode.fromMnemonic(wallet.mnemonic);
                let my_wallet = new ethers.Wallet(masterNode.derivePath(derivationPath + 0).privateKey, provider);
                // Use my wallet to set the value in contract value.
                var sendContract = new ethers.Contract(address, abi, my_wallet);
                var sendPromise = sendContract.increment(5);
                sendPromise.then(function(transaction) {
                    console.log("transaction=" + transaction);
                });
            })
            .catch(showError)
            .finally(hideLoadingBar)

    }

    function exportJson(myjson) {
        // Taken from https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
        //inputTextToSave--> the text area from which the text to save is
        //taken from
        //var textToSave = document.getElementById("inputTextToSave").value;
        var textToSaveAsBlob = new Blob([myjson], { type: "text/plain" });
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        //inputFileNameToSaveAs-->The text field in which the user input for 
        //the desired file name is input into.
        //var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
        var fileNameToSaveAs = "exportedJson.txt";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
    }
    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }

});