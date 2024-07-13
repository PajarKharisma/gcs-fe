// useSocket.js

import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
};

export default useSocket;
