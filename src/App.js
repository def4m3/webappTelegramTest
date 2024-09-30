import './App.css'
import {useEffect} from "react";
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
const tg = window.Telegram.WebApp

function App() {

  useEffect(() => {
    tg.ready()
  }, [])


  return (
    <div className="App">
      <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/list" element={<ProductList />} />
            <Route path="*" element={<Form />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
