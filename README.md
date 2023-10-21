# Next13 Car Booking App

Following were the technologies used:

1. NextJS
2. ReactJS
3. TypeScript
4. React Hook Forms
5. TailwindCss
6. lucide-react
7. react-tsparticles
8. Zod
9. next-auth
10. Prisma
11. ts-node
12. Supabase

### Supabase DB URL String generation

Go to Project > Project Settings > Database Settings.
From here go to Connection string section and pick URI or NodeJs.

```
postgresql://postgres:[YOUR-PASSWORD]@db.abcxyz.supabase.co:5432/postgres
```

Here replace your password with the password that was generated at the time of creating new project.

### Prisma Installation

1. npm i -D prisma
2. npm i @prisma/client

### Initialize Prisma

npx prism init
This will create all a folder called prisma and set defaults needed for the project.

### Create Prisma Migration

`npx prisma migrate dev --name init`

It will create db migrations.

### Build

Modify build script to

`"build": "prisma generate && next build"`

### Seed the database via Prisma

1. `npm i -D ts-node `

    This will let us execute the node script but the script is written in typescript

2. Add the following prisma script in package.json to execute your seed.ts file, to seed data into database.
    ```
    "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
    }
    ```

### Global Instance of our connection

` lib > prisma.ts`

Creates global instance of our prisma connection

