import { Events } from "discord.js";

//création d'un handler pour gérer la connexion du bot au server
module.exports = {
  name: Events.ClientReady, // j'écoute si l'évènement qui a lui est bel et bien une connexion du bot au server
  once: true, // comme la connexion à un server n'a lieu qu'une fois dans la vie d'un bot, je précise cette condition
  execute(client: any) {
    console.log(`Ready ${client.user.tag}`);
  },
};
