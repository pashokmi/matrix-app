import {Cell} from "../types";

export const getGradientBackground = (percent: number) => {
    return `linear-gradient(to top, #ff2400 ${percent}%, transparent ${percent}%)`;
};


export const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
};

export function cloneDeep<T>(obj: T): T | undefined {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const clonedArray: any[] = [];
        for (let i = 0; i < obj.length; i++) {
            clonedArray[i] = cloneDeep(obj[i]);
        }
        return clonedArray as T;
    }

    if (typeof obj === 'object') {
        const clonedObj: Record<string, any> = {};
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = cloneDeep(obj[key]);
            }
        }
        return clonedObj as T;
    }

    return undefined;
}

export function setNewCellValue(prevMatrix:Cell[][],rowIndex:number, colIndex:number) {

        const newMatrix = cloneDeep(prevMatrix)
        if(!newMatrix) return prevMatrix
        const cell = newMatrix[rowIndex][colIndex];
        cell.amount += 1;
        return newMatrix;

}