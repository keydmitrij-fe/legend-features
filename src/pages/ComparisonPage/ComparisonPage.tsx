import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"
import { Typography } from "antd"

const { Title } = Typography

const ComparisonPage: React.FC = () => {
  return (
    <div className="comparison">
      <Title className="comparison--title">Сравнение карточек</Title>
      <div className="comparison--items">
        <div className="comparison__items__available">
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
        <div className="comparison__items_selected">
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
    </div>
  )
}

export default ComparisonPage
