import express from 'express';
import { apiRouter } from './routes/index.js';
import { connectDB } from './config/db.js';
import { errormiddleware } from './middlewares/error.middleware.js';
import { checkBlacklistedToken } from './middlewares/auth.middleware.js';
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(errormiddleware);
app.use(checkBlacklistedToken);
connectDB()



app.use((req, res, next) => {
  console.time('middleware');
  console.log({
    method: req.method,
    url: req.url,
  });
  next();
  console.timeEnd('middleware');
});

app.use('/api', apiRouter);


app.listen(port, () => {
  console.log(`Server running on port : http://localhost:${port}`);
});