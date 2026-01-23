import { Product } from "../../types/Comparison"
import "./ProductCard.scss"
import { Button, Typography } from "antd"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"

type ProductCardType = Pick<Product, "name" | "imageUrl" | "sku"> & {
  selected: boolean
}

const { Text } = Typography

const ProductCard: React.FC<ProductCardType> = ({
  imageUrl,
  name,
  sku,
  selected,
}) => {
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
        {selected ? (
          <Button className="product-card__button" variant="link" color="red">
            <ArrowLeftOutlined />
            Удалить
          </Button>
        ) : (
          <Button className="product-card__button" variant="link" color="green">
            Добавить
            <ArrowRightOutlined />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
