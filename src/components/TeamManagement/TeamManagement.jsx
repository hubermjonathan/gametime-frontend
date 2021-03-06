import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import { useSelector, useDispatch } from 'react-redux';
import TeamManagementContent from './TeamManagementContent';
import BankInfo from './BankInfo';

const TeamManagement = () => {
  function selector(store) {
    return {
      teams: store.user.teams,
      selected: store.status.selected_team,
      user: store.user.id,
    };
  }

  const state = useSelector(selector);
  const dispatch = useDispatch();

  function dispatchTeamEdit(teamName) {
    dispatch({
      type: 'SET_TEAMS',
      payload: state.teams.map((t) => {
        if (t.team_id === state.teams[state.selected].team_id) {
          t.name = teamName;
        }
        return t;
      }),
    });
  }

  return (
    <div className="fill-vert">
      <TeamManagementContent
        team_id={state.teams[state.selected].team_id}
        playerId={state.user}
        dispatchTeamEdit={dispatchTeamEdit}
      />
      <BankInfo 
        team_id={state.teams[state.selected].team_id}
      />
    </div>
  );
};

export default TeamManagement;
