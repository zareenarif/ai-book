---
id: week-05-gazebo-basics
title: ' Gazebo Basics'
sidebar_label: ' Gazebo Basics'
---

# 🧪 Gazebo Basics

Gazebo is a powerful **3D robot simulation environment** used with ROS 2 to design, test, and validate robotic systems in a virtual world before applying them on real hardware. It allows developers to simulate **robots, sensors, physics, and environments** with high accuracy.

This lesson introduces the **fundamentals of Gazebo**, its integration with ROS 2, and its importance in humanoid robotics and autonomous systems.

---

## 🎯 Learning Objectives

By the end of this lesson, students will be able to:

- ✅ Understand what **Gazebo Simulator** is  
- ✅ Explain why simulation is important in robotics  
- ✅ Identify the **main components of Gazebo**  
- ✅ Understand **worlds, models, and physics engines**  
- ✅ Launch Gazebo with **ROS 2 integration**  
- ✅ Spawn robots into the simulation  
- ✅ Control robot movement using ROS 2 topics  
- ✅ Apply Gazebo in **humanoid robotics & AI systems**

---

## 🧠 1. What is Gazebo?

Gazebo is an **open-source robotics simulator** that provides:

- Realistic physics engine  
- High-quality 3D graphics  
- Sensor simulation  
- Real-time control using ROS 2  

It allows you to:
- Test robot behavior safely  
- Avoid damaging real hardware  
- Debug robot software  
- Train AI models in simulation  

✅ Gazebo is widely used in:
- Humanoid robotics  
- Autonomous vehicles  
- Drones  
- Industrial robots  
- AI-based robotic training  

---

## ❗ 2. Why Simulation is Important in Robotics?

Simulation is used because:

- ⚠️ Real robots are expensive  
- 🔧 Hardware can be damaged  
- 🧠 AI models need thousands of tests  
- 🛑 Real-world testing is risky  
- ⏱️ Simulation is faster than real time  

✅ You can fail safely in Gazebo without any risk.

---

## 🏗️ 3. Main Components of Gazebo

### 🔹 1. World
A **world** is the environment where the robot exists.

It contains:
- Ground
- Gravity
- Light
- Objects
- Obstacles

Example:
- Office environment  
- Factory floor  
- Outdoor terrain  

---

### 🔹 2. Models
A **model** is any object in Gazebo:

- Robot
- Table
- Box
- Wall
- Sensor module

Each model is built using:
- SDF (Simulation Description Format)
- URDF (Unified Robot Description Format)

---

### 🔹 3. Physics Engine
Gazebo supports different physics engines:

- ODE (default)
- Bullet
- DART
- Simbody

These engines handle:
- Gravity
- Friction
- Collisions
- Force & torque

---

### 🔹 4. Sensors in Gazebo
Gazebo can simulate:

- 📷 Camera  
- 🧭 IMU  
- 🌊 Lidar  
- 👣 Force sensors  
- 🔊 Microphones  

These sensors publish data as **ROS 2 topics**.

---

### 🔹 5. Plugins
Plugins allow Gazebo to:

- Control robot movement  
- Add sensors  
- Interface with ROS 2  
- Simulate motors & controllers  

---

## 🔗 4. Gazebo + ROS 2 Integration

Gazebo integrates with ROS 2 using **ROS-Gazebo bridge packages**.

This allows:

- ROS 2 nodes → Control Gazebo robot  
- Gazebo sensors → Publish ROS 2 topics  
- ROS 2 algorithms → Work on simulated robot  

✅ You can run the **same code on simulation and real robot**.

---

## 🚀 5. Launching Gazebo with ROS 2

```bash
gazebo
