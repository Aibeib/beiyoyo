import { message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import { createContext, useContext, type ReactNode } from 'react'

interface ContextType {
  messageApi: MessageInstance
}
// type ContextType = {

//   state: ContextState,
//   setState: Dispatch<SetStateAction<ContextState>>
// }


const AppContext = createContext<ContextType | undefined>(undefined)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <AppContext.Provider value={{ messageApi }}>
      {children}
      {contextHolder}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext 必须在 AppProvider 中使用');
  return ctx
}