
using System;
using System.Collections.Generic;

public class FindSumPairs
{
    private Dictionary<int, int> valueToFrequency = [];
    private readonly int[] firstInput;
    private readonly int[] secondInput;
    private int minValueInSecondInput = int.MaxValue;

    public FindSumPairs(int[] firstInput, int[] secondInput)
    {
        this.firstInput = firstInput;
        this.secondInput = secondInput;

        Array.Sort(this.firstInput);

        foreach (int value in secondInput)
        {
            valueToFrequency.TryAdd(value, 0);
            ++valueToFrequency[value];
            minValueInSecondInput = Math.Min(minValueInSecondInput, value);
        }
    }

    public void Add(int index, int value)
    {
        int previousFrequency = valueToFrequency[secondInput[index]];
        if (previousFrequency == 1)
        {
            valueToFrequency.Remove(secondInput[index]);
        }
        else
        {
            --valueToFrequency[secondInput[index]];
        }
        secondInput[index] += value;
        valueToFrequency.TryAdd(secondInput[index], 0);
        ++valueToFrequency[secondInput[index]];
    }

    public int Count(int targetSum)
    {
        int numberOfPairs = 0;

        foreach (int value in firstInput)
        {
            int difference = targetSum - value;

            if (difference < minValueInSecondInput)
            {
                break;
            }
            if (valueToFrequency.ContainsKey(difference))
            {
                numberOfPairs += valueToFrequency[difference];
            }
        }
        return numberOfPairs;
    }
}
