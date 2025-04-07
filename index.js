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
  if (!interaction.isChatInputCommaconst output = execSync('./deploy_tmate.sh').toString();

// Filter only lines with SSH or web link
const sessionLines = output.split('\n').filter(line =>
  line.includes('ssh') || line.includes('https://')
).join('\n');

// Fallback message if session info not found
const finalOutput = sessionLines || 'Tmate session started, but no session string was detected.';

await interaction.editReply(`Tmate session ready:\n\`\`\`\n${finalOutput}\n\`\`\``);
nd()) return;

  if (interaction.commandName === 'deploy-vps') {
    await interaction.reply('Deploying VPS with Tmate...');
    try {
      
