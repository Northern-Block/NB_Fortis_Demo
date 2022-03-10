import * as React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Checkbox, FormControlLabel, Modal } from "@mui/material";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import upload_icon from "../../assets/image/upload_icon.svg";
import close_icon from "../../assets/image/close_icon.svg";
import "./modify-files.scss";

// large Modal Style
const mediumModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 481,
  borderRadius: 4,
};

export default function Modify() {
  // Editor JS
  EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState: any) => {
    // console.log(editorState)
    setEditorState(editorState);
  };

  // file Preview JS
  const [filePreviewOpen, setFilePreviewOpen] = React.useState(false);
  const filePreviewClick = () => setFilePreviewOpen(true);
  const filePreviewClose = () => setFilePreviewOpen(false);

  return (
    <>
      {/* Header HTML Start*/}
      {/* <Header /> */}
      {/* Header HTML End*/}

      {/* Sidebar HTML Start*/}
      {/* <Sidebar /> */}
      {/* Sidebar HTML End*/}
      <div className="wrapper">
        <div className="main-content modify-files">
          <div className="file-search">
            <div className="search-right">
              <Button variant="outlined">
                Click or Drag to Add New File
                <em>
                  <img src={upload_icon} alt="upload" />
                </em>
                <input type="file" />
              </Button>
            </div>
          </div>

          <div className="file-box-outer">
            <div className="file-box-inner">
              <h2>Add Original File</h2>
              {/* <h2>Add Modified File</h2> */}
              <Button
                variant="contained"
                endIcon={
                  <em>
                    <img src={upload_icon} alt="upload" />
                  </em>
                }
              >
                CHOOSE FILES
                <input type="file" />
              </Button>
              <span>or drop files here</span>
            </div>
            <div className="file-preview-box d-none">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                cumque, nisi eveniet tempore sequi error voluptas tenetur non,
                dignissimos, officiis tempora pariatur. Quisquam itaque magnam
                nobis perferendis a dolores eaque!
              </p>
              {/* <em><img src={close_icon} alt="close" /></em> */}
              <div className="file-name">
                <h3 className="h3">File_Name_1</h3>
              </div>
            </div>
              <div className="d-none">
              <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              placeholder="Add Comment ... (Minimum 150 characters)"
            />
              </div>
           
                <div  className="d-none">

                <div className="preview-show-main">
              <div className="preview-show-outer">
                <div
                  className="preview-box-show"
                  onClick={filePreviewClick}
                  role="button"
                  tabIndex={0}
                >
                  <div className="preview-box-main">
                  <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Soluta est praesentium odit, ipsam deserunt
                        aliquid voluptatem inventore! Ducimus fuga beatae quae,
                        eum temporibus quisquam. Dicta voluptate ipsam fugiat
                        dolor expedita.
                      </p>
                  <div className="file-name">
                <h3 className="h3">File_Name_1</h3>
              </div>
                    </div>
                  <Button>Replace File</Button>
                </div>
                <Modal
                  open={filePreviewOpen}
                  onClose={filePreviewClose}
                  aria-labelledby="file-preview-title"
                  aria-describedby="file-preview-description"
                  className="modal-outer"
                >
                  <div className="modal-medium" style={mediumModalStyle}>
                    <em
                      className="close-button"
                      onClick={filePreviewClose}
                      onKeyDown={filePreviewClose}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={close_icon} alt="close" />
                    </em>
                    <p className="h5">Sample text</p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Nesciunt, dolorum id nemo blanditiis rerum esse aliquid
                      recusandae magni, mollitia tenetur sunt dolores reiciendis
                      nisi, maxime non temporibus. Eligendi, quaerat inventore.
                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Nesciunt, dolorum id nemo blanditiis rerum esse aliquid
                      recusandae magni, mollitia tenetur sunt dolores reiciendis
                      nisi, maxime non temporibus. Eligendi, quaerat inventore.
                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Nesciunt, dolorum id nemo blanditiis rerum esse aliquid
                      recusandae magni, mollitia tenetur sunt dolores reiciendis
                      nisi, maxime non temporibus. Eligendi, quaerat inventore.
                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Nesciunt, dolorum id nemo blanditiis rerum esse aliquid
                      recusandae magni, mollitia tenetur sunt dolores reiciendis
                      nisi, maxime non temporibus. Eligendi, quaerat inventore.
                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Nesciunt, dolorum id nemo blanditiis rerum esse aliquid
                      recusandae magni, mollitia tenetur sunt dolores reiciendis
                      nisi, maxime non temporibus. Eligendi, quaerat inventore.
                    </p>
                  </div>
                </Modal>
                <div
                  className="preview-box-show"
                  onClick={filePreviewClick}
                  role="button"
                  tabIndex={0}
                >
                  <div className="preview-box-main">
                  <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Soluta est praesentium odit, ipsam deserunt
                        aliquid voluptatem inventore! Ducimus fuga beatae quae,
                        eum temporibus quisquam. Dicta voluptate ipsam fugiat
                        dolor expedita.
                      </p>
                  <div className="file-name">
                <h3 className="h3">File_Name_1</h3>
              </div>
                    </div>
                  <Button>Replace File</Button>
                </div>
              </div>
            </div>

            <div className="comment-box">
              <div className="comment-header">
                <h2 className="h2">Comment</h2>
                <Button>Edit</Button>
              </div>

              <div className="comment-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer sit amet orci faucibus, placerat enim nec, fringilla
                  felis. Sed et vestibulum diam, vel ullamcorper libero. In
                  posuere eros quam, a suscipit turpis aliquet et. Sed elementum
                  malesuada consectetur. Ut nunc mi, ullamcorper sed leo sed,
                  tempus facilisis ipsum. Nullam ut dapibus risus, at placerat
                  massa. Integer porttitor elit at arcu feugiat, sed gravida
                  nulla varius. Suspendisse potenti. Orci varius natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Nunc venenatis pellentesque urna, sit amet tristique
                  risus rhoncus vel. Mauris commodo convallis enim id cursus. In
                  pulvinar aliquam felis, eget vulputate felis placerat ut.
                  Proin at dui sodales, molestie sapien ut, vestibulum sem. Cras
                  ut nisi eu ipsum feugiat ultrices a ac purus.
                </p>

                <FormControlLabel control={<Checkbox />} label="Confirm" />
              </div>
            </div>
                  </div>
           

            <div className="step-outer">
              <ul>
                <li className="active"></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <Button variant="contained" color="primary" disabled>
                Next
              </Button>
              {/* <Button variant="contained" color="primary">
                Submit
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      {/* Footer HTML Start*/}
      <Footer />
      {/* Footer HTML End*/}
    </>
  );
}
