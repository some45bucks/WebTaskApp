import { useContext, useEffect, useState } from 'react';
import { async } from 'rxjs';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';
import { home } from './_home';


export const Project = ({ project, myOnClick, isSelected}) => {
  const api = useContext(ApiContext); 

  return (
    <div className={`flex-1 border-2 rounded p-2 m-2 bg-${(isSelected) ? 'red':'blue'}-500`} onClick={()=> myOnClick(project)}>
      <label>Project Name: {project.name}
      <div>Project id: {project.id}</div>
      </label>
    </div>
  );
};
