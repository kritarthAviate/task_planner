# Task Planner [[Link](https://task-planner-with-oauth.netlify.app/)]

This app works as a task planner where users manage multiple tasks and save changes to the cloud.

[Backend Repo](https://github.com/kritarthAviate/task_planner_backend) 

### Features

- Sign in with google and normal signin using JWT authentication.
- Row actions - Indent/ Outdent/ Delete/ Move
- Parent-child relations between nodes - moving an element also moves its children
- Load/ Save - Functionality to generate and download a JSON output and to load the JSON to create the structure again

### Setup

- After cloning the project, run : `npm install`
- Obtain OAuth 2.0 credentials from the Google API Console : [https://console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard)
- To start the app, run : `npm start`

### Tech Stack

React, Javascript
