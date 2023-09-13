
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import MainContainer from './components/MainContainer';
import SearchVideo from './components/SearchVideo';
import Error from './components/Error';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './utils/appStore';


const approuter = createBrowserRouter([{
  path : '/',
  element : <Body/>,
  children : [
    {
   path : '/',
   element : <MainContainer/>,
   },
  {
   path:'search',
   element : <SearchVideo/>
   },
  
  ],
  errorElement : <Error/>,
},
])

function App() {
  return (
    <>
    <Provider store={store}>
    <Header/>
    <RouterProvider router={approuter}/>
    </Provider>
    </>
  );
}

export default App;
