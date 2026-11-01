# Catálogo de produtos

Atividade prática de React com catálogo de produtos, pesquisa por nome e integração com uma API REST.

## Tecnologias

- React
- Vite
- JavaScript
- CSS

## Executar o projeto

Requer Node.js e npm instalados.

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite no terminal. No PowerShell, caso a execução de scripts esteja bloqueada, utilize `npm.cmd` no lugar de `npm`.

## Funcionalidades

- Listagem de produtos com nome, categoria e preço.
- Pesquisa por nome, sem diferenciar letras maiúsculas e minúsculas.
- Contagem de resultados e mensagem para busca sem resultados.
- Indicadores de carregamento e erro, com opção de tentar novamente.

## Integração com a API

O projeto utiliza `GET https://fakestoreapi.com/products`, conforme o [repositório disponibilizado pelo professor](https://github.com/rommelcarneiro/fake-store-api). É necessário acesso à internet; não é preciso executar a API localmente.

A consulta ocorre ao abrir o catálogo. A pesquisa filtra os produtos recebidos no navegador, sem enviar uma requisição a cada letra digitada.

O serviço adapta os campos `title`, `price` e `category` para `nome`, `preco` e `categoria`. Os nomes dos produtos não são traduzidos. Os preços usam a formatação BRL existente no projeto, sem conversão cambial.

## Organização

- `src/App.jsx`: estado dos produtos, carregamento, erros e filtro por nome.
- `src/services/products.js`: requisição HTTP, validação e adaptação da resposta.
- `src/components/`: cabeçalho, campo de pesquisa, lista e cards.
- `src/data/products.js`: dados de exemplo, sem uso na consulta atual.
- `src/App.css`: estilos do catálogo.

## Verificação

```sh
npm run lint
npm run build
```

O build gera a versão de produção em `dist/`. Dependências e arquivos gerados não são versionados.
