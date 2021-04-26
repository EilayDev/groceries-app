const bp = require('body-parser')
const express = require("express");

const PORT = 3001;

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

var groceries = [
    {
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
    {
        linkedTab: 'Saturday',
        items: [
            {
                itemName: 'Milk',
                amount: '1',
                isChecked: false,
            },
            {
                itemName: 'Banana',
                amount: '2',
                isChecked: false,
            },
            {
                itemName: 'Water',
                amount: '60',
                isChecked: false,
            }
        ]
    },
]

var lists = [
    {
        label: "Default"
    },
    {
        label: "AnotherOne"
    },
]

app.get("/api/getGroceries", (req, res) => {
    res.json(groceries);
});
app.get("/api/getLists", (req, res) => {
    res.json(lists);
});
app.get("/api/ping", (req, res) => {
    console.log("Pinged!")
    res.end();
})
app.post("/api/update", (req, res) => {
    const body = req.body;
    if (typeof body.groceries !== 'undefined'){
        groceries = body.groceries;
    }
    if (typeof body.lists !== 'undefined'){
        // New list
        lists = body.lists
    }
    console.log(body)
    res.sendStatus(200)
})