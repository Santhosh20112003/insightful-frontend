import React, { createContext } from 'react'
import { useState } from 'react';

const NotificationContext  = createContext();

function Notification({children}) {
  const [notification,setNotification] = useState([]);

  return (
	<NotificationContext.Provider value={{setNotification,notification}} >
		{children}
	</NotificationContext.Provider>
  )
}

export default Notification
