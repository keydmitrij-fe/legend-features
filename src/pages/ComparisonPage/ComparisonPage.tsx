import { productsMock } from "../../mocks/comparison"

const ComparisonPage: React.FC = () => {
  console.log(productsMock)
  return (
    <>
      <ul>
        {productsMock.map((item) => (
          <li>
            <p>{item.name}</p>
            <image>{item.imageUrl}</image>
            <p>{item.sku}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ComparisonPage
