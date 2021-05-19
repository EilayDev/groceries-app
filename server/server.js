const bp = require('body-parser')
const express = require("express");

const PORT = 3001;

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

var database = {
    'asd': [{
        linkedTab: 'Default',
        items: [
            {
                itemName: 'Tuna',
                amount: '1',
                isChecked: false,
            },
            {
                itemName: 'Jelly',
                amount: '4',
                isChecked: false,
            },
        ]
    },
    {
        linkedTab: 'AnotherOne',
        items: [
            {
                itemName: 'Apples',
                amount: '6',
                isChecked: false,
            },
            {
                itemName: 'eggs',
                amount: '2',
                isChecked: false,
            },
            {
                itemName: 'Potato',
                amount: '60',
                isChecked: false,
            }
        ]
    },
    ],
}
app.get("/api/getRoomData/:roomID", (req, res) => {
    const roomID = req.params.roomID;
    if (!roomID || typeof database[roomID] === 'undefined') {
        res.sendStatus(404);
        return
    }
    console.log("ROOM ID RECIEVED: " + roomID)
    res.json(database[roomID]);
});

app.get("/api/ping", (req, res) => {
    console.log("Pinged!")
    res.end();
})
app.post("/api/update/:roomID", (req, res) => {
    const roomID = req.params.roomID;
    if (!roomID || typeof database[roomID] === 'undefined') {
        res.sendStatus(404);
        return
    }

    const body = req.body;
    if (typeof body.groceries !== 'undefined') {
        database[roomID] = body.groceries
    }
    console.log(body)
    res.sendStatus(200)
})