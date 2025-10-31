const {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  messageFlags,
} = require("discord.js");
import * as path from "path";
import * as fs from "fs";
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
  console.log(`connecté au client ${client.user.tag}`);
});

// je crée une collection qui va stocker mes futures commandes.
//pour rappel, une collection c'est une map qui justement va stocker le nom de la commande en clé et

client.commands = new Collection(); // pour que cllient.commands passe tranquillement, je peux faire juste un require("discord.js")
// pas besoin d'import

const commandPath = path.join(__dirname, "command");
const commandFolders = fs.readdirSync(commandPath);

client.on(Events.InteractionCreate, async (interaction: any) => {
  // d'abord vérifier que l'intéraction est bien une commandeslash
  if (!interaction.isChatInputCommand()) return;

  //ensuite identifier de quelle commandSlash il s'agit
  // pour savoir d'où la commande vient, je vais me référer au client, la collection de commande qui y est stocké va
  // me permettre de savoir de quelle commande il s'agit

  const command = interaction.client.commands.get(interaction.commandName);
  console.log(`donc il s'agit de la command ${command}`);

  // si il n'y a aucune correspondance j'affiche un message
  if (!command) {
    console.error(
      `❌ Aucune commande ne correspond à "${interaction.commandName}"`
    );
    return;
  }

  // on crée un petit try&catch pour avoir du controle sur ce qui va suivre
  try {
    await command.execute(interaction);
  } catch (error) {}
});

// je vais parcourir les fichier et récupérer dans utility tous les fichiers portant l'extension ".js" pour les passer à ma collection

for (const folder of commandFolders) {
  // je vais d'abord entrer déterminer le chemin vers l'interieur du fichier utility où se trouvent toutes mes commandes
  const filesPath = path.join(commandPath, folder);
  // je vais répertorier tous les fichiers dans utility
  const commandFiles = fs
    .readdirSync(filesPath)
    .filter((files: string) => files.endsWith(".js"));

  for (const command of commandFiles) {
    const commandin = path.join(filesPath, command);
    const truc = require(commandin);

    if ("data" in truc || "execute" in truc) {
      client.commands.set(truc.data.name, truc);
    } else {
      console.log(
        `[WARNING] The command at ${commandin} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.login(token);
