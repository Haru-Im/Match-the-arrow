import { createContext, FC, ReactNode, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { $userData } from '../../state';


export interface IAuthContext {
    user : {
        userName:string;
        profileImageUrl : string;
    }
    
}

export const AuthContext = createContext<IAuthContext | null>(null);

type IAuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const user = useRecoilValue($userData)

    console.log(user)
  return <AuthContext.Provider value={{
    user
  }}>{children}</AuthContext.Provider>;
};



export const useAuth = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('Provider Required');
    }
    return context;
  };
  
