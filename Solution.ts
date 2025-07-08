
class FindSumPairs {

    valueToFrequency = new Map<number, number>();
    firstInput: number[];
    secondInput: number[];
    minValueInSecondInput: number;

    constructor(firstInput: number[], secondInput: number[]) {
        this.valueToFrequency = new Map();
        this.firstInput = firstInput;
        this.secondInput = secondInput;
        this.minValueInSecondInput = Number.MAX_SAFE_INTEGER;

        this.firstInput.sort((x, y) => x - y);

        this.secondInput = secondInput;
        for (let value of secondInput) {
            if (!this.valueToFrequency.has(value)) {
                this.valueToFrequency.set(value, 0);
            }
            this.valueToFrequency.set(value, this.valueToFrequency.get(value) + 1);
            this.minValueInSecondInput = Math.min(this.minValueInSecondInput, value);
        }
    }

    add(index: number, value: number): void {
        const previousFrequency = this.valueToFrequency.get(this.secondInput[index]);
        if (previousFrequency === 1) {
            this.valueToFrequency.delete(this.secondInput[index]);
        } else {
            this.valueToFrequency.set(this.secondInput[index], previousFrequency - 1);
        }
        this.secondInput[index] += value;

        let newFrequency = 1;
        if (this.valueToFrequency.has(this.secondInput[index])) {
            newFrequency += this.valueToFrequency.get(this.secondInput[index]);
        }

        this.valueToFrequency.set(this.secondInput[index], newFrequency);
    }

    count(targetSum: number): number {
        let numberOfPairs = 0;

        for (let value of this.firstInput) {
            const difference = targetSum - value;
            if (difference < this.minValueInSecondInput) {
                break;
            }
            if (this.valueToFrequency.has(difference)) {
                numberOfPairs += this.valueToFrequency.get(difference);
            }
        }
        return numberOfPairs;
    }
}
