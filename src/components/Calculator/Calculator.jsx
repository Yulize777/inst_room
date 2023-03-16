import React, {useEffect, useState} from 'react';

const Calculator = () => {
        const [state,setState] = useState('0')

    return (
        <div className={'calculator'}>
            <div className="calculator__screen">
                    <div className="calculator__reflection">
                            {state}
                    </div>
            </div>
             <div className="calculator__contForBtns">
                     <button className="calculator__number" onClick={() => setState(prev => prev + '7')}>7</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '8')}>8</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '9')}>9</button>
                     <button className="calculator__operation" onClick={() => setState(prev => prev + '*')}>*</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '4')}>4</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '5')}>5</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '6')}>6</button>
                     <button className="calculator__operation" onClick={() => setState(prev => prev + '-')}>-</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '1')}>1</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '2')}>2</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '3')}>3</button>
                     <button className="calculator__operation" onClick={() => setState(prev => prev + '+')}>+</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '0')}>0</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev + '.')}>.</button>
                     <button className="calculator__number" onClick={() => setState(prev => prev = '0')}>C</button>
                     <button className="calculator__equals" onClick={() => setState(prev => prev + '=')}>=</button>
             </div>
        </div>
    );
};

export default Calculator;