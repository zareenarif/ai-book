---
id: week-12-inverse-kinematics
title: ' Inverse Kinematics'
sidebar_label: ' Inverse Kinematics'
---


# Inverse Kinematics (IK)

Inverse Kinematics (IK) is a fundamental concept in robotics that allows a robot to **compute the required joint angles** to achieve a desired **end-effector position and orientation**. It is widely used in **humanoid robots, manipulators, and autonomous robotic arms** for precise motion control.

This lesson introduces **IK principles, mathematical formulations, ROS 2 integration, and practical applications**.

---

## Learning Objectives

By the end of this lesson, students will be able to:

- Understand what **Inverse Kinematics** is  
- Differentiate between **Forward Kinematics and Inverse Kinematics**  
- Solve IK for simple manipulators  
- Apply IK in **humanoid robot limbs**  
- Integrate IK with **ROS 2 Humble** for motion planning  
- Use simulation environments like **Gazebo, Unity, or Isaac Sim** to test IK  
- Understand challenges like **singularities and redundancy**  

---

## Prerequisites

- Completed Week 1-8: ROS 2, simulation, and sensor integration
- Completed Week 11: Humanoid Locomotion (understanding kinematics)
- Strong foundation in linear algebra and trigonometry
- Familiarity with coordinate transformations and matrices
- ROS 2 Humble with MoveIt motion planning framework
- Python 3.8+ with NumPy and SciPy for mathematical computations
- Access to simulation platform (Gazebo, Unity, or Isaac Sim)

---

## 1. What is Inverse Kinematics?

Inverse Kinematics is the process of:

- Finding **joint angles (θ1, θ2, …, θn)**  
- That result in a desired **end-effector position and orientation** (x, y, z, roll, pitch, yaw)  

✅ Example:
- Desired position: `(x=0.5, y=0.2, z=0.3)`  
- IK computes: `Joint1=30°, Joint2=45°, Joint3=10°`  
- Robot moves its arm to reach that position  

---

## 🔹 2. Forward Kinematics vs Inverse Kinematics

| Feature                | Forward Kinematics (FK)           | Inverse Kinematics (IK)           |
|------------------------|---------------------------------|----------------------------------|
| Input                  | Joint angles                    | End-effector pose               |
| Output                 | End-effector pose               | Joint angles                     |
| Computation            | Direct, simple                  | Requires solving equations      |
| Use                    | Simulation, animation            | Motion planning, manipulation  |

✅ IK is **more complex but essential for task-oriented motion**.

---

## 3. IK Mathematical Formulation

For a robot arm with `n` joints:

1. **Forward Kinematics:**
\[
T = f(\theta_1, \theta_2, ..., \theta_n)
\]

2. **Inverse Kinematics:**
\[
\theta_1, \theta_2, ..., \theta_n = f^{-1}(x, y, z, \phi, \theta, \psi)
\]

Where:
- \(T\) = end-effector pose  
- \(\theta_i\) = joint angles  
- \(x, y, z\) = position  
- \(\phi, \theta, \psi\) = orientation  

✅ IK often requires **numerical methods** due to non-linear equations.

---

## 👣 4. IK Solution Methods

### 1. Analytical Solutions
- Closed-form equations  
- Accurate and fast  
- Limited to simple manipulators  

### 2. Numerical Solutions
- Iterative methods like **Jacobian Inverse** or **Gradient Descent**  
- Works for complex robots  
- Handles redundancy and constraints  

### 3. Hybrid Approaches
- Combine analytical & numerical  
- Improves speed and reliability  

---

## 5. ROS 2 Integration

IK can be implemented in ROS 2 using:

- **MoveIt 2** → Motion planning and IK  
- **Joint trajectory controllers** → Execute IK solutions  
- **Robot description (URDF/Xacro)** → Defines robot kinematics  
- **Simulation environments** → Test IK in Gazebo / Unity / Isaac Sim  

✅ Enables **task-oriented motion for humanoid robots and manipulators**.

---

## 6. Practical Examples

### Example 1: 2-DOF Arm
- Desired end-effector position: `(x, y)`  
- Use analytical IK formulas to compute joint angles  
- Publish angles to ROS 2 topic to move arm  

### Example 2: 6-DOF Manipulator
- Use MoveIt 2 IK solver  
- Plan trajectory to pick-and-place an object  
- Simulate in Gazebo or Unity  

### Example 3: Humanoid Arm
- Apply IK for reaching tasks  
- Combine with balance control for stable motion  

---

## 7. Tools & Technologies Used

- ROS 2 Humble  
- MoveIt 2  
- Python / C++  
- URDF / Xacro Robot Models  
- Gazebo / Unity / Isaac Sim  
- NumPy / SciPy for numerical IK  
- OpenCV (optional, for vision-guided IK)  

---

## 🧪 8. Hands-On Exercises (Coming Soon)

✅ Solve IK for a simple 2-DOF robot arm  
✅ Implement IK for a 6-DOF manipulator in ROS 2  
✅ Simulate humanoid arm reaching in Gazebo  
✅ Experiment with numerical vs analytical IK solutions  
✅ Test IK solutions with MoveIt 2 trajectory planning  

---

## 9. Knowledge Check Quiz (Coming Soon)

- What is the difference between FK and IK?  
- Name two numerical IK methods  
- Why is IK more complex than FK?  
- How is IK integrated with ROS 2?  

---

## 10. Glossary

- **IK (Inverse Kinematics):** Compute joint angles for desired end-effector pose  
- **FK (Forward Kinematics):** Compute end-effector pose from joint angles  
- **URDF/Xacro:** Robot description files  
- **MoveIt 2:** ROS 2 motion planning framework  
- **Jacobian:** Matrix relating joint velocities to end-effector velocities  
- **Redundancy:** Extra DOFs allowing multiple solutions  

---

## 11. Further Reading (Coming Soon)

- ROS 2 MoveIt 2 IK tutorials  
- Analytical & numerical IK methods  
- Humanoid arm IK research papers  
- Kinematics textbooks and simulation examples  

---

## Lesson Summary

This lesson introduced **Inverse Kinematics**, covering its definition, mathematical formulation, solution methods, ROS 2 integration, and applications in **humanoid robots and manipulators**. Students learned how **IK allows robots to reach desired positions accurately** and how it is essential for **task-oriented robotic motion**.

---

📌 *This lesson prepares students for advanced motion planning, humanoid manipulation, and AI-driven robotics using ROS 2.*

---

**Version**: ROS 2 Humble  
**License**: CC BY-SA 4.0
