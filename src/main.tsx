import {createRoot} from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css"
import {AppRouter} from "@/routes/AppRouter.tsx";
import {Provider} from "react-redux";
import store from "@/store";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
