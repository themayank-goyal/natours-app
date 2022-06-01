import dotenv from 'dotenv';
import app from './app.mjs';
dotenv.config({ path: './config.env' });
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening to ${port}...`);
});
