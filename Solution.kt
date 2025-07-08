
import kotlin.math.min

class FindSumPairs(private val firstInput: IntArray, private val secondInput: IntArray) {

    private val valueToFrequency = HashMap<Int, Int>()
    private var minValueInSecondInput = Int.MAX_VALUE

    init {
        firstInput.sort()

        for (value in secondInput) {
            valueToFrequency[value] = valueToFrequency.getOrDefault(value, 0) + 1
            minValueInSecondInput = min(minValueInSecondInput, value)
        }
    }

    fun add(index: Int, value: Int) {
        val previousFrequency = valueToFrequency[secondInput[index]]!!
        if (previousFrequency == 1) {
            valueToFrequency.remove(secondInput[index])
        } else {
            valueToFrequency[secondInput[index]] = previousFrequency - 1
        }
        secondInput[index] += value
        valueToFrequency[secondInput[index]] = valueToFrequency.getOrDefault(secondInput[index], 0) + 1
    }

    fun count(targetSum: Int): Int {
        var numberOfPairs = 0

        for (value in firstInput) {
            val difference = targetSum - value

            if (difference < minValueInSecondInput) {
                break
            }
            if (valueToFrequency.containsKey(difference)) {
                numberOfPairs += valueToFrequency[difference]!!
            }
        }
        return numberOfPairs
    }
}
