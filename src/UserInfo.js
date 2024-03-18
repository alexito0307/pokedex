import React from 'react'
import { useState } from 'react'

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  return { userInfo, setUserInfo };
};

export default UserInfo