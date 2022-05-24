import React,{ useState } from 'react'
import { Button, Form} from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')
    
    let history = useNavigate()
    let location = useLocation()
     
    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}&page=1`)
        }else{
            history(location.pathname)
        }
    }
  return (
    <Form onSubmit={submitHandler } style={{display:'flex', gap:'0.2rem'}}>
        <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5' style={{borderRadius:'25px',padding:'6px'}}>

        </Form.Control>
        <Button type='submit' variant='outline-success' className='p-2' style={{borderRadius:'25px'}}> 
            Submit
        </Button>
    </Form>
  )
}

export default SearchBox