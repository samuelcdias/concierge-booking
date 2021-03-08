import React, { createContext, ReactNode, useState } from "react";
import { enumParams, ParamsType } from "../services/initialStates";
import { FormProvider } from "./FormContext";
import ListProvider from "./ListContext";

interface RoutesContextProps {
    params: ParamsType,
    routeKey: enumParams,
    setParams: any,
    setRouteKey:any,
}

export const RoutesContext = createContext({} as RoutesContextProps)


export function RoutesProvider({children}: {children: ReactNode}) {
    const [routeKey, setRouteKey] = useState(enumParams.CUSTOMERS)
    const [params, setParams] = useState<ParamsType>({})

    return (
        <div>
        <RoutesContext.Provider value={{
            params,
            routeKey,
            setParams,
            setRouteKey,
        }}>
            <ListProvider>
            <FormProvider >

                { children }
                
            </FormProvider>
            </ListProvider>
        </RoutesContext.Provider>
        </div>
        )
}
