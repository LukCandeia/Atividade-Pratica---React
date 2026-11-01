const PRODUCTS_URL = 'https://fakestoreapi.com/products';

function isProduct(product) {
  return product && product.id != null &&
    typeof product.title === 'string' &&
    typeof product.category === 'string' &&
    typeof product.price === 'number' && Number.isFinite(product.price);
}

function adaptProduct(product) {
  return {
    id: product.id,
    nome: product.title,
    preco: product.price,
    categoria: product.category,
    descricao: product.description ?? '',
  };
}

export async function getProducts({ signal } = {}) {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Erro ao consultar os produtos (HTTP ${response.status}).`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.some((product) => !isProduct(product))) {
    throw new Error('A API retornou produtos em um formato inesperado.');
  }

  // Adapta os campos da API aos nomes utilizados pelos componentes.
  return data.map(adaptProduct);
}

export async function getProductById(id, { signal } = {}) {
  const response = await fetch(`${PRODUCTS_URL}/${encodeURIComponent(id)}`, { signal });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar os detalhes (HTTP ${response.status}).`);
  }

  const data = await response.json();
  if (!isProduct(data) || typeof data.description !== 'string') {
    throw new Error('A API retornou detalhes em um formato inesperado.');
  }

  return adaptProduct(data);
}
