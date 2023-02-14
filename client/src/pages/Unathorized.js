import { useNavigate } from 'react-router-dom';

export default function Route401(){
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1 className='text-center'>Unauthorized</h1>
            <br/>
            <p className='text-center'>You do not have access to the requested page.</p>
            <div className='text-center'>
                <button className='btn btn-success' onClick={goBack}> Go Back</button>
            </div>
        </section>
    
    )
}