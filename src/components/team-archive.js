import React from 'react'
import AgentCard from './cards/agent'
import useTeamQuery from '../hooks/use-team-query'

const TeamArchive = () => {

  const team = useTeamQuery()

  return (
    <section className='team-archive'>
      { team?.length > 0 &&
        <div className='team-archive__inner'>
          <div className='team-archive__items'>
            { team?.map((el, i) => <AgentCard key={i} {...el} />) }
          </div>
        </div>
      }
    </section>
  )
}

export default TeamArchive