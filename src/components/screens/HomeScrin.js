import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../Product'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../../actions/productActions'
import Loader  from '../Loader'
import Message  from '../Message'
import Paginate from '../Paginate'
import ProductCarousel from '../ProductCarousel'

function HomeScrin() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList

  const location = useLocation()

  let keyword = location.search
  
  useEffect(() => {
      dispatch(listProducts(keyword))
  }, [dispatch,keyword])

  
  return (
    <div>
        {!keyword && <ProductCarousel /> }
        
        <h1>Lates Products</h1>
        {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                :
                <div> 
                <Row>
                    {products.map(product =>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product = {product}/>
                    </Col>
            ))}
                </Row>
                <Paginate page={page} pages={pages} keyword = {keyword} />
                </div>
      }
        
    </div>
  )
}

export default HomeScrin