// ProfilePage.jsx
import { useRef, useState } from "react";
import {  Edit, User } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/Profile/Profile.scss";

const ProfilePage = () => {
    const [profileData] = useState({
        name: "Sarah Anderson",
        email: "sarah.anderson@example.com",
        phone: "+1 (555) 123-4567",
    });

    return (
        <div className="profile">
            <div className="profile__card">
                <div className="profile__header">
                    <h1 className="profile__header-title">Profile</h1>
                    <Link to="/edit-profile" className="profile__header-link">
                        <button className="profile__header-button">
                            <Edit />
                            <span>Edit Profile</span>
                        </button>
                    </Link>
                </div>
                <div className="profile__avatar">
                    <div className="profile__avatar-image">
                        <User />
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__info-group">
                        <span className="profile__info-label">Name</span>
                        <div className="profile__info-value">
                            {profileData.name}
                        </div>
                    </div>
                    <div className="profile__info-group">
                        <span className="profile__info-label">Email</span>
                        <div className="profile__info-value">
                            {profileData.email}
                        </div>
                    </div>
                    <div className="profile__info-group">
                        <span className="profile__info-label">
                            Phone Number
                        </span>
                        <div className="profile__info-value">
                            {profileData.phone}
                        </div>
                    </div>
                </div>
                <div className="profile__card-linktohome">
                    <Link to="/home" className="profile__card-linktohome__link">
                        <button className="profile__card-linktohome__link-button">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;