import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pong")
    .setDescription("renvoie la commande ping"),

  async execute(interaction: any) {
    interaction.reply("ping !!!");
  },
};
