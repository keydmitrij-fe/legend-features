import { Pagination } from "antd"
import "./UsersPagination.scss"

interface UsersPaginationProps {
  current?: number
  pageSize?: number
  total: number
  onChange: (page: number, pageSize: number) => void
}

const UsersPagination = ({
  current,
  pageSize,
  total,
  onChange,
}: UsersPaginationProps) => {
  return (
    <div className="users-pagination">
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        pageSizeOptions={["20", "50", "100"]}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} entries`
        }
      />
    </div>
  )
}

export default UsersPagination
