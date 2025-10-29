import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("great")
    .setDescription("responde a 'crazy diamond is unbreakable'"),

  async execute(interaction: any) {
    interaction.reply("crazy diamond is unbreakable");
  },
};
