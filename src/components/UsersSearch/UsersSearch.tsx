import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import "./UsersSearch.scss"

interface UsersSearchProps {
  onSearchChange: (searchValue: string) => void
  currentSearch?: string
}

const UsersSearch = ({ onSearchChange, currentSearch }: UsersSearchProps) => {
  return (
    <div className="users-search">
      <Input
        placeholder="Search by name or email..."
        prefix={<SearchOutlined />}
        value={currentSearch}
        onChange={(e) => onSearchChange(e.target.value)}
        allowClear
      />
    </div>
  )
}

export default UsersSearch
