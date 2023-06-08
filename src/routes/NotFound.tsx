import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div className='d-flex vh-100 flex-column justify-content-center align-items-center'>
        <h1 className='text-light'>Finns inget här...</h1>
        <p><Link to={"/"} replace>Ta mig tilbaka till hemsidan!</Link></p>
    </div>
  )
}

export default Notfound