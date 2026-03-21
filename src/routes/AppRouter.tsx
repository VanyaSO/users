import {BrowserRouter, Route, Routes} from "react-router";
import {pagesConfig} from "@/routes/pagesConfig.ts";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {Object.values(pagesConfig).map(({path, component: Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}
            </Routes>
        </BrowserRouter>
    )
};


