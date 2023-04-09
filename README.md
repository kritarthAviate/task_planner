# Task Planner [[Link](https://task-planner-with-oauth.netlify.app/)]
[Backend Repo](https://github.com/kritarthAviate/task_planner_backend) 

## Description
This app is a task planner where users manage multiple tasks and save changes to the cloud.

## Features
- Sign in with google and normal signin using JWT authentication.
- Row actions - Indent/ Outdent/ Delete/ Move
- Parent-child relations between nodes - moving an element also moves its children
- Load/ Save - Functionality to generate and download a JSON output and to load the JSON to create the structure again

## Setup
- Obtain OAuth 2.0 credentials from the Google API Console : [https://console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard) and add it to `.env` file. 
- Go to the backend repo and run the backend locally as well.

To run the frontend project, install it locally using npm:

```
$ npm install
$ npm start

```

## Tech Stack
Main libraries and frameworks used:
* React
* Javascript
