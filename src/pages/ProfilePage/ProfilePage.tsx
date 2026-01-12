import "./ProfilePage.scss"
import { Typography, Button } from "antd"
import { useAuth } from "../../hooks/useAuth"

const { Title, Text } = Typography

const ProfilePage = () => {
  const { userProfile, exit } = useAuth()

  const handlelogout = () => {
    try {
      exit()
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  return (
    <div className="profile">
      <Title level={3}>Profile Page</Title>
      <div className="profile__wrapper">
        <div>
          <Text className="profile__label">Username: </Text>
          <Text>{userProfile?.username}</Text>
        </div>
        <div>
          <Text className="profile__label">Email: </Text>
          <Text>{userProfile?.email}</Text>
        </div>
        <div>
          <Text className="profile__label">Tel: </Text>
          <Text>{userProfile?.phoneNumber}</Text>
        </div>
      </div>
      <Button type="primary" htmlType="button" onClick={handlelogout}>
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage
