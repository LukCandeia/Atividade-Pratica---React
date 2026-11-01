import CardProduto from './CardProduto.jsx';

export default function ListaProduto({ products }) {
  if (products.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <section className="product-grid" aria-label="Lista de produtos">
      {products.map((product) => (
        <CardProduto key={product.id} product={product} />
      ))}
    </section>
  );
}
