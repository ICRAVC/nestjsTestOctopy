# Usage Mode

## Step 1: You need to create a database instance with name `UsersRoles`, then you need to configure the .env file

HOST=localhost\
USERNAME= instance username\
PASSWORD= instance password\
DATABASE=UsersRoles\

## Step 2: Create the database using the follow scripts SQL commands

`create database if not exists UserRoles;`\
`use UserRoles;`

## Paso 3. Create a configuration file with the name 'orm.config.json'

```json
{
  "type": "mysql",
  "username": "username of local instance",
  "password": "password of local instance",
  "host": "localhost",
  "port": 3306, //Local Port MySql instance
  "database": "UsersRoles", //Name of database created in local instance
  "entities": ["src/**/**/*.entity{.ts,.js}"],
  "migrations": ["src/database/migrations/*{.ts,.js}"],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}
```

An orm.config.json is added, you only need to change the username and password of database instance

## Step 4: Into the folder of the program you need to do the following

1. npm install
2. npm run migration:run (to run the migration generated or `npm run migration:generate <name of migration>` to generate it again, I suggest deleting previous migrations)
3. Run the program with `npm run start:dev`

## Step 5: Insert Roles, valid Roles are ('ADMIN', 'ROOT', 'GENERAL')

- Use the documentation `localhost:8080/docs` to do the pertinent test use the post of `roles` `/roles/addRole`\
- If you want to see all the roles in the db use `/roles/allRoles`

## Step 6: Creating a new user

- Using documentation `localhost:8080/docs` we need to choose `/auth/signUp` to generate a new user (role by default GENERAL).\
- If we use the singnIn endpoint we generate a authorization token, this token is used to find all the users created from a date in advance.

## Step 7: Changing the role of our user created to get access in `findUsersByID`

- Using `/users/setRole/{userId}/{roleId}` of documentation `localhost:8080/docs` we are able to add a new role to our user previously created.

## Step 8: Getting al the users created in a date insert in query

- Using `/users/userByDate` of documentation `localhost:8080/docs` adding the date, the bearer authorization and a user role in the valid roles, we are able to get all the users created.
