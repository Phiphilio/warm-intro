const { SlashCommandBuilder, ApplicationCommand } = require("discord.js");
// SlashCommandBuilder est une classe utilitaire qui  sert à construire le dictionnaire d'une commande.
// son nom, sa description, ses options etc

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  // execute est la fonction asychrone qui servira de handler. Quand l'utilisateur tapera "/ping"
  // c'est execute qui sera appelée
  async execute(interaction: typeof ApplicationCommand) {
    interaction.reply("pong");
  },
};
