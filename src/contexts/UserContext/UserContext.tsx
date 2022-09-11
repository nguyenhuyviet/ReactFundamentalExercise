import React from 'react'

interface IUserContext {
    token: string,
    id: string,
    name: string,
    createdAt: string
    setUser?: (value: IUserContext) => void;
  }

const UserContext = React.createContext<IUserContext>({
    token: '',
    id: '',
    name: '',
    createdAt: ''
  });

export default UserContext