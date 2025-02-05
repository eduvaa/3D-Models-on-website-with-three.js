# 3D-Models-on-website-with-three.js

## Next.js project that renders 3D models to a website using the three.js library.

### Libraries, Tools, and Languages

- **Next.js** (15.0.3)
- **Three.js** (0.170.0)
- **Node.js** (v20.12.0)
- **PostgreSQL** (17.2)
- **TypeScript** (5.0.0)
- **Tailwind CSS** (3.4.15)

### Objectives

This project's objective is to display 3D models from a database to a website using the three.js library in a Next.js environment.

### Setup

To set up the project:

1. Fork this repository.
2. Run the following command to install dependencies:

   ```bash
   
   npm install

Or use npx if preferred:

    npx install

Set up database as follows and download 3D models on your system in .glb format. Edit db.ts to match your database. Showdata.tsx is irrelevant and I just forgot to remove it.

# SQL table and database

### models

| id           | filename     | path         |
|--------------|--------------|--------------|
| 1            | name of file | path to file |
| 2            | .            | .            |
| 3            | .            | .            |
| .            | .            | .            |
| .            | .            | .            |
| .            | .            | .            |


### About project

Project is made with next.js framework and typescript. Database is PostgreSQL and has only one table. For css project uses tailwind.

Basically route inherits db and makes GET calls to database. ModelButtons gets filename and id from route and sends it forward to scene1 onClick.
In scene three.js is setup and it renders 3D model on canvas and experorts it with buttons. Page.tsx is mainpage and it dispalys canvas on screen with
layout that is setup in layout.tsx.

Project is very simple demo about displaying 3D models on website with three.js library using Next.js and Typescript.

Biggest problems in project were getting 3D models to work. I tried .gltf and .FBX and those didn't work. It didn't matter if models were in repo or on hard drive.
.glb files worked well on both on hard drive and repo. I didn't try other type of files. I just stick with first one that worked. 


