import { createContext, ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import Notification from "../components/notifications";
import { enumParams, ParamsType } from "../services/initialStates";
import { FormProvider } from "./FormContext";
import ListProvider from "./ListContext";

interface RoutesContextProps {
    activePage: number,
    isOutdated: boolean,
    params: ParamsType,
    query: string | null,
    routeKey: enumParams,
    setActivePage: any,
    setIsOutdated: any,
    setParams: any,
    setRouteKey: any,
}

export const RoutesContext = createContext({} as RoutesContextProps)


export function RoutesProvider({ children }: { children: ReactNode }) {
    const [routeKey, setRouteKey] = useState(enumParams.CUSTOMERS)
    const [params, setParams] = useState<ParamsType>({})
    const [isOutdated, setIsOutdated] = useState<boolean>(true)

    const query = useQuery().get("page")
    const [activePage, setActivePage] = useState<number>(Number(query) === 0 ? 1 : Number(query))

    return (
        <div>
            <RoutesContext.Provider value={{
                activePage,
                isOutdated,
                params,
                query,
                routeKey,
                setActivePage,
                setIsOutdated,
                setParams,
                setRouteKey,
            }}>
                <ListProvider>
                    <FormProvider >
                        <Notification />

                        {children}

                    </FormProvider>
                </ListProvider>
            </RoutesContext.Provider>
        </div>
    )
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}