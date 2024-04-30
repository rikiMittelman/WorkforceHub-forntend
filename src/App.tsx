import { ReactElement, ReactNode, useEffect } from 'react';
import './App.css';
import {Header} from './components/dashboard/header';
import GlobalStore from './store/GlobalState';
import LoadingIndicator from './components/dashboard/Loader';
import { observer } from 'mobx-react';

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
    
    <div className="app-container"> {/* Container for the entire app */}
      <Header />
      <LoadingComponent /> 
      <div className="dashboard-container"> 
        {children}
      </div>
    </div>
  );
}

export default App


