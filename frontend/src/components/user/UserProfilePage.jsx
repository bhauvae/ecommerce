import React from "react";
import UserInfo from "./UserInfo";
import OrderHistoryItemContainer from "./OrderHistoryItemContainer";
import api from "../../utils/api";

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    api
      .get("user_info")
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5">
      <UserInfo userInfo={userInfo} />
      <OrderHistoryItemContainer />
    </div>
  );
};

export default UserProfilePage;
