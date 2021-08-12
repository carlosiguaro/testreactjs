import { React } from 'react'
import { Switch, Route } from 'react-router-dom'
import Router from './Router'
import { Route as RoutesList } from '../../routes/routes';
import NotFound from '../HttpErrorHanddling/404'

const Routes = () => {
    return (
        <div>
            <Switch>
                {RoutesList.get.map((route, key) => {
                    return (
                        <Router
                            key={key}
                            path={route.path}
                            component={route.component}
                            middlewares={route.middlewares}
                            exact
                        />
                    )
                })}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
       </div> 
    )
}

export default Routes;
