import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"
import { Typography, Input } from "antd"

const { Title, Text } = Typography

const ComparisonPage: React.FC = () => {
  return (
    <div className="comparison">
      <div className="comparison__top-items">
        <div className="comparison__top-items__info">
          <Title className="comparison--title">Сравнение карточек</Title>
          <Text className="comparison--text">
            Чтобы сравнить карточки, выберите от 2 до 5 карточек любых
            продавцов, нажав на кнопку "Добавить" - карточки обьединятся в
            группу для сравнения
          </Text>
        </div>
        <div className="comparison__top-items__controls"></div>
      </div>
      <div className="comparison--items">
        <div className="comparison__items__available">
          <Input placeholder="Введите артикул товара" size="large" />
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
        <div className="comparison__items__selected">
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
