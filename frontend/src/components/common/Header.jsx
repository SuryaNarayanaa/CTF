import {useEffect,useState} from 'react';
import '../../styles/Header.css';
import MouseTracker from '../ui/MouseTracker';
import io from 'socket.io-client';


const Header = ({team_name, flags = 0,userId}) => {
  const teamName = team_name || "TeamName";
  const [rank,setRank] = useState(0);
  const [flag,setFlag] = useState(0);

  useEffect(()=>{
      const fetchRankDetails = async () =>{
        try {
            const data = await fetch('/back/user/rank',{
              method:'GET',crentials:'include'
            });
            const response = await data.json();
            if(!response.success) throw Error(response.message);
            console.log("Rank",response.data.rank,response.data.flag);
            setRank(response.data.rank);
            setFlag(response.data.flag);
        } catch (error) {
          console.log("Error fetching The event",error);
        }
      }

      fetchRankDetails();

      const socket = io('wss://hidden-x-backend.onrender.com', { transports: ['websocket'], autoConnect: true });
      socket.on('connect', () => {
        console.log('Socket connected');
        
        // Identify the user to the server
        socket.emit('identifyUser', userId);
      });
      socket.on("Userrank",(userR)=>{
               const userPosition = userR;
               setRank(userR?.rank || 0);
               setFlag(userR?.flag || 0);
            })

      return () => { socket.disconnect(); }
  },[])

  return (
    <>
      <div className="header">
        <div className="header-left">
          <img 
            src="/LIGHT_BANNER_TRANSP.png" 
            alt="flag icon" 
            className="flag-icon" 
            style={{ width: '160px', height: '50px' }} 
            onClick={() => window.location.href = '/'} 
          /> 
          <img 
            src="/chess_pattern_vertical.png" 
            alt="split icon"  
            style={{ width: '10px', height: '60px', marginRight:'20px'}} 
          /> 
          <h3><b>{teamName}</b></h3>
          <h5 className='space'>'s space</h5>
        </div>    

        <div className="header-center">
          <div className="title-container">
            <img 
              src="/TIMER.gif" 
              alt="left logo" 
              className="flag-icon"  
              style={{ width: '60px', height: '50px' }} 
            />
            <h1 className="title font-[''Press_Start_2P'']">BinaryXForge!</h1>
            <img 
              src="/TIMER.gif" 
              alt="right logo" 
              className="flag-icon"  
              style={{ width: '60px', height: '50px' }} 
            />
          </div>
        </div>

        <div className="header-right">          
          <MouseTracker />
          <div className="points-container" style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
            <h5>Flags: {flag}</h5>
            <h5>Rank: {rank === 0 ? "-" : rank}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header