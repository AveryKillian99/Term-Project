# Term Project – Workout Tracker

## 📌 Repository  
https://github.com/AveryKillian99/Term-Project

## 🚀 Deployed App  
https://term-project-2r8a.onrender.com/

---

# ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/AveryKillian99/Term-Project.git
cd Term-Project
 ```
 ### 2. Run install commands and start server
 ```bash
npm install && npm run build:frontend:force
node server.js
```

## Reflection

### Design Choices
The project uses React (with Vite) for the frontend because it offers a fast and efficient development workflow and allows clean organization through reusable components. The backend uses Express and Node.js due to their simplicity, flexibility, and strong compatibility with REST API development. The database design is intentionally straightforward, with users associated with their workouts, which makes the structure easy to extend as the project grows.

### Challenges
Several challenges occurred during development and deployment. Authentication was initially difficult to manage because OAuth redirects and CORS behavior differed between local development and deployment on Render. Environment variable handling and build pipelines also required adjustment, particularly around the frontend build process and static file serving. Routing conflicts between React and Express during authentication redirects caused multiple errors that required careful debugging.

### Learning Outcomes
Other than the difficulties involved with Render or maybe deploying in general I learned alot from this project, besides simply writing and working on a full stack web app in react, such as CORS and its complications, OAUTH pain and sufferings, and the troubleshooting process unique to web dev. 

### Future Work
Planned improvements include expanding database and going into more detail regarding workouts, ie sessions, plans, dates, etc. Also would love to spend more time on Render getting it to work with the original backend/api system I had wanted to build. 
