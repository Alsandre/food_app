import {useState} from 'react';

const useInput = callback => {
    const [enteredValue, setEnteredValue] = useState('');
    // const [isValid, setIsValid] = useState(false);
    
    const isValid = callback(enteredValue);
    const valueChangeHandler = (e) => setEnteredValue(e.target.value);


    return {
        value: enteredValue,
        isValid,
        valueChangeHandler,
    };
};

export default useInput;