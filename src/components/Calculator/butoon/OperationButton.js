import React from 'react';
import {ACTIONS} from "../Calculator";

export default function OperationButton({dispatch,operation}){
    return <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION,payload: {operation}})} className="calculator__number">{operation}</button>
}
