import app from "./app";
import { loadDB } from "./database";

const PORT = process.env.PORT || 1328;

loadDB();

app.listen(PORT, () => console.log(`running on port http://localhost:${PORT}`));
