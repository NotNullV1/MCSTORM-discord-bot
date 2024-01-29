# MCSTORM Discord bot

## System requirements:
- 0.5 GB RAM
- 1 core CPU
- 20 MB available disk space

## Install:
1. Install nodejs and npm: Linux: `sudo apt -y install nodejs npm` Windows: [https://nodejs.org/en](https://nodejs.org/en) (download and install LTS)
2. Clone this repo or download and extract this .zip file to a new folder
3. Open terminal (if not already)
4. Go to the folder with your bot file `cd your_bot_folder`
5. Run command: `npm i`
6. Installed successfully

## Configuration:
1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and login if not already
2. Click **New Application**, write the bot name, accept terms and click **Create**
3. In the left menu, click **Bot** and enable all 3 **Privileged Gateway Intents**, then click **Save Changes**
4. At the top of the page, click **Reset Token**, then **Yes, do it!** and copy the token
5. Open config.json and replace **YOUR_BOT_TOKEN_HERE** with the copied token
6. Create a new channel in your discord server and copy it's ID
7. Replace **YOUR_ATTACK_CHANNEL_HERE** with the copied channel ID
8. You can use the default API Token, or replace it with your own for private slots
9. Create a role for each plan and configure the plans in the config file
10. Save the config file
11. In Discord Developer Portal, click on **OAuth2**, then **URL Generator** rigt underneath it
12. In **SCOPES**, select **bot**
13. In **BOT PERMISSIONS**, select **Administrator**
14. Copy the **GENERATED URL** below and open it in your browser
15. Select a server to which you want to add your bot and click **Continue**
16. Click **Authorize**
17. Complete the captcha (if any) and your bot is configured.

## Usage windows/Linux desktop:
1. Open terminal
2. Go to the folder with your bot file `cd your_bot_folder` (if not already)
3. Run command `node index.js`
4. Keep the terminal window open

## Usage Linux server/VPS:
1. Open a screen or a tmux session `tmux` or `screen` (install if not already)
2. Go to the folder with your bot file `cd your_bot_folder`
3. Run command `node index.js`

## Methods:
- legitnamejoin
- motd
- motdjoin
- handshake
- longnames
- nullping
- invalidstate
- corruptedframe
- http
- ssh
- ftp
- tls
- randompacket

## Protocols:
```
1.20.4 > 765
1.20.4 > 765
1.20.2 > 764
1.20.1 > 763
1.20 > 763
1.19.4 > 762
1.19.3 > 761
1.19.2 > 760
1.19.1 > 760
1.19.2 > 760
1.19 > 759
1.18.2 > 758
1.18.1 > 757
1.18 > 757
1.17.1 > 756
1.16.5 > 754
1.16.4 > 754
1.16.3 > 753
1.16.2 > 751
1.16.1 > 736
1.16 > 735
1.15.1 > 575
1.15.2 > 578
1.15.1 > 575
1.15 > 573
1.14.4 > 498
1.14.3 > 490
1.14.2 > 485
1.14.1 > 480
1.14 > 477
1.13.2 > 404
1.13.1 > 401
1.13 > 393
1.12.2 > 340
1.10.2 > 210
1.8.9 > 47
```
