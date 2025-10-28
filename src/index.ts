const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
  ChatInputCommandInteraction,
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

//path.join fait parti du package node.js
// path.join aide a construire un chemin grace aux fichiers/dossiers que je lui rentre en paramètre
// je peux lui rentrer autant de paramètre que je veux, du moment que chaque représente un dossier, un sous dossier ou un fichier

//__dirname est une variable spéciale de node.js qui permet d'avoir le chemin absolu vers le fichier où je me situe
// ça par de la racine du système de fichier pour arriver jusqu'au répertoire où se situe mon fichier
const foldersPath = path.join(__dirname, "commands");

// fs.readdirSync La méthode lit le chemin d'accès au répertoire et renvoie un tableau contenant
// tous les noms de dossiers/ fichiers qu'il contient.
const commandFolders = fs.readdirSync(foldersPath);

// création d'une boucle pour parcourir le système de fichier
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: string) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath); // récupère l'objet exporté dans le fichier décrivant la commande
    //vérification de si l'object récupérée dans le fichier décrivant la commande contient bien les propriétés data et execute
    // si c'est le cas, on les ajoute dans la map étendue contenue dans client.commands
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction: any) => {
  console.log(
    " ce que contient interaction.client.commands :",
    interaction.client.commands
  );
  // vérifie que interaction est une commande slash et ça renvoie rien si s'en est pas une
  if (!interaction.isChatInputCommand()) return;

  //récupération du nom de la commande
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});
client.login(Token);
