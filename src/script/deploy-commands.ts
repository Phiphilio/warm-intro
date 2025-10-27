const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");

/**
 * const fs, const commands, const foldersPath, const commandFolders sont déjà déclaré dans le fichier index.ts
 * c'est probablement dû à la méhtode d'import, il faut absolument que je creuse ça
 */

const commands = [];

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: string) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Construire et préparer une instance du module REST
const rest = new REST().setToken(token);
// et déployez vos commandes !
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    // La méthode put est utilisée pour actualiser complètement toutes les commandes de la guilde avec le jeu actuel.
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // Et bien sûr, veillez à détecter et à consigner toutes les erreurs !
    console.error(error);
  }
})();
