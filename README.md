
# User Management Application

React application that integrates with the Reqres API to perform basic user management functions


## Features

- Login
- Edit/Update User data
- Delete User data
- User-friendly and responsive 


## API Reference
BASE URL = https://reqres.in

#### Get list of users
- To get list of users, append it to the base url

```http
  GET /api/users?page=1
```


#### Update User data
- To update user data, append it to the base url with the user id.
```http
  PUT /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of user |

#### Delete User data
- To delete user data, append it to the base url with the user id.
```http
  DELETE /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of user |


## Installation
Clone the repository:
```sh
git clone https://github.com/username/project-name.git
```

Navigate to the project directory:
```sh
cd project-name
```

Install dependencies:
```sh
npm install
```

## Dependencies
- Vite - React
- React Router
- Axios
- Tailwind CSS
- Toastify
## Usage

Start the development server:
```sh
npm run dev
```

Build the project for production:
```sh
npm run build
```

## Folder Structure
```
project-name/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── index.css       # Global styles
│   ├── main.jsx        # Root component
│   ├── App.jsx         # Entry point
├── .gitignore          # Git ignore file
├── package.json        # Project configuration
├── README.md           # Project documentation
```
## Demo
You can check out the live demo of this project here:
[Live Demo](https://user-management-app-sm.netlify.app/)

