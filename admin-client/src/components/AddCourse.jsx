import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Card} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { BASE_URL } from "../config.js"
function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImage] = useState("");
    const [referencelink, setReference] = useState("");
    const [deadline, setDeadline] = useState("");

    return <div style={{display: "flex", justifyContent: "center", minHeight: "80vh", justifyContent: "center", flexDirection: "column"}}>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{width: 400, padding: 20, marginTop: 30, height: "100%"}}>
                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setReference(e.target.value)
                    }}
                    fullWidth={true}
                    label="Refrence Link"
                    variant="outlined"
                />

                    <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setDeadline(e.target.value)
                    }}
                    fullWidth={true}
                    label="DeadLine"
                    variant="outlined"
                />

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        await axios.post(`${BASE_URL}/admin/courses`, {
                            title: title,
                                description: description,
                                imageLink: imageLink,
                                referencelink:referencelink,
                               deadline:deadline

                        }, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Added Task!");
                    }}
                > Add Task</Button>
            </Card>
        </div>
    </div>
}

export default AddCourse;