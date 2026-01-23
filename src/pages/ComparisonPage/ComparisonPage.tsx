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
      {/* <ProductCard imageUrl={img} name={name} sku={sku} selected={true} /> */}
    </div>
  )
}

export default ComparisonPage
