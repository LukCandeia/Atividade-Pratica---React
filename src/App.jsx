import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import ProductSearch from './components/ProductSearch.jsx';
import ListaProduto from './components/ListaProduto.jsx';
import { getProducts } from './services/products.js';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function carregarProdutos() {
      try {
        const data = await getProducts({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    carregarProdutos();

    // Cancela a consulta se o componente sair da tela.
    return () => controller.abort();
  }, [attempt]);

  function tentarNovamente() {
    setError('');
    setLoading(true);
    setAttempt((current) => current + 1);
  }

  const filteredProducts = products.filter((product) =>
    product.nome.toLocaleLowerCase('pt-BR').includes(
      search.trim().toLocaleLowerCase('pt-BR')
    )
  );

  return (
    <main className="container">
      <Header />
      <ProductSearch value={search} onSearchChange={setSearch} />
      {loading && <p role="status">Carregando produtos...</p>}
      {error && (
        <div>
          <p role="alert">{error}</p>
          <button type="button" onClick={tentarNovamente}>
            Tentar novamente
          </button>
        </div>
      )}
      {!loading && !error && (
        <>
          <p role="status">{filteredProducts.length} produto(s) encontrado(s).</p>
          <ListaProduto products={filteredProducts} />
        </>
      )}
    </main>
  );
}
