constexpress = require('express');
constapp = express();
constport = 3000;
app.get('/', (req, res) => res.send('Hello World! '));
app.listen(port, () => console.log('Example app listening on port '+port));