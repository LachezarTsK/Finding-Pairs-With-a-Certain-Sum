
#include <ranges> 
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

class FindSumPairs {

    unordered_map<int, int> valueToFrequency;
    vector<int>& firstInput;
    vector<int>& secondInput;
    int minValueInSecondInput = numeric_limits<int>::max();

public:
    FindSumPairs(vector<int>& firstInput, vector<int>& secondInput) :firstInput{ firstInput }, secondInput{ secondInput } {
        ranges::sort(this->firstInput);

        for (int value : secondInput) {
            ++valueToFrequency[value];
            minValueInSecondInput = min(minValueInSecondInput, value);
        }
    }

    void add(int index, int value) {
        int previousFrequency = valueToFrequency[secondInput[index]];
        if (previousFrequency == 1) {
            valueToFrequency.erase(secondInput[index]);
        }
        else {
            --valueToFrequency[secondInput[index]];
        }
        secondInput[index] += value;
        ++valueToFrequency[secondInput[index]];
    }

    int count(int targetSum) {
        int numberOfPairs = 0;

        for (const auto& value : firstInput) {
            int difference = targetSum - value;

            if (difference < minValueInSecondInput) {
                break;
            }
            if (valueToFrequency.contains(difference)) {
                numberOfPairs += valueToFrequency[difference];
            }
        }
        return numberOfPairs;
    }
};
