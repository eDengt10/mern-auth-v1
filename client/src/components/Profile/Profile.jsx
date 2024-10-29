// ProfilePage.jsx
import {  Edit, User } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/Profile/Profile.scss";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const profileData = useSelector((state)=>state.user.user)
    

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
                        {profileData?.avatar ? (
                            <img src={`http://localhost:3001${profileData?.avatar}`} alt={"<User /> "} />
                        ) : (
                            
                            <User />
                        )}
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__info-group">
                        <span className="profile__info-label">Name :</span>
                        <span className="profile__info-value">
                            {profileData.name}
                        </span>
                    </div>
                    <div className="profile__info-group">
                        <span className="profile__info-label">Email :</span>
                        <span className="profile__info-value">
                            {profileData.email}
                        </span>
                    </div>
                    <div className="profile__info-group">
                        <span className="profile__info-label">
                            Phone Number :
                        </span>
                        <span className="profile__info-value">
                            {profileData.phone}
                        </span>
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