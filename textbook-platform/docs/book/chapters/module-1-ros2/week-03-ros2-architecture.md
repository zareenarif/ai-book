---
id: week-03-ros2-architecture
title: ' ROS 2 Architecture'
sidebar_label: ' ROS 2 Architecture'
---

# 🤖 ROS 2 Architecture

ROS 2 (Robot Operating System 2) is a modern, flexible, and high-performance framework used for building robotic systems. This lesson explains the **core architecture of ROS 2**, how different components communicate, and how real-world robotic applications are structured using ROS 2.

This module is essential for understanding **how humanoid robots, autonomous vehicles, drones, and AI-powered robots are built and controlled**.

---

## 🎯 Learning Objectives

By the end of this lesson, students will be able to:

- ✅ Understand what **ROS 2 is** and why it is used  
- ✅ Explain the **core components of ROS 2 architecture**  
- ✅ Understand **nodes, topics, services, and actions**  
- ✅ Describe the role of **DDS (Data Distribution Service)**  
- ✅ Understand the **ROS 2 communication model**  
- ✅ Differentiate between **ROS 1 and ROS 2**  
- ✅ Understand how ROS 2 is used in **real humanoid robotics systems**  

---

## 🧠 1. What is ROS 2?

ROS 2 is an **open-source robotic middleware framework** that helps developers build, control, and simulate robots easily.

It acts as a **bridge between hardware and software**, allowing different robot components to communicate efficiently.

### ✅ Key Uses of ROS 2:
- Robot control
- Sensor data processing
- Autonomous navigation
- Computer vision
- AI-powered robotics
- Simulation with Gazebo

---

## 🏗️ 2. Core ROS 2 Architecture Overview

ROS 2 follows a **distributed architecture**, meaning:

- There is **no single central master**
- Each component runs independently
- Communication happens **peer-to-peer**
- Highly **scalable and fault tolerant**

### Main Architectural Layers:

1. Application Layer (Robot Programs)
2. ROS 2 Client Libraries (Python, C++)
3. ROS 2 Middleware (DDS)
4. Operating System (Linux/Windows)
5. Hardware Layer (Sensors, Motors, Cameras)

---

## 🧩 3. Nodes in ROS 2

A **node** is a **small independent program** that performs one specific task.

### Examples of ROS 2 Nodes:
- Camera node → Publishes images  
- Motor node → Controls wheel movement  
- Lidar node → Publishes distance data  
- AI node → Performs object detection  

✅ Each robot system contains **multiple nodes running together**.

---

## 💬 4. Topics (Publish–Subscribe Model)

Topics allow **asynchronous communication** between nodes.

- A **publisher** sends data  
- A **subscriber** receives data  
- Data flows continuously in real-time  

### Example:
- Camera Node → Publishes image data on `/camera/image`
- Vision Node → Subscribes to `/camera/image`

✅ Used for:
- Sensor data streaming
- Real-time telemetry
- Continuous robot feedback

---

## 🔁 5. Services (Request–Response Model)

Services allow **two-way communication**.

- Client sends a **request**
- Server sends a **response**

### Example:
- Turn on motor
- Reset robot position
- Start scanning

✅ Used for **short, instant commands**

---

## ⏳ 6. Actions (Long-Running Tasks)

Actions are used for **long-running tasks with continuous feedback**.

### Example:
- Navigate to a location
- Pick an object
- Walk to a target

Actions provide:
- ✅ Feedback
- ✅ Result
- ✅ Cancel option

---

## 🌐 7. DDS (Data Distribution Service)

ROS 2 uses **DDS as its communication backbone**.

### DDS Provides:
- Real-time communication
- High reliability
- Secure data transfer
- Auto-discovery of nodes
- Quality of Service (QoS) control

✅ This is a **major upgrade from ROS 1**, which used a central master.

---

## 🔐 8. Security in ROS 2

ROS 2 includes built-in **security features**, which were missing in ROS 1:

- 🔐 Encrypted communication
- 👤 Node authentication
- ✅ Permission-based access control

This makes ROS 2 suitable for:
- Military robots  
- Medical robots  
- Industrial automation  
- Autonomous vehicles  

---

## 🔄 9. ROS 1 vs ROS 2 (Quick Comparison)

| Feature | ROS 1 | ROS 2 |
|--------|--------|--------|
| Master Node | Required | ❌ Not required |
| Security | ❌ No | ✅ Built-in |
| Real-time Support | ❌ Poor | ✅ Excellent |
| Middleware | Custom | ✅ DDS |
| Windows Support | ❌ Limited | ✅ Full |
| Multi-Robot Systems | ❌ Weak | ✅ Strong |

---

## 🦿 10. ROS 2 in Humanoid Robotics

ROS 2 is widely used in humanoid robots for:

- 🚶 Walking & gait control
- 👁️ Vision and perception
- 🦾 Arm manipulation
- 🧠 AI decision-making
- 📡 Sensor integration
- ⚖️ Balance and posture control

Popular humanoid robots using ROS 2:
- NASA Valkyrie
- SoftBank Pepper (new systems)
- Research humanoid platforms

---

## 🛠️ 11. Programming Languages in ROS 2

ROS 2 supports multiple programming languages:

- 🐍 Python → Easy & beginner-friendly
- ⚙️ C++ → High performance & real-time control
- 🧪 Java → Experimental use

---

## 🧪 12. Practical Applications of ROS 2

- ✅ Humanoid robots  
- ✅ Autonomous vehicles  
- ✅ Drones  
- ✅ Smart factories  
- ✅ Medical robotics  
- ✅ AI research  

---

## 🧠 13. Tools Used with ROS 2

- ROS 2 CLI
- Gazebo Simulator
- RViz Visualization Tool
- OpenCV
- TensorFlow / PyTorch
- Arduino & Microcontrollers

---

## 🧪 Hands-On Activities (Coming Soon)

✅ Create your first ROS 2 node  
✅ Publisher and subscriber demo  
✅ Service-based motor control  
✅ Action-based navigation system  
✅ Sensor data visualization in RViz  

---

## 📝 Knowledge Check Quiz (Coming Soon)

- MCQs on nodes, topics, DDS
- Short conceptual questions
- Architecture-based problem-solving

---

## 📚 Glossary (Preview)

- **Node:** A single running ROS program  
- **Topic:** Real-time message stream  
- **Service:** Request–response communication  
- **Action:** Long-duration task handler  
- **DDS:** Real-time middleware for data exchange  
- **QoS:** Quality of Service rules for communication  

---

## 📖 Further Reading (Coming Soon)

- ROS 2 Official Documentation
- DDS Architecture Whitepapers
- ROS 2 Security Standard Guides
- Humanoid Robot Control using ROS 2

---

## ✅ Lesson Summary

This lesson explained the **complete ROS 2 architecture**, including nodes, topics, services, actions, and DDS. Students learned how ROS 2 enables **real-time, secure, and scalable communication** between robot components. This foundation is extremely important for building **humanoid robots, AI-driven robotic systems, and autonomous machines**.

---

📌 *This chapter prepares you for writing real ROS 2 programs, controlling robot hardware, and building full robotic systems.*
