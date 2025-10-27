const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

//Client : classe principale pour créer mon bot discord
//Events contient tous les évènements que le bot peut écouter
//GatewayIntentBits sont des intents, ils disent à discord quelles genre d'informations je veux recevoir.

// analogie : un intents c'est comme un sens, j'ai la 'vu', 'l'audition', 'le touché' etc. grâce aux intents que j'utilise, je peux déterminer
//les sens que je veux utiliser. Autrement dit, je dis au serveur discord le genre de chose que je veux être capable de faire.
// en parallèle, un Events, c'est directement l'action que j'effectue avec ce sens. "je regarde la télé", "j'écoute l'album de prince",
//  "je touche mes cheveux "

const Token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient: typeof Client) => {
  console.log(`Ready client for ${readyClient.user.tag}`);
});

client.login(Token);
