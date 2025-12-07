---
id: week-04-ros2-nodes-topics
title: ' ROS 2 Nodes and Topics'
sidebar_label: ' ROS 2 Nodes and Topics'
---

# 🤖 ROS 2 Nodes and Topics

This lesson focuses on the **core communication system of ROS 2**, which is built around **Nodes and Topics**. These two components form the foundation of how different parts of a robot communicate with each other in real time.

Understanding nodes and topics is **mandatory** before moving toward robot control, navigation, perception, and AI-based automation.

---

## 🎯 Learning Objectives

By the end of this lesson, students will be able to:

- ✅ Understand what a **Node** is in ROS 2  
- ✅ Explain what a **Topic** is and how it works  
- ✅ Understand the **Publisher–Subscriber communication model**  
- ✅ Create and run **ROS 2 nodes**  
- ✅ Publish and subscribe to **topics using Python**  
- ✅ Visualize real-time data using **ROS 2 tools**  
- ✅ Apply nodes and topics in **humanoid robotics systems**

---

## 🧠 1. What is a Node in ROS 2?

A **Node** is a **single executable program** in ROS 2 that performs one specific task.

Each robot is made up of **many small nodes**, instead of one large program.

### 🔹 Examples of ROS 2 Nodes:
- Camera Node → Publishes camera images  
- Motor Node → Controls motors  
- Lidar Node → Publishes distance data  
- AI Node → Performs object detection  
- Voice Node → Handles speech input  

✅ Each node runs **independently**  
✅ Nodes can run on **different computers**  
✅ If one node fails, others continue working  

---

## 🧩 2. What is a Topic in ROS 2?

A **Topic** is a **named communication channel** used to transfer data between nodes.

Topics follow the **Publish–Subscribe model**:

- A **Publisher** sends data on a topic  
- A **Subscriber** receives data from the same topic  
- Communication is **one-way and continuous**

### 🔹 Example:
- Camera Node publishes on:  
  `/camera/image`  
- Vision Node subscribes to:  
  `/camera/image`  

✅ One topic can have **multiple publishers and subscribers**

---

## 🔄 3. Publisher–Subscriber Communication Model

This is the **main communication system in ROS 2**.

| Component | Role |
|----------|------|
| Publisher | Sends data |
| Subscriber | Receives data |
| Topic | Data channel |

### ✅ Benefits:
- Real-time communication  
- No direct connection between nodes  
- Highly scalable  
- Fault-tolerant  

---

## 🏗️ 4. Node-Based Distributed Architecture

ROS 2 follows a **distributed system model**:

- Each task → Separate node  
- No central master required  
- Nodes automatically discover each other  
- Communication happens directly via DDS  

This makes ROS 2 suitable for:
- ✅ Multi-robot systems  
- ✅ Humanoid robots  
- ✅ Autonomous vehicles  
- ✅ Smart factories  

---

## 🛠️ 5. Creating a ROS 2 Node (Python Example)

### ✅ Step 1: Create a Package
```bash
ros2 pkg create my_robot --build-type ament_python
