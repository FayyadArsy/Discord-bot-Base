import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits } from 'discord.js'

import fetch  from 'node-fetch'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`🤖 Bot aktif sebagai ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'motivasi') {
    await interaction.deferReply();

    try {
      const res = await fetch('https://zenquotes.io/api/random');
      const data = await res.json();

      const quote = data[0].q;
      const author = data[0].a;

      await interaction.editReply(`💡 **"${quote}"** — *${author}*`);
    } catch (error) {
      console.error(error);
      await interaction.editReply('❌ Gagal mengambil motivasi.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN)
