import React, {useState, useEffect, useRef} from 'react';
import {useMatrix} from "../../context/MatrixProvider";

export interface InputData {
    m: number;
    n: number;
    x: number;
}


const InputForm = () => {
    const {setMatrixFormValues} = useMatrix();

    const [mValue, setMValue] = useState<number>(0);
    const [nValue, setNValue] = useState<number>(0);
    const [xValue, setXValue] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            m: mValue,
            n: nValue,
            x: xValue,
        });
        setMatrixFormValues({
            m: mValue,
            n: nValue,
            x: xValue
        })
        // If you need to update some other state with these values
        // setMatrixFormValues({ m: mValue, n: nValue, x: xValue });
    };


    return (
        <form onSubmit={handleSubmit} className={'form'}>
            <label>
                Enter M:
                <input
                    placeholder={'Enter M'}
                    value={mValue}

                    onChange={(e) => setMValue(Number(e.target.value) || 0)}
                    min={0}
                    max={100}
                    type="number"
                />
            </label>
            <label>
                Enter N:
                <input
                    placeholder={'Enter N'}
                    min={0}
                    value={nValue}
                    onChange={(e) => setNValue(Number(e.target.value) || 0)}

                    max={100}
                    type="number"
                />
            </label>
            <label>
                Enter X:
                <input
                    placeholder={'Enter X'}
                    min={0}
                    max={mValue * nValue}
                    type="number"
                    value={xValue}
                    onChange={(e) => setXValue(Number(e.target.value) || 0)}
                />
            </label>
            <button type="submit">Create Matrix</button>
        </form>
    );
};

export default InputForm;
