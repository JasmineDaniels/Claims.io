import Beach_Lighthouse from '../video/Beach-Lighthouse.mp4';
import { DefaultPlayer as VideoPlayer } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import '../css/header.css';

const Header = () => {
    const src = Beach_Lighthouse;
    return (
    <div className="container">
        {/* <h1 className="text-center">Header</h1> */}
        <VideoPlayer className='video-player mx-auto' autoPlay loop muted >
            <source src={src} type='video/mp4'/>
        </VideoPlayer>
    </div>
    
)}

export default Header;