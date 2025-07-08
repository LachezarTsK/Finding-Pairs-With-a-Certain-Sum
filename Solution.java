
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class FindSumPairs {

    private final Map<Integer, Integer> valueToFrequency = new HashMap<>();
    private final int[] firstInput;
    private final int[] secondInput;
    private int minValueInSecondInput = Integer.MAX_VALUE;

    public FindSumPairs(int[] firstInput, int[] secondInput) {
        this.firstInput = firstInput;
        this.secondInput = secondInput;

        Arrays.sort(this.firstInput);

        for (int value : secondInput) {
            valueToFrequency.put(value, valueToFrequency.getOrDefault(value, 0) + 1);
            minValueInSecondInput = Math.min(minValueInSecondInput, value);
        }
    }

    public void add(int index, int value) {
        int previousFrequency = valueToFrequency.get(secondInput[index]);
        if (previousFrequency == 1) {
            valueToFrequency.remove(secondInput[index]);
        } else {
            valueToFrequency.put(secondInput[index], previousFrequency - 1);
        }
        secondInput[index] += value;
        valueToFrequency.put(secondInput[index], valueToFrequency.getOrDefault(secondInput[index], 0) + 1);
    }

    public int count(int targetSum) {
        int numberOfPairs = 0;

        for (int value : firstInput) {
            int difference = targetSum - value;

            if (difference < minValueInSecondInput) {
                break;
            }
            if (valueToFrequency.containsKey(difference)) {
                numberOfPairs += valueToFrequency.get(difference);
            }
        }
        return numberOfPairs;
    }
}
