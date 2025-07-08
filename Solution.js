
class FindSumPairs {

    /**
     * @param {number[]} firstInput
     * @param {number[]} secondInput
     */
    constructor(firstInput, secondInput) {
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

    /** 
     * @param {number} index 
     * @param {number} value
     * @return {void}
     */
    add(index, value) {
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

    /** 
     * @param {number} targetSum
     * @return {number}
     */
    count(targetSum) {
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
