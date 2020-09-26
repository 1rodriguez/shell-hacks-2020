import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button, Typography } from "@material-ui/core";

import ParticlesBg from "particles-bg";

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

const handleEditPicture = () => {
    const fileInput = document.getElementById("imgInput")
    fileInput.click()
}

const  handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(formData)
}

const SubmitPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <ParticlesBg color="#FF00F7" type="cobweb" num={40} bg={true} />

      <Typography variant="h1" className={classes.title}>
        tinder for jobs 🔥
      </Typography>
      <div className={classes.button}>
     
        <Button variant="outlined" className={classes.button} color={"inherit"} onClick={handleEditPicture}>
          <Typography variant="h3" className={classes.subhead} >
            gimme resume 🍽
          </Typography>
        </Button>
      </div>

      <input 
                            type="file" 
                            id="imgInput" 
                            onChange={handleImageChange}
                            hidden='hidden'
                          />
    </div>
  );
};
export default SubmitPage;
