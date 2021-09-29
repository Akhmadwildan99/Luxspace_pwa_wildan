import React from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Browse from './Components/Browse';
import Arived from './Components/Arived';
import Clients from './Components/Clients';
import AsideMenu from './Components/AsideMenu';
import Footer from './Components/Footer';

function App() {
  const [items, setItems] = React.useState([]);
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
      setItems(nodes)
      console.log(nodes)
    })();
  }, [])
  return (
    <>
      <Header />
      <Hero />
      <Browse />
      <Arived items={items}/>
      <Clients />
      <AsideMenu />
      <Footer />
    </>
  );
}

export default App;
