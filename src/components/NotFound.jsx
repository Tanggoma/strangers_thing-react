import React from 'react'
import { Link } from 'react-router-dom'
import { TbError404 } from 'react-icons/tb'
import { MdOutlineError } from 'react-icons/Md'

const NotFound = () => {
    return (
        <div className='notfound-body'>
            <div className='notfound-container'>
                <MdOutlineError id='error' />  <TbError404 id='error404' />
                <h2 className='h2-notfound'> The page you were looking for doesn't exist </h2>
                <h3 className='h3-notfound'> Click to redirect to <Link to='/home' id='link-notfound'> home </Link> page and re-login </h3>
            </div>
        </div>

    )
}

export default NotFound