import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import ProductSearch from './components/ProductSearch.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import { getProducts, getProductById } from './services/productsApi.js';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  useEffect(() => {
    if (selectedId === null) return;
    const controller = new AbortController();

    async function loadDetails() {
      try {
        const data = await getProductById(selectedId, { signal: controller.signal });
        if (!controller.signal.aborted) setSelectedProduct(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setDetailsError(err instanceof TypeError
            ? 'Não foi possível carregar os detalhes. Verifique sua conexão.'
            : err.message);
        }
      } finally {
        if (!controller.signal.aborted) setDetailsLoading(false);
      }
    }

    loadDetails();
    return () => controller.abort();
  }, [selectedId]);

  function viewDetails(id) {
    if (id === selectedId) return;
    setSelectedProduct(null);
    setDetailsError('');
    setDetailsLoading(true);
    setSelectedId(id);
  }

  function closeDetails() {
    setSelectedId(null);
    setSelectedProduct(null);
    setDetailsError('');
    setDetailsLoading(false);
  }

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
          <ProductList products={filteredProducts} onViewDetails={viewDetails} />
        </>
      )}
      {selectedId !== null && (
        <ProductDetails
          product={selectedProduct}
          loading={detailsLoading}
          error={detailsError}
          onClose={closeDetails}
        />
      )}
    </main>
  );
}
