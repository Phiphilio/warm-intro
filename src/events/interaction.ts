import { Events, MessageFlags } from "discord.js";

//création d'un handler pour gérer les différentes intéractions du bot
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: any) {
    // vérifie que interaction est une commande slash et ça renvoie rien si s'en est pas une
    if (!interaction.isChatInputCommand()) return;

    //récupération du nom de la commande
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
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
  },
};
