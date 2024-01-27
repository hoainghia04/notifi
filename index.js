const {
  Client,
  WebhookClient,
  MessageEmbed,
} = require("discord.js-selfbot-v13");
// const settings = require('./settings.json');
const client = new Client({ checkUpdate: false });
const monitoredData = [
  {
    name: "Mirage",
    servers: [
      { guildId: "911909037954719794", channelId: "1085601317717811200" },
    ],
    webhookUrl:
      "https://discord.com/api/webhooks/1183302471230169088/QdpwsiLV1Dihsh-d0eiONM5OEQbAe0c5R40zBrSqSgeIeCjVvVBxO_IJe00SVQyqkhBX",
  },
  {
    name: "Full Moon",
    servers: [
      { guildId: "1055457822818709596", channelId: "1172884193001345175" },
    ],
    webhookUrl:
      "https://discord.com/api/webhooks/1182959098027851847/tbReInRTSQiP4A7FUhYKd7cV3x_B3tuD8nlZLNbmlBSg__lbeeLMAiq-vYkhY1WqFW9L",
  },
  {
    name: "Haki-Normal",
    servers: [
      { guildId: "1055457822818709596", channelId: "1172884381996699739" },
    ],
    webhookUrl:
      "https://discord.com/api/webhooks/1193356576711528498/RY9air94puZZ-ScwpCV_W4uWGohrNb--SryyHTj3eNynNjRePAvUJN-ObNRFQ1bTnm8g",
  },
  {
    name: "Haki-legend",
    servers: [
      { guildId: "1055457822818709596", channelId: "1172884322357874690" },
    ],
    webhookUrl:
      "https://discord.com/api/webhooks/1196862635795304489/vI4CsqMv41G0HuTf4W0HioGsTXxFks-yuTWjbbtJy6L82aPlhjP8nHDLlzeK2H20IEKw",
  },
  {
    name: "Sword-Legend",
    servers: [
      { guildId: "911909037954719794", channelId: "1144623714663682138" },
    ],
    webhookUrl:
      "https://discord.com/api/webhooks/1196866733173125200/zt7ffhTDWWK08-FhVBDNfqeVvHwJ5Joy6ScB5bzdhJcnL-kEtVfdMdC_I3IBRdghGSdT",
  },
  {
    name: "Fruit-Finder",
    servers: [
      { guildId: "1055457822818709596", channelId: "1172884252220735498" },
    ],
    webhookUrl:
      "https://discord.com/api/webhooks/1196866584334049362/8LD9p4r8S_LrGKHQQuZBkwlqWlfYoFPStrZj8GeLqyXgD_xxBo4l4YLhlcL_0cJ2WWHN",
  },
  {
    name: "Raid-Boss",
    servers: [
      { guildId: "911909037954719794", channelId: "1197504846459310161" },
    ],
    webhookUrl:
      "https://discord.com/api/webhooks/1197063089892380693/JmixeWhSnZRM5FMwlERg0bdX9Uvfj9DEksZugO3kOA1BYQQmgLRD2xaNs8Gpawr2BCGL",
  },
];

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
});

client.on("messageCreate", async (message) => {
  for (const monitoredItem of monitoredData) {
    // Kiểm tra xem message.guildId và message.channelId có tồn tại
    if (!message.guildId || !message.channelId) {
      continue;
    }

    const isMonitoredChannel = monitoredItem.servers.some(
      ({ guildId, channelId }) => {
        return guildId === message.guildId && channelId === message.channelId;
      },
    );

    if (isMonitoredChannel) {
      // Khởi tạo WebhookClient ngoài vòng lặp
      const targetWebhook = new WebhookClient({
        url: monitoredItem.webhookUrl,
      });

      // Kiểm tra xem message.embeds có tồn tại
      if (message.embeds && message.embeds.length > 0) {
        const embed = message.embeds[0];

          async function createRealTimeEmbed() {
          // Sử dụng Intl.DateTimeFormat để định dạng thời gian theo múi giờ Hà Nội
          const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Ho_Chi_Minh',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          });
          const formattedTime = formatter.format(new Date());

          const newEmbed = new MessageEmbed()
            .setColor("#ffffff")
            .setTitle(monitoredItem.name)
            .setDescription("[MY DISCORD](https://discord.gg/hngaming)")
            .addFields(embed.fields)
            .setImage(
              "https://cdn.discordapp.com/attachments/1189613184173223986/1196858792873308171/Xuong_Nhiep_anh_Anh_bia_Facebook.gif?ex=65b9289c&is=65a6b39c&hm=b4b92c1bdc86adbd2b47b386795a0333bb8134a1c20da591be65424a780b105b&",
            )
            .addField("HN Gaming", `**${formattedTime}**`);

          await targetWebhook.send({ embeds: [newEmbed] });
        }

        await createRealTimeEmbed();
      } else {
        await targetWebhook.send(
          `**${monitoredItem.name}**: ${message.content}`,
        );
      }

      // Sử dụng await khi gọi targetWebhook.destroy()
      await targetWebhook.destroy();
    }
  }
});

client.login(
  "NjgzODUwMzg4ODI2NDg4ODMy.GK_v5k.PQmuDCd7sMZfpSQYqrmNQf4PyORWF8KTwMFQlw",
);
