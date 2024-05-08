import { ReactElement, ReactNode, useEffect } from 'react';
import './App.css';
import {Sidebar} from './public/components/sidebar/Sidebar';
import GlobalStore from './store/GlobalState';
import LoadingIndicator from './public/components/loader/Loader';
import { observer } from 'mobx-react';
import { Login } from './components/login/Login';
import { Divider, Typography } from '@mui/material';

interface AppProps {
  children: ReactNode | ReactElement
}


const App: React.FC<AppProps> = ({children}) => {
  useEffect(() => {
    GlobalStore.getEmployees();
    GlobalStore.getAllRoles();
  }, []);


  const LoadingComponent = observer(() => {
    return GlobalStore.loading ? <LoadingIndicator /> : null;
  });

  return (
    
    <div className="app-container" style={{paddingLeft: '240px'}}> {/* Container for the entire app */}
     {/* <Login/> */}
      <Sidebar />
      <LoadingComponent /> 
      <div className="dashboard-container" style={{ width: '100%'}}> 
        {children}
      </div>
    </div>
  );
}

export default App


