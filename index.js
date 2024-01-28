const express = require("express");
const app = express();
const { exec } = require("child_process");
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(
    `Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`,
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

function pluton(query) {
  return new Promise((resolve, reject) => {
    let queryStr = JSON.stringify(query);

    queryStr = queryStr.replace(/ /g, "+");

    exec(`python3 pluton.py '${queryStr}'`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      resolve(stdout);
      if (query.command === 'ip') {
        ipdata = JSON.parse(stdout.replace(/False/g, 'false').replace(/'/g, '\"'));
      };
    });
  });
}

client.on("ready", () => {
  let activities = [`opa`],
    i = 0;
  setInterval(
    () =>
      client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING",
      }),
    1000 * 10,
  );
  client.user.setPresence({
    status: "afk",
  });
  console.log("🎩");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "pluton") {
    try {
      const query = {
        command: interaction.commandName,
        nome: interaction.options.get("nome").value,
        metodo: interaction.options.get("metodo").value,
        formato: interaction.options.get("formato").value,
        and: interaction.options.get("and") ? interaction.options.get("and").value : "",
      };
      const stdout = await pluton(query);
      
      const embed = new EmbedBuilder()
        .setTitle("Pluton")
        .setDescription("Criado por Rafaelo & breq")
        .setColor(0x57008a)
        .addFields({
          name: interaction.options.get("and") ? `Resultados da pesquisa: ${query.nome.replace("+", " ")} & ${query.and.replace("+", " ")}` : `Resultados da pesquisa: ${query.nome.replace("+", " ")}`,
          value: `${stdout}`,
        });

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply(
        "Parece que o Pluton não está funcionando ou está indisponível no momento.",
      );
    };
  };

  if (interaction.commandName === "ip") {
    try {
      const query = {
        command: interaction.commandName,
        ip: interaction.options.get("ip").value,
      };
      const stdout = await pluton(query);

      const embed = new EmbedBuilder()
        .setTitle("Pluton")
        .setDescription("Criado por Rafaelo & breq")
        .setColor(0x57008a)
        .addFields(
          {
            name: `Resultados da pesquisa:`,
            value: `${query.ip}`,
          },
          {
            name: `Localização:`,
            value: `${ipdata.location}`,
          },
          {
            name: `Coordenadas:`,
            value: `${ipdata.coordinates.latitude}, ${ipdata.coordinates.longitude}`,
          },
          {
            name: `Código de Área:`,
            value: `${ipdata.area_code}`,
          },
          {
            name: `Provedor de serviços de internet:`,
            value: `${ipdata.isp}`,
          },
          {
            name: `Host:`,
            value: `${ipdata.host.domain}`,
          },
        );

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      };
  };
      if (interaction.commandName === "cpf") {
        try {
          const query = {
            command: interaction.commandName,
            nome: interaction.options.get("nome").value,
          };
          const stdout = await pluton(query);

          const embed = new EmbedBuilder()
            .setTitle("Pluton")
            .setDescription("Criado por Rafaelo & breq")
            .setColor(0x57008a)
            .addFields(
              {
                name: `Resultados da pesquisa:`,
                value: `${query.nome}`,
              },
              {
                name: `Arquivos que potencialmente contêm o CPF do alvo:`,
                value: `${stdout}`,
              },
            );

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          console.error(error);
          };
      };
});

client.login(process.env["TOKEN"]);
