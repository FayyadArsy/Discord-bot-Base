import dotenv from 'dotenv'
dotenv.config()

import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('motivasi')
    .setDescription('Dapatkan motivasi hari ini!')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Menyebarkan command...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Command berhasil disebar!');
  } catch (error) {
    console.error(error);
  }
})();
