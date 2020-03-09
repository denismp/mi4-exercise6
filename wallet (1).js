$(document).ready(function () {
    const derivationPath = "m/44'/60'/0'/0/";
    const provider = ethers.providers.getDefaultProvider('ropsten');

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

    $('#buttonGenerateNewWallet').click(generateNewWallet);
    $('#buttonOpenExistingWallet').click(openWalletFromMnemonic);
    $('#buttonUploadWallet').click(openWalletFromFile);
    $('#buttonShowMnemonic').click(showMnemonic);
    $('#buttonShowAddresses').click(showAddressesAndBalances);
    $('#buttonSendAddresses').click(unlockWalletAndDeriveAddresses);
    $('#buttonSignTransaction').click(signTransaction);
    $('#buttonSendSignedTransaction').click(sendSignedTransaction);

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
        }
        else {
            $('#linkShowMnemonic').hide();
            $('#linkShowAddressesAndBalances').hide();
            $('#linkSendTransaction').hide();
            $('#linkDelete').hide();

            $('#linkCreateNewWallet').show();
            $('#linkImportWalletFromMnemonic').show();
            $('#linkImportWalletFromFile').show();
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

        $('#linkShowMnemonic').show();
        $('#linkShowAddressesAndBalances').show();
        $('#linkSendTransaction').show();
        $('#linkDelete').show();
    }

    function encryptAndSaveJSON(wallet, password) {
        // TODO:
    }

    function decryptWallet(json, password) {
        // TODO:
    }

    function generateNewWallet() {
        // TODO;
    }

    function openWalletFromMnemonic() {
        // TODO:
    }

    function openWalletFromFile() {
        // TODO:
    }

    function showMnemonic() {
        // TODO:
    }

    function showAddressesAndBalances() {
        // TODO:
    }

    function unlockWalletAndDeriveAddresses() {
        // TODO:
    }

    function signTransaction() {
        // TODO:
    }

    function sendSignedTransaction() {
        // TODO:
    }

    function deleteWallet() {
        // TODO:
    }

});