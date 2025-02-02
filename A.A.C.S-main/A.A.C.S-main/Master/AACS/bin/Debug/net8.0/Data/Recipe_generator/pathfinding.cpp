#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct Node {
  int x, y;
  int cost;
  Node* parent;
};

vector<vector<int>> grid;
int start_x, start_y;
int end_x, end_y;

int manhattanDistance(Node a, Node b) {
  return abs(a.x - b.x) + abs(a.y - b.y);
}

vector<Node*> aStar(Node* start, Node* end) {
  priority_queue<Node*, vector<Node*>, function<bool(Node*, Node*)>> openList;
  vector<Node*> closedList;

  openList.push(start);

  while (!openList.empty()) {
    Node* current = openList.top();
    openList.pop();
    closedList.push_back(current);

    if (current->x == end->x && current->y == end->y) {
      vector<Node*> path;
      Node* node = current;
      while (node != nullptr) {
        path.push_back(node);
        node = node->parent;
      }
      reverse(path.begin(), path.end());
      return path;
    }

    for (int dx = -1; dx <= 1; dx++) {
      for (int dy = -1; dy <= 1; dy++) {
        if (dx == 0 && dy == 0) continue;

        int nx = current->x + dx;
        int ny = current->y + dy;

        if (nx >= 0 && nx < grid.size() && ny >= 0 && ny < grid[0].size() && grid[nx][ny] == 0) {
          Node* neighbor = new Node{nx, ny, current->cost + 1, current};
          bool found = false;
          for (Node* closed : closedList) {
            if (closed->x == neighbor->x && closed->y == neighbor->y) {
              found = true;
              break;
            }
          }
          if (!found) {
            openList.push(neighbor);
          }
        }
      }
    }
  }
  return {};
}

int main() {
  // Initialize grid
  grid = {{0, 0, 0, 0},
          {0, 1, 0, 0},
          {0, 0, 0, 0},
          {0, 0, 0, 0}};

  start_x = 0;
  start_y = 0;
  end_x = 3;
  end_y = 3;

  Node* start = new Node{start_x, start_y, 0, nullptr};
  Node* end = new Node{end_x, end_y, 0, nullptr};

  vector<Node*> path = aStar(start, end);

  for (Node* node : path) {
    cout << "(" << node->x << ", " << node->y << ")" << endl;
  }

  return 0;
}