import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from "../../App";

const Profile = () => {
    const { user, setUser } = useContext(MyContext);  // Global user context

    // Local state for editing
    const [profile, setProfile] = useState(() => user || {
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        city: "",
        state: "",
        pincode: "",
        birthdate: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(profile)); // Save updates
    }, [profile]);

    const handleChange = (e) => {
        setProfile(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = () => {
        setUser(profile);  // Update global context
        localStorage.setItem("user", JSON.stringify(profile)); // Store in local storage
        setIsEditing(false);
    };

    const handleCancel = () => {
        setProfile(user);  // Reset changes
        setIsEditing(false);
    };

    const renderField = (label, value) => (
        <p><strong>{label}:</strong> {value || <span className="underline-placeholder">_________</span>}</p>
    );

    return (
        <div className="container mt-4 p-4 border rounded shadow">
            <h2 className="mb-4 text-center">Profile</h2>

            {!isEditing ? (
                <div>
                    {renderField("Name", profile.name)}
                    {renderField("Email", profile.email)}
                    {renderField("Phone", profile.phone)}
                    {renderField("Address", profile.address)}
                    {renderField("Gender", profile.gender)}
                    {renderField("City", profile.city)}
                    {renderField("State", profile.state)}
                    {renderField("Pincode", profile.pincode)}
                    {renderField("Birthdate (Optional)", profile.birthdate)}

                    <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <div>
                    <label className="form-label">Name:</label>
                    <input type="text" name="name" value={profile.name} onChange={handleChange} className="form-control" placeholder="Enter name" />

                    <label className="form-label mt-2">Email:</label>
                    <input type="email" name="email" value={profile.email} onChange={handleChange} className="form-control" placeholder="Enter email" />

                    <label className="form-label mt-2">Phone:</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="form-control" placeholder="Enter phone" />

                    <label className="form-label mt-2">Address:</label>
                    <textarea name="address" value={profile.address} onChange={handleChange} className="form-control" placeholder="Enter address"></textarea>

                    <label className="form-label mt-2">Gender:</label>
                    <select name="gender" value={profile.gender} onChange={handleChange} className="form-control">
                        <option value="">Enter gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label className="form-label mt-2">City:</label>
                    <input type="text" name="city" value={profile.city} onChange={handleChange} className="form-control" placeholder="Enter city" />

                    <label className="form-label mt-2">State:</label>
                    <input type="text" name="state" value={profile.state} onChange={handleChange} className="form-control" placeholder="Enter state" />

                    <label className="form-label mt-2">Pincode:</label>
                    <input type="text" name="pincode" value={profile.pincode} onChange={handleChange} className="form-control" placeholder="Enter pincode" />

                    <label className="form-label mt-2">Birthdate (Optional):</label>
                    <input type="date" name="birthdate" value={profile.birthdate} onChange={handleChange} className="form-control" />

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-success" onClick={handleSave}>Save Changes</button>&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
