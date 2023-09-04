# Forensic Argumentation Application

## Introduction

Digital forensics is a rapidly changing field where investigators face numerous challenges due to the rise of digital technology and the consequent data deluge. While the problem is multifaceted, encompassing both technical and organizational concerns, the underlying need remains consistent: a user-friendly tool, specifically web applications, to streamline the investigative process. To fully grasp the magnitude of these challenges, one must appreciate the digital age's implications for forensic investigations.

## Background

The contemporary digital era, characterized by interconnected devices and expansive online platforms, has exponentially expanded the data reservoir available to forensic investigators. As Franqueira and Horsman (2020) articulated, the real challenge transcends sheer data volume to the necessity of presenting these findings coherently. While there's a palpable momentum towards standardizing forensic practices to bolster evidence reliability, the realm of digital forensics stands at a pivotal juncture. The unique nature of digital evidence, compounded by the imperatives of lucid reporting, encapsulates the intrinsic complexity of the field.

## Problem Statement

At the heart of digital forensics lies the intricate task of organizing, deciphering, and elucidating evidence. The proliferation of investigative elements inevitably muddies the waters of clarity. This convolution has repercussions that ripple across all stakeholders. Enter the proposed panacea: a web-centric tool envisioned to bring method to the madness, ensuring narrative clarity and comprehensive case understanding.

## Project Objective

In alignment with the challenges delineated, this dissertation endeavors to architect a user-centric, robust web application that resonates with the framework proposed by Franqueira and Horsman (2020). Envisioned with an intuitive drag-and-drop interface, the application is tailored to satiate the unique demands of digital forensic professionals. A non-negotiable emphasis on rigorous functional and security testing promises an uncompromised user experience. By fostering early engagement with the potential user base, this project aspires to craft a solution that resonates with the digital forensics fraternity's real-world challenges.

By the culmination of this dissertation, readers will be equipped with an in-depth understanding of the digital forensics landscape, the proposed web-based panacea, and its prospective ramifications on the domain.

## Getting Started

### Prerequisites

- **Docker**: Ensure you have Docker installed. If not, you can [download and install Docker here](https://docs.docker.com/get-docker/).
- **Docker-Compose**: This is generally installed with Docker for Windows and Mac, but ensure it's available by running `docker-compose -v`. For Linux users, follow the [installation guide here](https://docs.docker.com/compose/install/).

## Launching the Project

1. Navigate to the root of the project.
2. Use the following command to start the services:

```bash
docker-compose up --build -d
```

### Stopping the Application

To gracefully stop the services and remove the containers:

```bash
docker-compose down
```

To also remove the volumes defined in docker-compose.yml:

```bash
docker-compose down -v
```

### Troubleshooting

1. Ports 3030 and 3000 Are Already in Use

If you encounter issues related to ports 3030 and 3000 being occupied, you might need to stop processes currently using these ports.

For Linux/Mac:
Find the process:

```bash
sudo lsof -i :3030
sudo lsof -i :3000
```

Terminate the process:

```bash
kill -9 <PID>
```

For Windows:
Find the process:

```bash
netstat -ano | find "3030"
netstat -ano | find "3000"
```

Terminate the process:

```bash
taskkill /PID <PID_NUMBER> /F
```

Replace <PID> and <PID_NUMBER> with the process ID you get from the previous command.
