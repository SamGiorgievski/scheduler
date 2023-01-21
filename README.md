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

- Install dependencies with `npm install`.
- Install database "Scheduler-api" via https://github.com/lighthouse-labs/scheduler-api/
  - Required to run locally

## Dependencies
"classnames": "^2.2.6",
"normalize.css": "^8.0.1",
"react": "^16.9.0",
"react-axios": "^2.0.6",
"react-dom": "^16.9.0",
"react-scripts": "3.4.4"

## Dev dependencies
"@babel/core": "^7.4.3",
"@storybook/addon-actions": "^5.0.10",
"@storybook/addon-backgrounds": "^5.0.10",
"@storybook/addon-links": "^5.0.10",
"@storybook/addons": "^5.0.10",
"@storybook/react": "^5.0.10",
"@testing-library/jest-dom": "^4.0.0",
"@testing-library/react": "^8.0.7",
"@testing-library/react-hooks": "^8.0.1",
"babel-loader": "8.1.0",
"prop-types": "^15.8.1",
"react-test-renderer": "^16.9.0",
"sass": "^1.53.0"


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
