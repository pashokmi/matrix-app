type CellId = number;
type CellValue = number;

export type Cell = {
    id: CellId;
    amount: CellValue;
};

export type MatrixContextType = {
    matrix: Cell[][];
    createMatrix: (m: number, n: number) => void;
    calculateRowSum: (row: Cell[]) => number;
    calculateColumnAverage: (columnIndex: number) => number;
    deleteRow: (rowIndex: number) => void;
    addRow: () => void,
    increaseCellValue: (rowIndex: number, colIndex: number) => void,
    setMatrixFormValues: ({n, m, x}: { n: number, m: number, x: number }) => void,
    matrixFormValue: { n: number, m: number, x: number }
};