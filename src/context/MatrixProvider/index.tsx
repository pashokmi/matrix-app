import React, {createContext, useContext, useState, useEffect, ReactNode, useId, useCallback} from 'react';
import {cloneDeep, setNewCellValue} from "../../utils";

type CellId = number; // Унікальне значення для всієї таблиці
type CellValue = number; // Випадкове трьоцифрове число

export type Cell = {
    id: CellId;
    amount: CellValue;
};

type MatrixContextType = {
    matrix: Cell[][];
    createMatrix: (m: number, n: number) => void;
    calculateRowSum: (row: Cell[]) => number;
    calculateColumnAverage: (columnIndex: number) => number;
    deleteRow: (rowIndex: number) => void;
    addRow: any,
    increaseCellValue: any,
    setMatrixFormValues: ({n, m, x}: { n: number, m: number, x: number }) => void,
    matrixFormValue: { n: number, m: number, x: number }
};

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
                // Генеруємо випадкове трьоцифрове число для amount
                const randomValue = Math.floor(Math.random() * 900) + 100;
                // Генеруємо унікальний id для кожної клітинки
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

    }, [matrixFormValue])    // Функція для обчислення суми в рядку
    //useCallback
    const calculateRowSum = useCallback((row: Cell[]) => {
        return row.reduce((sum, cell) => sum + cell.amount, 0);
    }, []);
    // Функція для обчислення середнього значення в стовпці
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

        const newRow: Cell[] = [];
        for (let j = 0; j < matrixFormValue.n; j++) {
            // Генеруємо випадкове трьоцифрове число для amount
            const randomValue = Math.floor(Math.random() * 900) + 100;
            // Генеруємо унікальний id для кожної клітинки
            const lastId = matrix.flat().length - 1
            const cellId = lastId + j;
            const cell: Cell = {
                id: cellId,
                amount: randomValue,
            };
            newRow.push(cell);
        }

        console.log(newRow)
        const newMatrix = [...matrix];
        newMatrix.push(newRow);
        setMatrix(newMatrix)
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
