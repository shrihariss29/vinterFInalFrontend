import React, { useEffect, useState } from 'react'
import axios from '../axios';
import './Triquizzard.css'
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import Eight_Member_Team from '../components/Eight_Member_Event';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';

function TurfFootball() {
  const [{ schoolName, activeEvent, schoolId,activeEventId }, dispatch] = useStateValue();
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [eventId, setEventId] = useState();

  useEffect(() => {
    axios
      .post(`/vinterbash/events`, { schoolName, activeEvent })
      .then((response) => {
        console.log('InsideTriquizzard-->', response.data);
        setRegisteredTeams(response.data.teams);
        setEventId(response.data.eventId);
      })
      .catch((error) => {
        console.log('Error fetching teams:', error);
      });
  }, [registeredTeams]);

  return (
    schoolName?
    <AnimatedPage>
    <div className='ThreePEvent'>
  {Array.from({ length: 1 - registeredTeams.length }).map((_, i) => (
    <Eight_Member_Team
      key={`new-team-${i + 1}`}
      eventId={activeEventId}
      eventName={activeEvent}
      registeredTeams={registeredTeams}
      schoolId={schoolId}
      teamIndex={registeredTeams.length + i + 1}
      minMember={6}
    />
  ))}
  
  {registeredTeams.map((team, index) => (
    <RegisteredTeam
      key={team.teamId}
      team={team}
      eventId={activeEventId}
      schoolId={schoolId}
      teamIndex={index + 1}
      maxMember={8}
    />
  ))}
</div>
</AnimatedPage>
:<Navigate to={'/signIn'} replace={true}/>

  );
}

export default TurfFootball;
