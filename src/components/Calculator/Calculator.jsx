import React, {useReducer} from 'react';
import DigitButton from "./butoon/button";
import OperationButton from "./butoon/OperationButton";
import {current} from "@reduxjs/toolkit";
export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}
function reducer(state,{type,payload}){
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite){
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === "." && state.currentOperand == null) { return state }
            if (payload.digit === '0' && state.currentOperand === '0') return state
            if (payload.digit === "." && state.currentOperand.includes(".")) return state
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null){
                return state
            }
            if  (state.currentOperand == null){
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            if (state.previousOperand == null){
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }
            return {
                ...state,
                operation: payload.operation,
                currentOperand: null,
                previousOperand: evaluate(state)
            }
        case ACTIONS.EVALUATE:
            if (state.currentOperand == null || state.previousOperand == null || state.operation == null){
                return state
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.currentOperand === 0){
                return state
            }
            if (state.overwrite){
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: state.currentOperand.slice(0, -1)
                }
            }
            if (state.currentOperand == null) return state
            if  (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: 0
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }

    }
}
function evaluate({currentOperand = 0,previousOperand,operation}){
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ''

    let computation = ''
    switch (operation){
        case '+':
            computation = prev + current
        break
        case '-':
             computation = prev - current
        break
        case '*':
             computation = prev * current
        break
        case '/':
             computation = prev / current
        break
    }
    return computation.toString()
}

function Calculator({style}){
    const [{currentOperand = 0,previousOperand,operation},dispatch] = useReducer(reducer,{})
    return (
        <div style={{display: style ? "grid" : 'none'}} className={'calculator'}>
                <div className="calculator__screen">
                        <div className="calculator__screen__previous">{previousOperand} {operation}</div>
                        <div className="calculator__screen__current">{currentOperand}</div>
                </div>
                     <button onClick={() => dispatch({type: ACTIONS.CLEAR})} className="calculator__two">AC</button>
                     <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})} className="calculator__number" >DEL</button>
                     <OperationButton operation={'/'} dispatch={dispatch}/>
                     <DigitButton digit={'1'} dispatch={dispatch}/>
                     <DigitButton digit={'2'} dispatch={dispatch}/>
                     <DigitButton digit={'3'} dispatch={dispatch}/>
                     <OperationButton dispatch={dispatch} operation={'*'}/>
                     <DigitButton digit={'4'} dispatch={dispatch}/>
                     <DigitButton digit={'5'} dispatch={dispatch}/>
                     <DigitButton digit={'6'} dispatch={dispatch}/>
                     <OperationButton dispatch={dispatch} operation={'+'}/>
                     <DigitButton digit={'7'} dispatch={dispatch}/>
                     <DigitButton digit={'8'} dispatch={dispatch}/>
                     <DigitButton digit={'9'} dispatch={dispatch}/>
                     <OperationButton dispatch={dispatch} operation={'-'}/>
                     <DigitButton digit={"."} dispatch={dispatch}/>
                     <DigitButton digit={'0'} dispatch={dispatch}/>
                     <button onClick={() => dispatch({type: ACTIONS.EVALUATE})} className="calculator__two" >=</button>
        </div>
    )
}

export default Calculator;