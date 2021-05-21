import React, { useState } from 'react';
import { uploadImage } from "../lib/firebase";

function UploadImage({userImage, changeImage }){
    const [isModal, setIsModal] = useState(false);
    const active = isModal ? "is-active" : "";
    const [imgPath, setImgPath] = useState(userImage);

    const saveImage = async event => {
        const image = event.target.files[0];
        const imgPath = await uploadImage(image);
        changeImage(imgPath);
        setImgPath(imgPath);
    };

    const DisplayAvatar = () => {
        if (!imgPath) {
            return <img src="https://unghotoi.com/data/avatar/1563812308NtB_avatar_user.png" />
        } else {
            return (
                <div>
                    <img src={imgPath} />
                </div>
            ) 
        }
    }

    return(
        <div className="App">
          <div className={`modal ${active}`}>
            <div class="modal-background"></div>
            <div class="modal-content-width">
              <div class="file is-boxed" >
                <label class="file-label">
                  <input class="file-input" type="file" name="resume" onChange={saveImage} />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">画像を選択してください</span>
                  </span>
                </label>
              </div>
              <button class="modal-close is-large" aria-label="close" onClick={() => {setIsModal(!isModal);}}></button>
            </div>
          </div>
          <button onClick={() => {setIsModal(!isModal);}} class="button is-primary is-inverted">
              <DisplayAvatar />
          </button>
        </div >
    )
}

export default UploadImage;