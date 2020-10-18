import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Landing from './pages/landing/Landing';
import OrphanagesMap from './pages/orphanages/OrphanagesMap';
import Orphanage from './pages/orphanages/Orphanage';
import CreateOrphanage from './pages/orphanages/CreateOrphanage';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Landing } />
                <Route exact path="/app" component={ OrphanagesMap } />

                <Route exact path="/orphanages/create" component={ CreateOrphanage } />
                <Route exact path="/orphanages/:id" component={ Orphanage } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;