const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require('axios');

const listEmbed = (cards, searchParam) => new EmbedBuilder()
    .setColor(0x000000)
    .setTitle(searchParam)
    .setURL(`https://ygoprodeck.com/card-database/?&fname=${encodeURIComponent(searchParam)}`)
    .addFields({ name: 'Cards Found', value: cards.map(card => card.name).join('\n') });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Lists Yu-Gi-Oh cards that contain the search term!')
        .addStringOption(option =>
            option.setName('card')
                .setDescription('The card name to search')
                .setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply();
        const searchParam = interaction.options.getString('card');
        try {
            const { data: { data: cards } } = await get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(searchParam)}`);
            await interaction.editReply({ embeds: [listEmbed(cards, searchParam)] });
        } catch (err) {
            if ((/no card/i).test(err?.response?.data?.error)) return await interaction.editReply(`Card not found in database: ${searchParam}`);
            await interaction.editReply('Error occured when searching card.');
        }
	},
};