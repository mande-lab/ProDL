using UnityEngine;
using ARFoundation;
using ARSubsystems;

public class CityGuide : MonoBehaviour
{
  public ARSession arSession;
  public ARRaycastManager raycastManager;

  void Update()
  {
    if (Input.touchCount > 0)
    {
      Touch touch = Input.GetTouch(0);
      if (touch.phase == TouchPhase.Began)
      {
        Pose pose;
        if (raycastManager.Raycast(touch.position, out pose))
        {
          // Handle point of interest
        }
      }
    }
  }
}