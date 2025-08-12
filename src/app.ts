import express from "express";
import roleRoutes from '../src/routes/role.routes'
import subjectRoutes from '../src/routes/subject.routes'
import registerRoutes from '../src/routes/auth.routes'
import profileRoutes from '../src/routes/profile.route'
import mentorstudentRoutes from '../src/routes/mentorstudent.route'

const port = 4000;
const app = express();
app.use(express.json());

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};


app.use("/api/roles", roleRoutes);
app.use("/api/subjects",subjectRoutes)
app.use("/auth/",registerRoutes)
app.use("/api/profiles",profileRoutes)
app.use("/api/assign",mentorstudentRoutes)

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


// import bcrypt from 'bcryptjs';

// const password = 'admin123';

// bcrypt.hash(password, 10)
//   .then(hash => {
//     console.log('Hashed password:', hash);
//   })
//   .catch(err => {
//     console.error('Error hashing password:', err);
//   });