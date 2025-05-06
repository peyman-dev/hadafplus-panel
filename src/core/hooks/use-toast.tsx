import { message } from 'antd';
import React, { createContext, ReactNode, useContext } from 'react';
import { MessageInstance } from 'antd/es/message/interface';

const ToastContext = createContext<MessageInstance | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [messageApi, renderMessage] = message.useMessage({duration: 2.5});
  return (
    <ToastContext.Provider value={messageApi}>
      {renderMessage}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): MessageInstance => {
  const context = useContext(ToastContext);
  if (!context) {
    console.error('useToast: Context is null.');
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};