const express = require("express");

const PORT = 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const groceries = [
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

const lists = [
    {
        label: "Default"
    },
    {
        label: "AnotherOne"
    },
    {
        label: "Test"
    }
]

app.get("/api/getGroceries", (req, res) => {
    res.json(groceries);
});
app.get("/api/getLists", (req, res) => {
    res.json(lists);
});