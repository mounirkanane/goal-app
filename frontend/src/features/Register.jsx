import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

  const {name, email, password, confirmPassword} = formData; 

  const onChange = (e) => {
    setFormData((prevState) =>({
        ...prevState,
        [e.target.name] : e.target.value
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser style={{marginRight: 10}}/>
                Register
            </h1>
            <p>Create an account</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input class='form-control' type='text' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}  />
                </div>
                <div className='form-group'>
                    <input class='form-control' type='email' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}  />
                </div>
                <div className='form-group'>
                    <input class='form-control' type='password' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}  />
                </div>
                <div className='form-group'>
                    <input class='form-control' type='password' id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='Confirm your password' onChange={onChange}  />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register
