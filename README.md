# MiniPay MiniDApps

MiniDApps for quick testing & prototyping in MiniPay.

## How to use

1. Create MiniDApps in the `/dApps` folder
2. Import the DApp in the `App.tsx` file
3. Run the following command to start the DApp

    ```bash
    npm start
    ```

    This will start the app at `http://localhost:3000`.

4. Since, this app is running on localhost and cannot be opened in MiniPay we need to create a tunnel we will use [ngrok](https://ngrok.com/) for the same.

5. Create an account on ngrok, setup ngrok on your machine.

    > [!NOTE]
    > ngrok is offering free static domain, use that so the url of the app does not change!

6. Use the following command, to start the tunnel.

    If you have the static domain

    ```bash
    ngrok http --domain=<STATIC_DOMAIN> 3000
    ```

    If not

    ```bash
    ngrok http 3000
    ```

### How to test your DApp in MiniPay

1. Open the MiniPay app on your phone and click on compass icon.

    ![minipay-app](https://github.com/celo-org/docs/blob/0712d6ec3231bd7d64a906d610a16deb1e6b037e/static/img/doc-images/minipay/minipay-1.png?raw=true)

2. Click on "Test Page" to open the MiniPay test page.

    ![minipay-apps-screen](https://github.com/celo-org/docs/blob/0712d6ec3231bd7d64a906d610a16deb1e6b037e/static/img/doc-images/minipay/minipay-2.png?raw=true)

3. Enter the URL of your DApp and click on "Go".

    ![minipay-site-tester](https://github.com/celo-org/docs/blob/0712d6ec3231bd7d64a906d610a16deb1e6b037e/static/img/doc-images/minipay/minipay-3.png?raw=true)

### Important Notes

-   Ensure the "Connect Wallet" button is hidden when your DApp is loaded inside the MiniPay app, as the wallet connection is implicit.
-   Always verify the existence of `window.provider` before initializing your web3 library to ensure seamless compatibility with the MiniPay wallet.
-   Be cautious about exposing sensitive information or functionality when using public tunneling services like ngrok. Always use them in a controlled environment.
-   MiniPay currently supports setting the `feeCurrency` property when running `eth_sendTransaction`. However, currency support is limited to `cUSD`. More currencies might be supported in future.
-   MiniPay only accepts legacy transactions at the moment. EIP-1559 properties won't be considered when handling requests.
-   Message signing is not currently supported.
-   A developer mode will be available soon, allowing the use of testnet.
