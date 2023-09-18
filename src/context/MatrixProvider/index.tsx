import React, {createContext, useContext, useState, useEffect, ReactNode, useCallback} from 'react';
import { setNewCellValue} from "../../utils";
import {Cell, MatrixContextType} from "../../types";



const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const useMatrix = () => {
    const context = useContext(MatrixContext);
    if (!context) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }
    return context;
};

export const MatrixProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [matrix, setMatrix] = useState<Cell[][]>([]);
    const [matrixFormValue, setMatrixFormValues] = useState({n: 0, m: 0, x: 0})
    const createMatrix = (m: number, n: number) => {
        const newMatrix: Cell[][] = [];
        for (let i = 0; i < m; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < n; j++) {
                const randomValue = Math.floor(Math.random() * 900) + 100;
                const cellId = i * m + j;
                const cell: Cell = {
                    id: cellId,
                    amount: randomValue,
                };
                row.push(cell);
            }
            newMatrix.push(row);
        }
        setMatrix(newMatrix);
    };

    useEffect(() => {
        createMatrix(matrixFormValue.m, matrixFormValue.n)

    }, [matrixFormValue])

    const calculateRowSum = useCallback((row: Cell[]) => {
        return row.reduce((sum, cell) => sum + cell.amount, 0);
    }, []);

    const calculateColumnAverage = useCallback((columnIndex: number) => {
        const columnTotal = matrix.reduce((sum, row) => sum + row[columnIndex].amount, 0);
        return columnTotal / matrix.length;
    }, [matrix]);

    const deleteRow = (rowIndex: number) => {
        const newMatrix = [...matrix];
        newMatrix.splice(rowIndex, 1);
        setMatrix(newMatrix);
    };

    const addRow = () => {
        const newRow = matrixFormValue.n > 0
            ? Array.from({length: matrixFormValue.n}, (_, index) => ({
                id: matrix.flat().length + index,
                amount: Math.floor(Math.random() * 900) + 100,
            }))
            : [];

        setMatrix((prevMatrix) => [...prevMatrix, newRow]);
    };

    const increaseCellValue = (rowIndex: number, colIndex: number) => {
        setMatrix((prevMatrix) => setNewCellValue(prevMatrix, rowIndex, colIndex));
    };

    return (
        <MatrixContext.Provider
            value={{
                addRow,
                deleteRow,
                matrix,
                createMatrix,
                calculateRowSum,
                calculateColumnAverage,
                increaseCellValue,
                setMatrixFormValues,
                matrixFormValue
            }}
        >
            {children}
        </MatrixContext.Provider>
    );
};
