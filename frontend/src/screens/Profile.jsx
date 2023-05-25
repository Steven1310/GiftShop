import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const getProfileData = async () => {
            await fetch("http://localhost:5000/api/profileData")
                .then((res) => res.json())
                .then((res) => {
                    setProfileData(res);
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        //getProfileData();
    }, [])

    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleUpload = () => {
        // Add your upload logic here
        // You can use profilePicture state to access the selected file and upload it
        console.log(profilePicture);
    };

    return (
        <div className="container">
            <form className='form'>
                <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                    <input type="file" className="form-control" id="profilePicture" onChange={handlePictureUpload} ></input>
                    <div className="form-text">Select an image for your profile picture.</div>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpload}>Upload</button>
            </form>
        </div>
    );
};

export default Profile;
