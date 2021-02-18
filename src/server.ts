import app from "./app";

const PORT = process.env.PORT || 1328;

app.listen(PORT, () => console.log(`running on port http://localhost:${PORT}`));
