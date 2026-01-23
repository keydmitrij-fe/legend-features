import { Product } from "../../types/Comparison"
import "./ProductCard.scss"
import { Button, Typography } from "antd"
type ProductCardType = Pick<Product, "name" | "imageUrl" | "sku">

const { Text } = Typography

const ProductCard: React.FC<ProductCardType> = ({ imageUrl, name, sku }) => {
  return (
    <div className="product-card">
      <div className="product-card__info">
        <img className="product-card__image" src={imageUrl} alt="" />
        <div className="product-card__text">
          <Text className="product-card__name">{name}</Text>
          <Text className="product-card__sku">{sku}</Text>
        </div>
      </div>
      <div>
        <Button className="product-card__button" variant="link" color="blue">
          Добавить ➡ ️
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
