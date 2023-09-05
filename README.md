# Forensic Argumentation Application

## Introduction

Digital forensics is a rapidly changing field where investigators face many challenges. The rise of digital technology has led to a massive increase in data. As investigators sift through this data from various sources, they often feel overwhelmed. This "big data" issue is not just technical; it highlights the need for a clear and organised method for analysing and reporting evidence. There's a clear need for a user-friendly tool, especially web applications, to help in this process.
To understand the depth of these challenges, it's essential to delve into the backdrop of the digital age and its implications for forensic investigations.

## Background

The digital era, with its interconnected devices and online platforms, has made the data pool for forensic investigators much larger. While there are tools for specific data types, it's up to the investigator to piece together a clear story from different evidence. As Franqueira and Horsman (2020) point out, the challenge isn't just about the amount of data but presenting findings in a way that everyone can understand. There's also a growing push for standard practices in forensics to ensure evidence is reliable and clear. However, the digital forensics field is at a crossroads. The nature of digital evidence and the need for clear reporting make for a complicated problem.
This backdrop sets the stage for the core issue at hand in digital forensics.

## Problem Statement

The main challenge in digital forensics is about organising, interpreting, and presenting evidence. With many elements in an investigation, organising them clearly becomes harder. This complexity affects not just investigators but everyone involved in the process. The solution? A web-based tool that helps structure the investigation, ensuring clarity and a complete understanding of the case.
Recognizing these challenges, this dissertation proposes a solution tailored to the needs of the digital forensics community.

## Project Objective

This dissertation aims to create a user-friendly, secure web app that supports the framework suggested by Franqueira and Horsman (2020). This app, with its drag-and-drop feature, offers a flexible way to organise evidence, meeting the specific needs of digital forensics professionals. The focus is on thorough testing for both function and security, ensuring a safe user experience. By engaging with potential users early on, this project hopes to design a solution that truly addresses the challenges faced by the digital forensics community.
By the end of this dissertation, readers will understand the challenges in digital forensics, learn about the proposed web-based solution, and its possible impacts on the field.

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
