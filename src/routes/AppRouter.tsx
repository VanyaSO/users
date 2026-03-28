import {BrowserRouter, Route, Routes} from "react-router";
import {pagesConfig} from "@routes/pagesConfig.ts";
import {Layout} from "@components/Layout/Layout.tsx";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                {Object.values(pagesConfig).map(({path, component: Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
};


