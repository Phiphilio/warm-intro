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

    //ajout de la logique du cooldown

    //récupération du cooldow depuis le client discord
    const { cooldowns } = interaction.client;
    /**
     * pour rappel voici à quoi ressemble
     * cooldowns = {
        'ping': Collection { 'userId1' => timestamp, 'userId2' => timestamp },
        'help': Collection { ... }
}
     */

    // on vérifie si le cooldowns possede dans la collection qu'il contient le nom de cette commande
    // si ce n'est pas le cas, on crée une nouvelle collection pour cette commande
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    /**
     * je récupère  toute une collection, donc tout l'objet associé à la clé de nom command.data.name
     */

    const defaultCooldownDuration = 3; // pour sécuriser au cas où aucune valeur n'a été donné en cooldown
    const cooldownAmount =
      (command.cooldown ?? defaultCooldownDuration) * 1_000;

    if (timestamps.has(interaction.user.id)) {
      // ...
      const expirationTime = timestamps.get(command.data.name) - cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1_000);
        return interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          flags: MessageFlags.Ephemeral,
        });
      }
      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
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
