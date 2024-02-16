import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../FirebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, list, ref, uploadBytes } from 'firebase/storage';
import { useUser } from './UserContext';


function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

  const { user } = useUser();
  const userEmail = user?.email;

  useEffect(() => {
    if (user) {
      // List all images for the user
      const userImagesRef = ref(storage, `Img/${userEmail}`);
      list(userImagesRef)
        .then((result) => {
          // Get download URLs for each image
          const promises = result.items.map((imageRef) =>
            getDownloadURL(imageRef).then((url) => ({ url, name: imageRef.name }))
          );

          // Wait for all promises to resolve
          return Promise.all(promises);
        })
        .then((downloadURLs) => {
          setUploadedImages(downloadURLs);
        })
        .catch((error) => {
          console.error('Error listing images:', error);
        });
    }
  }, [user, userEmail]);

  const handleLogout = () => {
    // Implement your logout logic here
    navigate('/');
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error('No file selected.');
      alert('No file selected');
      return;
    }

    // Path for the user's images
    const imgs = ref(storage, `Img/${userEmail}/${v4()}`);

    uploadBytes(imgs, selectedFile)
      .then((data) => {
        // Using data.metadata.name to get the file name
        return getDownloadURL(data.ref).then((val) => ({
          url: val,
          name: data.metadata.name,
        }));
      })
      .then((imageInfo) => {
        // Updating the list of uploaded images
        setUploadedImages((prevImages) => [...prevImages, imageInfo]);
        alert('Image uploaded successfully')
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      });

    setSelectedFile(null);
  };

  return (
    <div>
      <div>
        <nav className="navbar navbar-light custom-navbar">
          <div className="container-fluid">
            <a className="navbar-brand">OG - OnlineGallery</a>
            <button className="btn custom-btn" type="submit" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </div>
      <form className="form">
        <div>
          <h2>
            Would you like to upload your images?
            <br />If yes, use the below option
          </h2>
        </div>
        <div className="field">
          <label htmlFor="imageInput">Choose Image:</label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-button">
          <button className="button" type="button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </form>
      <div className='images'>
        <h2>Previously Uploaded Images:</h2>
        {uploadedImages.length === 0 ? (
          <p>No images uploaded.</p>
        ) : (
          <div>
            {uploadedImages.map((image) => (
              <img
                key={image.name}
                src={image.url}
                alt={image.name}
                style={{ maxWidth: '200px', margin: '10px' }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
