import React from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Browse from './Components/Browse';
import Arived from './Components/Arived';
import Clients from './Components/Clients';
import AsideMenu from './Components/AsideMenu';
import Footer from './Components/Footer';
import OFfline from './Components/Offline';
import Splash from './pages/splash'

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

  function handleOfflinestatus() {
    setOfflineStatus(!navigator.onLine)
  }

  React.useEffect(function() {
    (async function() {
      const response = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc',{
        headers: {
          'Content-Type': 'application-json',
          'accept': 'application-json',
          'x-api-key': process.env.REACT_APP_APIKEY
        }
      });
      const {nodes} = await response.json();
      setItems(nodes);

      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

    setTimeout(function(){
      setIsLoading(false);
    }, 1500)

    handleOfflinestatus();
    window.addEventListener('online', handleOfflinestatus);
    window.addEventListener('offline', handleOfflinestatus);

    return function() {
      window.removeEventListener('online', handleOfflinestatus);
      window.removeEventListener('offline', handleOfflinestatus);
    }
  }, [offlineStatus])
  return (
    <>
      {isLoading === true ? <Splash/> : 
      (
      <>
      {offlineStatus && <OFfline />}
      <Header />
      <Hero />
      <Browse />
      <Arived items={items}/>
      <Clients />
      <AsideMenu />
      <Footer />
      </>)}
    </>
  );
}

export default App;
