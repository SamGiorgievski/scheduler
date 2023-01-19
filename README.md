# Interview Scheduler
Interview scheduler is a single-page app built with react that allows students to view available timeslots, and create/edit delete appointments with interviewers. 

## Features
- View list of days with available spots
- Select day to view available or existing appointments
  - Existing appointments display name, and interviewer
- Create/edit/delete appointments
  - Loading and error states for each action
  - Available slots and appointment updates instantly
- Stored and rendered via database, info persists between sessions
 
 ## Final Product
 !["Initial page"](https://github.com/SamGiorgievski/scheduler/blob/master/docs/First%20view.png?raw=true)
 !["Create appointment"](https://github.com/SamGiorgievski/scheduler/blob/master/docs/Create%20appointment.png?raw=true)
 !["View updated changes"](https://github.com/SamGiorgievski/scheduler/blob/master/docs/Updated%20view.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
