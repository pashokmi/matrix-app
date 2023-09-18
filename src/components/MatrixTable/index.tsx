import React, {useState} from 'react';
import {useMatrix} from '../../context/MatrixProvider';
import {formatPercentage, getGradientBackground} from "../../utils";

const MatrixTable = () => {
    const {
        matrix,
        matrixFormValue,
        calculateRowSum,
        calculateColumnAverage,
        deleteRow,
        addRow,
        increaseCellValue
    } = useMatrix();

    const n = matrix.length > 0 ? matrix[0].length : 0;
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [highlightedCells, setHighlightedCells] = useState<{ row: number; col: number }[]>([]);

    const {x} = matrixFormValue

    const highlightClosestCells = (rowIndex: number, colIndex: number, x: number) => {
        const hoveredValue = matrix[rowIndex][colIndex].amount;
        const flatMatrix = matrix.flat();
        const sortedCells = [...flatMatrix].sort((a, b) => Math.abs(a.amount - hoveredValue) - Math.abs(b.amount - hoveredValue));
        const closestCells = sortedCells.slice(1, x + 1);

        const highlighted = closestCells.map((cell) => {
            const cellIndex = flatMatrix.findIndex((item) => item.id === cell.id);
            const row = Math.floor(cellIndex / n);
            const col = cellIndex % n;
            return {row, col};
        });

        setHighlightedCells(highlighted);
    };

    if (matrix.length === 0) {
        return <h1>Enter the data to create a table!</h1>
    }

    return (
        <div className={'wrapper'}>
            <table>
                <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td
                                key={cell.id}
                                className={highlightedCells.some((c) => c.row === rowIndex && c.col === colIndex) ? 'teal cell' : 'cell'}
                                style={{
                                    background: rowIndex === hoveredRow ? getGradientBackground((cell.amount / calculateRowSum(row)) * 100) : '',
                                }}
                                onClick={() => increaseCellValue(rowIndex, colIndex)}
                                onMouseEnter={() => {
                                    highlightClosestCells(rowIndex, colIndex, x);
                                }}
                                onMouseLeave={() => {
                                    setHighlightedCells([]);
                                }}
                            >
                                {rowIndex === hoveredRow ? formatPercentage((cell.amount / calculateRowSum(row)) * 100) : cell.amount}
                            </td>
                        ))}

                        <td className="sum"
                            onMouseEnter={() => {
                                setHoveredRow(rowIndex);
                            }}
                            onMouseLeave={() => {
                                setHoveredRow(null);
                            }}
                        >{calculateRowSum(row)}</td>
                        <td className={'delete'}>
                            <button onClick={() => deleteRow(rowIndex)}>Delete row</button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    {Array.from({length: n}).map((_, index) => (
                        <td className={'average'} key={index}>{Math.round(calculateColumnAverage(index))}</td>
                    ))}
                    <td>Average</td>
                    <td className="add" onClick={addRow}>
                        Add row
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default MatrixTable;
