import express from "express";
import axios from "axios";
import multer from "multer";
import bodyParser from "body-parser";
import FormData from "form-data";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
    try{
        //create a new form data
        const identificationRequest = new FormData();
        
        
        const fileBlob = Buffer.from(req.file.buffer, "base64");
        identificationRequest.append("organs", req.body.organs);
        identificationRequest.append("images", fileBlob, req.file.originalname);
        const identificationResponse = await axios.post(`https://my-api.plantnet.org/v2/identify/all?include-related-images=true&no-reject=false&lang=en&api-key=2b10y4v0e005Y3nzwf9zYpOsO`, 
        //addmultipart form data
        identificationRequest,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json"
            }
        });
        res.send(identificationResponse.data.results);
    }
    catch(error){
        console.log("Error", error);
        res.send("Something went wrong");
    }
});

app.get("/", (req, res) => {
    res.send("Hellooo Sempai");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});