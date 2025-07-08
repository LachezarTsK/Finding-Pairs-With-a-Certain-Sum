
package main

import (
    "math"
    "slices"
)

type FindSumPairs struct {
    firstInput            []int
    secondInput           []int
    valueToFrequency      map[int]int
    minValueInSecondInput int
}

func Constructor(firstInput []int, secondInput []int) FindSumPairs {
    findSumPairs := FindSumPairs{
        firstInput:            firstInput,
        secondInput:           secondInput,
        valueToFrequency:      map[int]int{},
        minValueInSecondInput: math.MaxInt,
    }

    slices.Sort(findSumPairs.firstInput)
    for _, value := range secondInput {
        findSumPairs.valueToFrequency[value]++
        findSumPairs.minValueInSecondInput = min(findSumPairs.minValueInSecondInput, value)
    }
    return findSumPairs
}

func (this *FindSumPairs) Add(index int, value int) {
    previousFrequency := this.valueToFrequency[this.secondInput[index]]
    if previousFrequency == 1 {
        delete(this.valueToFrequency, this.secondInput[index])
    } else {
        this.valueToFrequency[this.secondInput[index]]--
    }
    this.secondInput[index] += value
    this.valueToFrequency[this.secondInput[index]]++
}

func (this *FindSumPairs) Count(targetSum int) int {
    numberOfPairs := 0

    for _, value := range this.firstInput {
        difference := targetSum - value

        if difference < this.minValueInSecondInput {
            break
        }
        if _, has := this.valueToFrequency[difference]; has {
            numberOfPairs += this.valueToFrequency[difference]
        }
    }
    return numberOfPairs
}
