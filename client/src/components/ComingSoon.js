import lighthouse from '../images/lighthouse.png'
const ComingSoonTemplate = () => {
    return (
        <div className="App-header">
            <h1>Coming Soon!</h1>

            <br></br>
            <br></br>
            <p style={{color: "#ffbd00"}}>Welcome to Claims.io</p>

            <p className='text-center'>This page is currently in development.<br/> Please come back and visit us soon for more developments</p>
            <img src={lighthouse} alt="logo" />
        </div>
    )
}

export default ComingSoonTemplate;