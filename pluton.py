from googlesearch import search
import requests

import sys
import json

query = json.loads(sys.argv[1])

if query['command'] == "pluton":
  if query['metodo'] == "portal":
    if query['formato'] != "portal":
      print("Erro: o formato não é adequado para este método de pesquisa.")
  elif query['metodo'] != "portal":
    if query['formato'] == "portal":
      print("Erro: o formato não é adequado para este método de pesquisa.")

if 'and' in query and query['and']:
  if query['formato'] == "tudo":
    query['nome'] = "\"" + query['nome'] + "\"" + "AND" + "\"" + query['and'] + "\""
  elif query['formato'] == "arquivos":
    query['nome'] = "\"" + query['nome'] + "\"" + "AND" + "\"" + query['and'] + "\"" + "+filetype:html+OR+filetype:pdf+OR+filetype:docx+OR+filetype:txt+OR+filetype:doc"

if query['command'] == "pluton":
  if query['metodo'] == "dorks":
    for i, url in enumerate(search(query['nome'], num_results=8), start=1):
      print("[Resultado " + str(i) + "](" + url + ")")
  elif query['metodo'] == "portal":
    print("[Clique aqui para ver os resultados da pesquisa](https://www.portaltransparencia.gov.br/busca?termo=" + query['nome'] + "&pessoaFisica=true&pessoaJuridica=true&socios=true)")
elif query['command'] == "ip":
  response = requests.get("https://nordvpn.com/wp-admin/admin-ajax.php?action=get_user_info_data&ip=" + query['ip'])
  ipdata = response.json()
  print(ipdata)
elif query['command'] == "cpf":
  query['nome'] = "\"" + query['nome'] + "\"" + "AND" + "\"" + "CPF"
  for i, url in enumerate(search(query['nome'], num_results=7), start=1):
    print("[Resultado " + str(i) + "](" + url + ")")