import { Client, Events, GatewayIntentBits } from "discord.js";

//Client : classe principale pour créer mon bot discord
//Events contient tous les évènements que le bot peut écouter
//GatewayIntentBits sont des intents, ils disent à discord quelles genre d'informations je veux recevoir.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
