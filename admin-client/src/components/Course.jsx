import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import {Loading} from "./Loading";
import { BASE_URL } from "../config.js";
import { courseState } from "../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage } from "../store/selectors/course";

function Course() {
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    useEffect(() => {
        axios.get(`${BASE_URL}/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse({isLoading: false, course: res.data.course});
        })
        .catch(e => {
            setCourse({isLoading: false, course: null});
        });
    }, []);

    if (courseLoading) {
        return <Loading />
    }

    return <div>
        <GrayTopper />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>

}

// title: title,
// description: description,
// imageLink: imageLink,
// referencelink:referencelink,
// deadline:deadline

function UpdateCard() {
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [imageLink, setImage] = useState(courseDetails.course.imageLink);
    const[deadline, setDeadline] = useState(courseDetails.course.deadline);
   

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update Task details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={imageLink}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={deadline}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDeadline(e.target.value)
                }}
                fullWidth={true}
                label="DeadLine"
                variant="outlined"
            />

            <Button
                variant="contained"
                onClick={async () => {
                    axios.put(`${BASE_URL}/admin/courses/` + courseDetails.course._id, {
                        title: title,
                        description: description,
                        imageLink: imageLink,
                       deadline:deadline
                    }, {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    let updatedCourse = {
                        _id: courseDetails.course._id,
                        title: title,
                        description: description,
                        imageLink: imageLink,
                        deadline:deadline
                        
                    };
                    setCourse({course: updatedCourse, isLoading: false});
                }}
            > Update Task</Button>
        </div>
    </Card>
</div>
}

function CourseCard(props) {
    const title = useRecoilValue(courseTitle);
    const imageLink = useRecoilValue(courseImage);

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={imageLink} style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{title}</Typography>
            
        </div>
    </Card>
    </div>
}



export default Course;