import { useState } from 'react';
import Header from './components/Header.jsx';
import ProductSearch from './components/ProductSearch.jsx';
import ListaProduto from './components/ListaProduto.jsx';
import { ProdutosExemplo } from './data/products.js';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('');

  const filteredProducts = ProdutosExemplo.filter((product) =>
    product.nome.toLocaleLowerCase('pt-BR').includes(
      search.trim().toLocaleLowerCase('pt-BR')
    )
  );

  return (
    <main className="container">
      <Header />
      <ProductSearch value={search} onSearchChange={setSearch} />
      <p role="status">{filteredProducts.length} produto(s) encontrado(s).</p>
      <ListaProduto products={filteredProducts} />
    </main>
  );
}
