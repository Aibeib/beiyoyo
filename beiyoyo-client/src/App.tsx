import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./router.config";
import { Suspense } from "react";
import { ConfigProvider, theme } from "antd";
import { observer } from "mobx-react";
import { UIStore } from "./stores";
import { Them } from "@/stores/type";

function App() {
  const element = useRoutes(routes);
  const { them } = UIStore

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: them === Them.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm // 切换主题
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {element}
        </Suspense>
      </ConfigProvider>
    </>
  );
}

export default observer(App);
