const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "pluton",
    description: "Menu do Pluton",
    options: [
      {
        name: "nome",
        description: "Nome do indivíduo",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "metodo",
        description: "Método de pesquisa",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Dorks",
            value: "dorks",
          },
          {
            name: "Portal da Transparência",
            value: "portal",
          },
        ],
        required: true,
      },
      {
        name: "formato",
        description: "Formato dos resultados buscados, se estiver buscando via Portal da Transparência, marque sua opção.",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Tudo",
            value: "tudo",
          },
          {
            name: "Apenas Arquivos",
            value: "arquivos",
          },
          {
            name: "Portal da Transparência",
            value: "portal",
          }
        ],
        required: true,
      },
      {
        name: "and",
        description: "Preencha se você quiser filtrar alguma coisa específica. Ex: CPF, CNPJ, etc.",
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "ip",
    description: "Consultar IP",
    options: [
      {
        name: "ip",
        description: "IP a ser consultado",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "cpf",
    description: "Consultar CPF",
    options: [
      {
        name: "nome",
        description: "Nome a ser consultado",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("WE TRYNA BALL🔥");

    await rest.put(
      Routes.applicationGuildCommands(
        "1199850528264429628",
        "1177368220714410055",
      ),
      { body: commands },
    );

    console.log("WE DEF BALLIN🔥🔥");
  } catch (error) {
    console.log(`we broke ${error}`);
  }
})();
