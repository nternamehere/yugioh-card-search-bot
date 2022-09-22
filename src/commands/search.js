const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require('axios');

function buildFields(card) {
    const fields = [];

    if (card.archetype) {
        fields.push({ name: 'Archetype', value: card.archetype });
    }

    fields.push({ name: 'Type', value: card.type, inline: true });
    fields.push({ name: 'Race', value: card.race, inline: true });
    fields.push({ name: 'Card Text', value: card.desc });
    fields.push({ name: 'Prices', value: `Cardmarket: ${card.card_prices[0].cardmarket_price}€ | TCGPlayer: $${card.card_prices[0].tcgplayer_price} \n eBay: $${card.card_prices[0].ebay_price} | Amazon: $${card.card_prices[0].amazon_price}` });

    return fields;
    
}

const cardEmbed = (card) => new EmbedBuilder()
    .setColor(0x000000)
    .setTitle(card.name)
    .setURL(`https://ygoprodeck.com/card-database/?&fname=${encodeURIComponent(card.name)}`)
    .setImage(`https://images.ygoprodeck.com/images/cards/${card.id}.jpg`)
    .addFields(buildFields(card));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Searches Yu-Gi-Oh Cards!')
        .addStringOption(option =>
            option.setName('card')
                .setDescription('The card name to search')
                .setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply();
        const cardName = interaction.options.getString('card');
        try {
            const res = await get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(cardName)}`);
            const { data: { data: cards } } = res;
            const card = cards[0];
            await interaction.editReply({ embeds: [cardEmbed(card)] });
        } catch (err) {
            if ((/no card/i).test(err?.response?.data?.error)) return await interaction.editReply(`Card not found in database: ${cardName}`);
            await interaction.editReply('Error occured when searching card.');
        }
	},
};