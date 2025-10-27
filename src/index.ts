const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
} = require("discord.js");
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

//client.commands = new Collection() → crée un coffre pour toutes les commandes du bot.
/**
 * Collection est une classe étendue de Map proposée par discord.js.
 * Une Map est une structure de données clé‑valeur (comme un objet), mais avec quelques avantages :
 *          Les clés peuvent être de n’importe quel type (pas seulement des chaînes)
 *          La taille est directement accessible via .size
 *          On peut itérer facilement sur les entrées avec for…of
 *          Méthodes utiles : .set(key, value), .get(key), .has(key), .delete(key), etc.
 *
 */
client.commands = new Collection();

// path.join aide a construire un chemin vers le repertoire portant le nom du deuxième paramètre
const foldersPath = path.join(__dirname, "commands");

// fs.readdirSync La méthode lit le chemin d'accès au répertoire et renvoie un tableau contenant
// tous les noms de dossiers/ fichiers qu'il contient.
const commandFolders = fs.readdirSync(foldersPath);

// création d'une boucle

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: string) => file.endsWith(".js"));
  console.log("commandFiles :", commandFiles);
}
client.login(Token);
