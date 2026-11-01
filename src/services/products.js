const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export async function getProducts({ signal } = {}) {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Erro ao consultar os produtos (HTTP ${response.status}).`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.some((product) =>
    !product || product.id == null ||
    typeof product.title !== 'string' ||
    typeof product.category !== 'string' ||
    typeof product.price !== 'number' || !Number.isFinite(product.price)
  )) {
    throw new Error('A API retornou produtos em um formato inesperado.');
  }

  // Adapta os campos da API aos nomes utilizados pelos componentes.
  return data.map((product) => ({
    id: product.id,
    nome: product.title,
    preco: product.price,
    categoria: product.category,
  }));
}
