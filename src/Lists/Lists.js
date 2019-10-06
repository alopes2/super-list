import React from 'react';
import ListsList from './ListsList/ListsList';
import { Switch, Route, withRouter } from 'react-router-dom';
import ListDetails from './ListDetails/ListDetails';

const Lists = props => {
    return (<Switch>
        <Route exact path="/" component={ListsList} />
        <Route path={'/:id'} component={ListDetails} />
    </Switch>);
};

export default withRouter(Lists);