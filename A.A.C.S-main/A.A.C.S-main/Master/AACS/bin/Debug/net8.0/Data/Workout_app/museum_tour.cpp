#include <iostream>
#include <string>
#include <opencv2/opencv.hpp>

int main() {
  std::string exhibit_name = "Ancient Egyptian Artifacts";
  cv::Mat image = cv::imread("museum_image.jpg");

  // Augmented reality code using OpenCV and Unity
  // ...

  std::cout << "Welcome to the " << exhibit_name << " exhibit!" << std::endl;
  return 0;
}