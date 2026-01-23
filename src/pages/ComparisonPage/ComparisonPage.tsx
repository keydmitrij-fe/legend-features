import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"

const ComparisonPage: React.FC = () => {
  return (
    <div className="comparison">
      <div className="comparison__available">
        {productsMock.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            sku={product.sku}
            selected={false}
          />
        ))}
      </div>
      <div className="comparison__selected">
        {productsMock.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            sku={product.sku}
            selected={true}
          />
        ))}
      </div>
    </div>
  )
}

export default ComparisonPage
