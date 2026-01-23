import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"

const ComparisonPage: React.FC = () => {
  console.log(productsMock)
  const name = productsMock[0].name
  const img = productsMock[0].imageUrl
  const sku = productsMock[0].sku

  return (
    <div className="comparison">
      <ProductCard imageUrl={img} name={name} sku={sku} />
    </div>
  )
}

export default ComparisonPage
