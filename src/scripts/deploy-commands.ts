const { REST, Routes } = require("discord.js");
require("dotenv").config();
import * as fs from "fs";
import * as path from "path";

const Token = process.env.DISCORD_TOKEN;
const Client_ID = process.env.Client_ID;
const GUILD_ID = process.env.GUILD_ID;

// tableau qui va répertorier toutes mes commandes
const commands: object[] = [];

const folderPath = path.join(__dirname, "..", "command");
const folders = fs.readdirSync(folderPath);

for (const folder of folders) {
  const commandPath = path.join(folderPath, folder);
  const commandfiles = fs
    .readdirSync(commandPath)
    .filter((files: string) => files.endsWith(".js"));

  for (const file of commandfiles) {
    const filesPath = path.join(commandPath, file);
    const command = require(filesPath);
    if ("data" in command || "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filesPath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(Token);

(async () => {
  try {
    console.log(`je commence à récupérer les ${commands.length} (/) commandes`);
    const data = await rest.put(
      Routes.applicationGuildCommands(Client_ID, GUILD_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
