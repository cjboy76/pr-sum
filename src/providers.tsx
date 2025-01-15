import { PropsWithChildren } from "react";
import { ConfigProvider, type ThemeConfig } from 'antd';
import { Provider as UrqlProvider } from "urql";
import { urqlClient } from "./api/urqlClient";

const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#2e2e2e',
        colorBgContainer: '#fafafa',
    },
}

export function Providers({ children }: PropsWithChildren) {
    return (
        <ConfigProvider theme={themeConfig}>
            <UrqlProvider value={urqlClient}>
                {children}
            </UrqlProvider>
        </ConfigProvider>
    );
}