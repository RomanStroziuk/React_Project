import "./App.css";
import Router from "./router/Router";
import { NotificationProvider } from "../src/common/components/Providers/NotificationProvider"; 

function App() {
  return (
    <NotificationProvider> {/* Обгортаємо додаток в провайдер */}
      <Router />
    </NotificationProvider>
  );
}

export default App;
