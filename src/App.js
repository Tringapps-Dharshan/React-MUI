import './App.css';
import DisplayProductDetails from './Component/DisplayProductDetails';
import { Container, Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
function App() {
  const [data,setData]=useState([]);
  const [productId,setProductId]=useState(0);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
useEffect(()=>{
  localStorage.setItem('products',JSON.stringify(data));
})

  const handleProductName = (event) => {
    setProductName(event.target.value)
  }
  const handleProductPrice = (event) => {
    setProductPrice(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    let productDetails={
      'productId': productId,
      'productName': productName,
      'productPrice': productPrice
    };
    setData([...data,productDetails]);
    setProductId(productId+1);
    setProductName('');
    setProductPrice(''); 
  }
  return (
    <div>
      <div>
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: 'lightblue', height: '60vh', marginTop: '50px', width: '30vw' }}>
            <form onSubmit={handleSubmit} autoComplete="off">
            <h1 className='header'>DHS Store</h1>
              <TextField
                label="Product name"
                variant="outlined"
                value={productName}
                onChange={(e) => (handleProductName(e))}
                required
              />
              <TextField
                label="Product price"
                variant="outlined"
                value={productPrice}
                onChange={(e) => (handleProductPrice(e))}
                required
              />
              <Button variant="contained" type='submit'>Add product</Button>
            </form>
          </Box>
          </Container>
      </div>
      <div className='products'>
        <DisplayProductDetails data={data} setData={setData} setProductName={setProductName} setProductPrice={setProductPrice}/>
      </div>
    </div>
  );
}

export default App;
