import { Drawer } from 'antd';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface DrawerContextType {
    isOpen: boolean;
    openDrawer: (content: ReactNode) => void;
    closeDrawer: () => void;
    content: ReactNode | null;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const  useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

const useDrawerState = (): DrawerContextType => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openDrawer = (drawerContent: ReactNode) => {
        setContent(drawerContent);
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setContent(null);
        setIsOpen(false);
    };

    return {
        content,
        isOpen,
        openDrawer,
        closeDrawer,
    };
};

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
    const { isOpen, openDrawer, closeDrawer, content } = useDrawerState();

    return (
        <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, content }}>
            {children}
            <Drawer
                open={isOpen}
                onClose={closeDrawer}
                width={400}
                closable={false}
            >
                {content}
            </Drawer>
        </DrawerContext.Provider>
    );
};

// Export the useDrawer hook for consumers
export default useDrawer;