import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../Context/MinContext';

function ViewInventries() {
  const { getInventry, inventry,setSavedforCurd,savedforCurd,deleteInventry } = useContext(MainContext);
  const navigate = useNavigate();


  return (
    <div>{savedforCurd.modelName}</div>
  )
}

export default ViewInventries