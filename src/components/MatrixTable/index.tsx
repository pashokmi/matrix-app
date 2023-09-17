import React, {useState} from 'react';
import {useMatrix} from '../../context/MatrixProvider';
import {formatPercentage, getGradientBackground} from "../../utils";

// Компонент для відображення матриці
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
    const n = matrix.length > 0 ? matrix[0].length : 0; // Отримуємо кількість стовпців
    const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Зберігаємо номер рядка, на якому наведено мишку
    const [highlightedCells, setHighlightedCells] = useState<{ row: number; col: number }[]>([]); // Зберігаємо список виділених комірок

    // Функція для обчислення градієнтного фону комірки на основі відсотка
    const {x} = matrixFormValue
    // Функція для виділення X комірок з найближчими значеннями до комірки на якій наведено мишку
    const highlightClosestCells = (rowIndex: number, colIndex: number, x: number) => {
        const hoveredValue = matrix[rowIndex][colIndex].amount;
        const flatMatrix = matrix.flat();
        const sortedCells = [...flatMatrix].sort((a, b) => Math.abs(a.amount - hoveredValue) - Math.abs(b.amount - hoveredValue));
        const closestCells = sortedCells.slice(1, x + 1); // Вибираємо перші X найближчих комірок (першу пропускаємо, бо це комірка на якій наведено мишку)

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
                                    highlightClosestCells(rowIndex, colIndex, x); // Підсвічуємо 5 найближчих комірок
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
