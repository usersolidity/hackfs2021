"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fetch_json_1 = require("fetch-json");
const etherspot_1 = require("etherspot");
const web3_storage_1 = require("web3.storage");
const nft_storage_1 = require("nft.storage");
const web3_1 = __importDefault(require("web3"));
require("dotenv").config();
const covalentjs = require("covalentjs");
const Audius = require("audius");
const AUTHOR = "@aleadorjan";
const AUDIUS_TITLE = "ETHGlobal Audius app";
const AUDIUS_ID = "aadorian";
const BOT_NAME = "MultiChain ETHGlobal Discord Bot";
const BOT_NAME_FOOTER = "EHTGLobal";
const EMBED_COLOR_PRIMARY = 0x285fd0;
const EMBED_ETHERSPOT = 0xe64945;
const EMBED_AUDIO = 0x6f12b8;
const EMBED_FILE = 0x78f9fe;
const FILE_TEXTILE = "https://slate.textile.io/ipfs/bafybeib35oktwvz3iskxbz7vz4ukow7amnmaldke6w2y2rvfpad54k335a";
const EMBED_COLOR_SECONDARY = 0xffffff;
const EMBED_WEBSTORAGE = 0xf44935;
const MY_ADDRESS = process.env.PUBLIC_KEY;
const IMAGE_DEFAULT = "https://i.imgur.com/iyepKNy.png";
const IMAGE_ESTUARY = 'https://i.imgur.com/vEpFp5t.jpg';
const IMAGE_ETHERSPOT = "https://i.imgur.com/hRb4gBD.png";
const IMAGE_COVALENT_GIF = "https://i.imgur.com/agNSuko.gif";
const IMAGE_COVALENT = "https://i.imgur.com/9OMcWiP.png";
const IMAGE_IPFS = "https://i.imgur.com/V7GtSKE.jpg";
const IMAGE_NFTSTORAGE = 'https://i.imgur.com/QVCAUuq.png';
const URL = "https://github.com/aadorian/ethglobal.git";
const URL_BOT = "https://ethglobal.tv";
const URL_ETHERSPOT = "https://docs.etherspot.dev";
const URL_VIDEO_ETHGLOBAL = "https://www.youtube.com/embed/64Ufy2z35eQ";
const LOGO_ETHERSPOT = "https://i.imgur.com/Fd6ClDs.png";
const LOGO_AUDIUS = "https://i.imgur.com/BUBBlpJ.png";
const IMAGE_PROTOCOLABS = "https://i.imgur.com/9UMqVkb.jpg";
const IMAGE_WEBSTORAGE = "https://i.imgur.com/nGeDQui.png";
const MNEMONIC = process.env.MNEMONIC;
const LOGO = "https://i.imgur.com/iyepKNy.png";
const ABOUT = "https://githubmemory.com/@aadorian";
const SENDER_ADDRESS = "0xcD66344DbFba23e7d5DCC7BBe2be1CBc4bc09ECe";
const MY_MUSIC = "https://audius.co/aadorian/music-479251";
const TOKEN_NAME = "TOKEN";
const ytdl = require("ytdl-core");
console.log(`Starting bot...`);
console.log(`Connecting web3 to ..`);
const client = new discord_js_1.Client();
const web3 = new web3_1.default(process.env.RPC_URL);
const PRIVATE_KEY = process.env.PRIVATE_KEY;
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", async (msg) => {
    try {
        if (msg.content === "!nft.storage") {
            const apiKey = process.env.API_NFT;
            const client = new nft_storage_1.NFTStorage({ token: apiKey });
            msg.channel.send("Sending this file to NFT Storage");
            msg.channel.send({
                files: ["./images/1.png"],
            });
            console.log(client);
            const metadata = await client.store({
                name: 'NFT',
                description: 'My NFT File!',
                image: new web3_storage_1.File(["./images/1.png"], 'mynft.jpg', { type: 'image/jpg' })
            });
            const msgNFTEmbed = new discord_js_1.MessageEmbed()
                .setColor(IMAGE_WEBSTORAGE)
                .setDescription(BOT_NAME + " NFT Storage")
                .setURL(URL_BOT)
                .setAuthor("Author: " + AUTHOR, IMAGE_NFTSTORAGE, URL_BOT)
                .setThumbnail(IMAGE_NFTSTORAGE)
                .addField("Description ", metadata.data.description, true)
                .addField("Name ", metadata.data.name, true)
                .addField("Image ", metadata.data.image, true)
                .addField("IPNFT ", metadata.ipnft, true)
                .addField("Embed", metadata.embed, true)
                .setFooter(BOT_NAME_FOOTER, IMAGE_NFTSTORAGE)
                .setTimestamp();
            msg.channel.send(msgNFTEmbed);
            msg.channel.send(`https://ipfs.io/` + metadata.data.image);
        }
        if (msg.content === "!audius") {
            const audiusApp = new Audius(AUDIUS_TITLE);
            console.log(audiusApp);
            msg.channel.send(MY_MUSIC);
            msg.channel.send(audiusApp.appName);
            audiusApp.searchTracks("music").then((music) => {
                const msgEmbed = new discord_js_1.MessageEmbed()
                    .setColor(EMBED_AUDIO)
                    .setDescription(BOT_NAME + " AUDIUS ")
                    .setURL(URL_BOT)
                    .setAuthor("Author: " + AUTHOR, LOGO_AUDIUS, URL_BOT)
                    .setThumbnail(LOGO_AUDIUS)
                    .addField("Title ", music[0].title, true)
                    .addField("repost ", music[0].repostCount, true)
                    .addField("name ", music[0].user.name, true)
                    .addField("Bio", music[0].user.bio, true)
                    .addField("location", music[0].user.location, true)
                    .setImage(music[0].artwork.small)
                    .setFooter(BOT_NAME_FOOTER, LOGO_AUDIUS)
                    .setTimestamp();
                msg.channel.send(msgEmbed);
            });
            audiusApp.searchUsers("aadorian").then((users) => {
                const msgEmbed = new discord_js_1.MessageEmbed()
                    .setColor(EMBED_AUDIO)
                    .setDescription(BOT_NAME + " AUDIUS ")
                    .setURL(URL_BOT)
                    .setAuthor("Author: " + AUTHOR, LOGO_AUDIUS, URL_BOT)
                    .setThumbnail(LOGO_AUDIUS)
                    .addField("user name", users[0].name, true)
                    .addField("verified", users[0].verified, true)
                    .addField("following", users[0].following, true)
                    .setImage(users[0].profilePicture.small)
                    .setFooter(BOT_NAME_FOOTER, LOGO_AUDIUS)
                    .setTimestamp();
                msg.channel.send(msgEmbed);
            });
        }
        if (msg.content === "/join") {
            client.user.setActivity("ethGlobal", { type: "LISTENING" });
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                const dispatcher = connection.play(ytdl(URL_VIDEO_ETHGLOBAL, { filter: "audioonly" }));
            }
            else {
                msg.reply("You need to join a voice channel :) and wait a sec to start listening!");
            }
        }
        if (msg.content === "!covalent") {
            const result = await covalentjs.classA.getTokenBalancesForAddress(80001, MY_ADDRESS, { nft: true });
            let last = result.data.items.length;
            for (let index = 0; index < last; index++) {
                const covalentEmbed = new discord_js_1.MessageEmbed()
                    .setColor(EMBED_COLOR_PRIMARY)
                    .setTitle(result.data.items[index].contract_name)
                    .setURL(URL)
                    .setAuthor(AUTHOR, IMAGE_COVALENT, URL)
                    .setDescription(BOT_NAME)
                    .setThumbnail(IMAGE_COVALENT_GIF)
                    .addFields({ name: "Address", value: `${result.data.address}`, inline: true }, {
                    name: "Updated at",
                    value: `${result.data.updated_at}`,
                    inline: true,
                }, {
                    name: "Currency ",
                    value: `${result.data.quote_currency}`,
                    inline: true,
                }, {
                    name: "Chain id ",
                    value: `${result.data.chain_id}`,
                    inline: true,
                }, {
                    name: "Symbol ",
                    value: `${result.data.items[index].contract_ticker_symbol}`,
                    inline: true,
                }, {
                    name: "Name ",
                    value: `${result.data.items[index].contract_name}`,
                    inline: true,
                }, {
                    name: "Type ",
                    value: `${result.data.items[index].type}`,
                    inline: true,
                }, {
                    name: "Balance ",
                    value: `${result.data.items[index].balance}`,
                    inline: true,
                }, {
                    name: "Balance 24h ",
                    value: `${result.data.items[index].balance_24h}`,
                    inline: true,
                })
                    .setImage(IMAGE_COVALENT)
                    .setTimestamp()
                    .setFooter("Network: " + BOT_NAME_FOOTER, result.data.items[index].logo_url);
                msg.channel.send(covalentEmbed);
            }
        }
        if (msg.content === "!web3storage") {
            const storage = new web3_storage_1.Web3Storage({ token: process.env.API_WEBSTORAGE });
            const info = await storage.status("bafybeidtkxalcbwogw5lavgick7qiqp645davpq3k4m2uqdn434aofuxz4");
            console.log(info);
            const infoEmbed = new discord_js_1.MessageEmbed()
                .setColor(EMBED_WEBSTORAGE)
                .setDescription(BOT_NAME + " web3storage ")
                .setURL(URL_BOT)
                .setAuthor("Author: " + AUTHOR, IMAGE_WEBSTORAGE, URL_BOT)
                .setThumbnail(IMAGE_WEBSTORAGE)
                .addField("Cid ", info.cid)
                .addField("created ", info.created, true)
                .addField("dagsize ", info.dagSize, true)
                .addField("deals status", info.deals[0].status, true)
                .addField("deals pieceCid", info.deals[0].pieceCid, true)
                .setImage(IMAGE_WEBSTORAGE)
                .setFooter(BOT_NAME_FOOTER, IMAGE_PROTOCOLABS)
                .setTimestamp();
            msg.channel.send(infoEmbed);
            const result = await storage.get(
            //"bafybeidtkxalcbwogw5lavgick7qiqp645davpq3k4m2uqdn434aofuxz4"
            "bafybeihcijwr25dqo34apy27jsn23fmw63nair6ruismhmlqiclg6vqb6i");
            const files = await result.files();
            msg.channel.send(`https://` + info.cid + ".ipfs.dweb.link/");
            for (const file of files) {
                const msgFileEmbed = new discord_js_1.MessageEmbed()
                    .setColor(EMBED_FILE)
                    .setDescription(BOT_NAME + " web3storage ")
                    .setURL(URL_BOT)
                    .setAuthor("Author: " + AUTHOR, IMAGE_IPFS, URL_BOT)
                    .setThumbnail(IMAGE_IPFS)
                    .addField("cid ", file.cid)
                    .addField("name ", file.name)
                    .addField("last Modified ", file.lastModified)
                    .addField("size", file.size)
                    .setImage(IMAGE_PROTOCOLABS)
                    .setFooter(BOT_NAME_FOOTER, IMAGE_PROTOCOLABS)
                    .setTimestamp();
                msg.channel.send(msgFileEmbed);
            }
            client.user.setActivity("web3storage", { type: "WATCHING" });
            //client.user.setAvatar(IMAGE_DEFAULT)
            console.log(result);
        }
        if (msg.content === "!we3storageupload") {
            client.user.setActivity("web3storageUploading", { type: "WATCHING" });
            const storage = new web3_storage_1.Web3Storage({ token: process.env.API_WEBSTORAGE });
            console.log(storage);
            const files = [];
            const pathFiles = await web3_storage_1.getFilesFromPath("./images");
            files.push(...pathFiles);
            msg.channel.send(`Uploading ${files.length} files`);
            const cid = await storage.put(files);
            msg.channel.send("Content added Ok with CID:" + cid);
        }
        if (msg.content === "!etherspot") {
            client.user.setActivity("etherspot", { type: "WATCHING" });
            const sdk = new etherspot_1.Sdk(PRIVATE_KEY, {
                networkName: "matic",
            });
            sdk.notifications$.subscribe((notification) => console.log("notification:", notification));
            await sdk.computeContractAccount();
            const { account } = sdk.state;
            const tokensList = await sdk.getAccountTokenListTokens();
            const totalTokens = tokensList.length;
            const firstToken = tokensList[0];
            sdk.destroy();
            const msgEmbed = new discord_js_1.MessageEmbed()
                .setColor(EMBED_ETHERSPOT)
                .setDescription(BOT_NAME + " etherspot ")
                .setURL(URL_BOT)
                .setAuthor("Author: " + AUTHOR, LOGO_ETHERSPOT, URL_ETHERSPOT)
                .setThumbnail(IMAGE_ETHERSPOT)
                .addField("Total tokens @ EtherSpot", totalTokens)
                .addField("First token address", firstToken.address, true)
                .addField("name", firstToken.name, true)
                .addField("decimals", firstToken.decimals, true)
                .addField("chainId", firstToken.chainId, true)
                .addField("local public address", account.address, false)
                .addField("type", account.type, true)
                .addField("state", account.state, true)
                .addField("syncronized at", account.synchronizedAt)
                .setImage(IMAGE_ETHERSPOT)
                .setFooter(BOT_NAME_FOOTER, LOGO)
                .setTimestamp();
            msg.channel.send(msgEmbed);
        }
        if (msg.content === "!estuary.tech") {
            client.user.setActivity("estuary", { type: "WATCHING" });
            const url = "https://api.estuary.tech/public/stats";
            //https://dweb.link/ipfs/Qmc65LDSnzAERdrsiEVmxqyXtkLe8Uk7iaFyxbWxXKTdFy
            client.user.setActivity("estuary", { type: "STREAMING" });
            const data = await fetch_json_1.fetchJson.get(url);
            const msgEmbed = new discord_js_1.MessageEmbed()
                .setColor(EMBED_COLOR_PRIMARY)
                .setDescription(BOT_NAME)
                .setURL(URL_BOT)
                .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
                .setThumbnail(IMAGE_ESTUARY)
                .addField("Total Storage", `${data.totalStorage}`, true)
                .addField("Total Files", `${data.totalFiles}`, true)
                .addField("Deals OnChain", `${data.dealsOnChain}`, true)
                .addField("Deals OnChain", `${data.dealsOnChain}`, true)
                .setImage(IMAGE_ESTUARY)
                .setFooter(BOT_NAME_FOOTER, IMAGE_ESTUARY)
                .setTimestamp();
            msg.channel.send(msgEmbed);
        }
        if (msg.content === "!templatepost") {
            const rawResponse = await fetch_json_1.fetchJson.post("https://httpbin.org/post", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ a: 1, b: "Textual content" }),
            });
            console.log(rawResponse);
        }
        if (msg.content === "!slate.textile") {
            client.user.setActivity("nft", { type: "PLAYING" });
            msg.channel.send(FILE_TEXTILE);
        }
        if (msg.content === "!ping") {
            const accountBalance = BigInt(await web3.eth.getBalance(SENDER_ADDRESS));
            const msgEmbed = new discord_js_1.MessageEmbed()
                .setColor(EMBED_COLOR_PRIMARY)
                .setDescription(BOT_NAME)
                .setURL(URL_BOT)
                .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
                .setThumbnail(LOGO)
                .addField("Current account balance", `${accountBalance / 10n ** 18n} ${TOKEN_NAME}`)
                .setImage(LOGO)
                .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
                .setTimestamp();
            msg.channel.send(msgEmbed);
            client.user.setActivity("tokens", { type: "WATCHING" });
            /*msg.channel.send({
              files: ["./images/1.png"],
            });*/
            //client.user.setAvatar(IMAGE_DEFAULT)
        }
    }
    catch (e) {
        msg.reply("ERROR");
        console.log(new Date().toISOString(), "ERROR", e.stack || e);
    }
});
client.login(process.env.DISCORD_TOKEN);
