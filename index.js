import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName('deploy-vps')
    .setDescription('Deploy a local VPS (Docker) with Tmate')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.APP_ID),
      { body: commands }
    );
    console.log('Slash command registered.');
  } catch (err) {
    console.error('Command registration error:', err);
  }
})();

client.once('ready', () => {
  console.log(`Bot ready as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'deploy-vps') {
    await interaction.reply('Deploying VPS with Tmate...');
    try {
      const output = execSync('./deploy_tmate.sh');
      const session = output.toString().trim();

      if (session.includes('ssh')) {
        await interaction.editReply(`Tmate session ready:\n\`${session}\``);
      } else {
        await interaction.editReply(`Something went wrong:\n${session}`);
      }
    } catch (err) {
      console.error(err);
      await interaction.editReply('Failed to deploy Tmate VPS.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
