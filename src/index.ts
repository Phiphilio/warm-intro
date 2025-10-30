import { Client, GatewayIntentBits, Events } from "discord.js";

const dotenv = require("dotenv");
dotenv.config();

const token = process.env.DISCORD_TOKEN;
//GatewayIntentBits est un objet qui dont chaque clé correspond à une valeur numérique, on appelle ça une  énumration javascript
/**
 *
 *
 */
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (client: any) => {
  console.log(`ce que contient le paramètre client dans client.once ${client}`);
  console.log(`connecté au client ${client.user.tag}`);
});

client.login(token);
