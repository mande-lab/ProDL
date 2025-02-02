#include <iostream>
#include <vector>

using namespace std;

int main() {
  // Game logic
  vector<int> numbers = {1, 2, 3, 4, 5};
  int target = 7;
  int sum = 0;

  cout << "Welcome to the Programming Puzzle!" << endl;
  cout << "Find the sum of three numbers from the following list that equals " << target << ":" << endl;
  for (int i = 0; i < numbers.size(); i++) {
    cout << numbers[i] << " ";
  }
  cout << endl;

  // ... (Implement logic to check user input and provide feedback)

  return 0;
}