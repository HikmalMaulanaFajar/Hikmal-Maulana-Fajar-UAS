const express = require('express');
const app = express();
const port = 3000; 
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const users = {
    "example@gmail.com": {
        "password": "123456",
        "name": "Farhan Kebab",
        "mobile_phone": "0888-1726-4647",
        "gender": "Male",
        "birthdate": "2000-01-01",
        "birthplace":"Tangerang",
        "address": "Graha Sudirman, Gd, Jl. Jenderal Sudirman No.1-3, RT.001/RW.004, Babakan, Kec. Tangerang, Kota Tangerang, Banten 15118",
        "photo":"https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
        "products": [
            {
                "id": "P001",
                "title": "Kebab Premium",
                "description": "Kebab daging sapi dengan saus istimewa khas Farhan.",
                "price": 25000,
                "stock": 30,
                "production_date": "2025-10-01"
            },
            {
                "id": "P002",
                "title": "Kebab Ayam Spesial",
                "description": "Kebab isi ayam pedas dengan sayur segar dan saus keju.",
                "price": 22000,
                "stock": 45,
                "production_date": "2025-10-05"
            }
        ]
    },
    "example2@gmail.com": {
        "password": "123456",
        "name": "Sigit Rendang",
        "mobile_phone": "0888-1234-567",
        "gender": "Male",
        "birthdate": "2002-02-02",
        "birthplace":"Tangerang",
        "address": "Graha Sudirman, Gd, Jl. Jenderal Sudirman No.1-3, RT.001/RW.004, Babakan, Kec. Tangerang, Kota Tangerang, Banten 15118",
        "photo":"https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "products": [
            {
                "id": "P101",
                "title": "Rendang Daging Asli Padang",
                "description": "Rendang daging sapi asli dengan bumbu kental khas Minang.",
                "price": 45000,
                "stock": 25,
                "production_date": "2025-09-25"
            },
            {
                "id": "P102",
                "title": "Rendang Ayam Suwir",
                "description": "Ayam suwir lembut dengan bumbu rendang pedas gurih.",
                "price": 35000,
                "stock": 40,
                "production_date": "2025-10-10"
            }
        ]
    },
}

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    var {email, password} = req.body;
    var userPassword = users[email].password;
    setTimeout(function(){
        if(userPassword === password){
                return res.status(200).json({"token": email + "|" + generateSecureRandomString(100)})
            }
            
            res.status(401).json({"message": "email atau password anda salah"});
    }, 2000)
    
});


app.get('/profile', (req, res) => {
    var token = req.headers['authorization'];
    if (!token){
        return res.status(401).json({"message": "invalid token"});
    }

    token = token.replace("Bearer ", "");
    token = token.split("|")
    if (token.length == 0){
        return res.status(401).json({"message": "invalid token"});
    }

    var email = token[0];
    var user = users[email];
    
    if (!user){
        return res.status(401).json({"message": "invalid token"});
    }

    return res.status(200).json(user);
    
});


app.get('/products', (req, res) => {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ "message": "invalid token" });
    }

    token = token.replace("Bearer ", "");
    token = token.split("|");
    if (token.length === 0) {
        return res.status(401).json({ "message": "invalid token" });
    }

    var email = token[0];
    var user = users[email];

    if (!user) {
        return res.status(401).json({ "message": "invalid token" });
    }

    return res.status(200).json(user.products || []);
});


// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});


function generateSecureRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}