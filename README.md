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
git clone https://github.com/LukCandeia/Atividade-Pratica---React.git
cd Atividade-Pratica---React
npm install
npm run dev
```

Abra o endereço informado pelo Vite no terminal. No PowerShell, caso a execução de scripts esteja bloqueada, utilize `npm.cmd` no lugar de `npm`.

## Funcionalidades

- Listagem de produtos com nome, categoria e preço.
- Pesquisa por nome, sem diferenciar letras maiúsculas e minúsculas.
- Contagem de resultados e mensagem para busca sem resultados.
- Indicadores de carregamento e erro, com opção de tentar novamente.
- Consulta de detalhes por ID, com abertura, troca de produto e fechamento do painel.

## Integração com a API

O projeto utiliza `GET https://fakestoreapi.com/products`, conforme o [repositório disponibilizado pelo professor](https://github.com/rommelcarneiro/fake-store-api). É necessário acesso à internet; não é preciso executar a API localmente.

A consulta ocorre ao abrir o catálogo. A pesquisa filtra os produtos recebidos no navegador, sem enviar uma requisição a cada letra digitada.

O serviço adapta os campos `title`, `price` e `category` para `nome`, `preco` e `categoria`. Os nomes dos produtos não são traduzidos. Os preços usam a formatação BRL existente no projeto, sem conversão cambial.

### Configuração

O endereço da API está definido na constante `PRODUCTS_URL` em `src/services/productsApi.js`.
Para utilizar outro servidor compatível, altere essa constante para a URL completa da rota de produtos.
A resposta deve ser uma lista JSON com os campos `id`, `title`, `price` e `category`.
Na configuração atual, não é necessário criar arquivo `.env` nem informar chave de API.
Os detalhes são consultados por `GET https://fakestoreapi.com/products/:id`, com o campo adicional `description`.

## Organização

- `src/App.jsx`: estados da lista e do produto selecionado, carregamento, erros e filtro por nome.
- `src/services/productsApi.js`: consultas da lista e dos detalhes, validação e adaptação da resposta.
- `src/components/`: cabeçalho, campo de pesquisa, lista, cards e painel de detalhes.
- `src/data/products.js`: dados de exemplo, sem uso na consulta atual.
- `src/App.css`: estilos do catálogo.

## Árvore de componentes

```text
StrictMode
└── App
    ├── Header
    ├── ProductSearch
    ├── ProductList
    │   └── ProductCard [um por produto]
    └── ProductDetails [quando há um produto selecionado]
```

`App` também exibe mensagens de carregamento, erro e quantidade de resultados.
A lista é exibida quando a consulta termina com sucesso.
`ProductDetails` mostra carregamento, erro ou os dados do produto selecionado.

## Fluxo de dados

1. `App` consulta a API ao entrar na tela e guarda os produtos recebidos em estado.
2. O serviço converte os campos da API para o formato utilizado pelos componentes.
3. `App` passa o texto da busca e a função de atualização para `ProductSearch` por props.
4. Ao digitar, `ProductSearch` chama `onSearchChange`, atualizando a busca em `App`.
5. `App` filtra os produtos pelo nome e passa o resultado e a função de seleção para `ProductList`.
6. `ProductList` repassa cada produto e o callback `onViewDetails` para `ProductCard`.
7. Ao clicar em Ver detalhes, `ProductCard` envia o ID a `App`, que guarda a seleção e consulta a API com `useEffect`.
8. `App` passa produto, carregamento, erro e callback de fechamento para `ProductDetails`; fechar limpa a seleção e oculta o painel.

## Verificação

```sh
npm run lint
npm run build
```

O build gera a versão de produção em `dist/`. Dependências e arquivos gerados não são versionados.
