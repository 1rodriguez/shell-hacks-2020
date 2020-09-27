import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button, Typography } from "@material-ui/core";

import ParticlesBg from "particles-bg";

import { storage } from "../firebase";
import ResultPage from "./ResultPage";

const useStyles = makeStyles((theme) => ({
  body: {
    width: "100%",
  },
  title: {
    color: "#ffffff",
  },
  subhead: {
    color: "inherit",
  },
  button: {
    marginTop: 20,
    color: "#00FFFF",
  },
}));

const SubmitPage = () => {
  const classes = useStyles();

  const [PDF, setPDF] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imgInput");
    fileInput.click();
  };

  const handleImageChange = (event) => {

    if (event.target.files[0]) {
      // const image = event.target.files[0]
      // const formData = new FormData()
      // setPDF(URL.createObjectURL(event.target.files[0]));
      const PDF2 = event.target.files[0]
      const formData = new FormData()
      setPDF(event.target.files[0])
      formData.append('image', PDF2, PDF2.name)
      
   
        console.log(PDF2.name)
      
      
      handleUpload(PDF2.name)
    }
   
  };

  const handleUpload = (name) => {
    console.log(name)
    const uploadTask = storage.ref(`pdfs/${name}`).put(PDF);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("pdfs")
          .child(PDF.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  }
  

  return (
    <div className={classes.body}>
      {}
      <ParticlesBg color="#FF00F7" type="cobweb" num={40} bg={true} />

      <Typography variant="h1" className={classes.title}>
        tinder for jobs 🔥
      </Typography>
      <div className={classes.button}>
        <Button
          variant="outlined"
          className={classes.button}
          color={"inherit"}
          onClick={handleEditPicture}
        >
          <Typography variant="h3" className={classes.subhead}>
            gimme resume 🍽
          </Typography>
        </Button>
      </div>
      

      <input
        type="file"
        id="imgInput"
        onChange={handleImageChange}
        hidden="hidden"
      />

      <ResultPage PDF={PDF}/>
    </div>
  );
};
export default SubmitPage;
