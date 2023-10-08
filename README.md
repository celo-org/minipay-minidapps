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

7. Open the Site Tester dApp inside MiniPay and use the static url or the url you get from ngrok!
