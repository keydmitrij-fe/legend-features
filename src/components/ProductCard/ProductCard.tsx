import { Product } from "../../types/Comparison"
import "./ProductCard.scss"
import { Button, Typography } from "antd"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"

type ProductCardType = Pick<Product, "name" | "imageUrl" | "sku" | "id"> & {
  selected: boolean
  selectDisabled: boolean
  handleProductDelete: (id: Product["id"]) => void
  handleProductSelect: (id: Product["id"]) => void
}

const { Text } = Typography

const ProductCard: React.FC<ProductCardType> = ({
  imageUrl,
  name,
  sku,
  selected,
  id,
  selectDisabled,
  handleProductDelete,
  handleProductSelect,
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
          <Button
            onClick={() => handleProductDelete(id)}
            className="product-card__button"
            variant="link"
            color="red"
          >
            <ArrowLeftOutlined />
            Удалить
          </Button>
        ) : (
          <Button
            onClick={() => handleProductSelect(id)}
            className="product-card__button"
            variant="link"
            color="green"
            disabled={selectDisabled}
          >
            Добавить
            <ArrowRightOutlined />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
