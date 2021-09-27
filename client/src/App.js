import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Public pages
import Home from './pages/Home/Home';
import NotFound from './pages/404/404';

const App = () => {
  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Satisfy' rel='stylesheet'></link>

      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
