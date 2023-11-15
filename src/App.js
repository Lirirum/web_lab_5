
import React, { Component,  createContext,useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import ProductDetail from './ProductDetail';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataContext } from './DataContext';
import { ThemeContext } from './ThemeContext';
import DebugWindow from './DebugWindow';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      products: [
        { name: 'Товар 1', isSelected: false },
        { name: 'Товар 2', isSelected: false },
        { name: 'Товар 3', isSelected: false },
      ],
      userData:null,
      history: [],
      data:0
    
    };
  }



  
  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  };

  handleProductSelect = (index) => {
    const products = [...this.state.products];
    products[index].isSelected = !products[index].isSelected;
    this.setState({ products });
  };

  handleIncrement = () => {
    this.setState((prevState) => {
      return { data: prevState.data + 1 };
    }, () => {
      console.log(this.state.data); 
    });
  };



  render() {
    const selectedCount = this.state.products.filter((product) => product.isSelected).length;
    const contextValues = {
      data: this.state.data, 
      handleIncrement:this.handleIncrement ,
    };

    const ministyle = {
      background:"#FAFAFA",
      borderColor:"blue",
      fontSize:"18px",
 
      
     

    }

    return (  
      <ThemeContext.Provider value={ministyle}>
      <DataContext.Provider value={contextValues}>
      <Router>  


      
      <div>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          onLoginClick={this.handleLoginClick}
          onLogoutClick={this.handleLogoutClick}
        />
     
     
      <Routes>
        <Route path="/" element={<Body products={this.state.products} onProductSelect={this.handleProductSelect} />} />
        <Route path="/product/:id" element={<ProductDetail   />} />
      </Routes>
        <DebugWindow />
        <Footer></Footer>
      </div>
    

    </Router>
    </DataContext.Provider>  
    </ThemeContext.Provider>
    );
  }
}


export default App;