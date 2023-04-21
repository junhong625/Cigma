import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaUserPlus } from 'react-icons/fa';


function ProjectList() {
  const context = useOutletContext();

  return (
    <div>
      {context[1]}
      <div onClick={context[0]}>
        <FaUserPlus />
      </div>
    </div>
  )
}

export default ProjectList