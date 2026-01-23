import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"

const ComparisonPage: React.FC = () => {
  return (
    <div className="comparison">
      {productsMock.map((product) => (
        <ProductCard
          key={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          sku={product.sku}
          selected
        />
      ))}
    </div>
  )
}

export default ComparisonPage
