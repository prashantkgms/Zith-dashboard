import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, IconButton, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';

const ProfileText = styled(Typography)`
  margin-bottom: 24px; /* Increased margin between text items */
  padding-right: 24px;
  color: ${(props) => props?.theme?.palette?.text?.primary}; /* Text color based on theme */
  
  strong {
    margin-right: 8px; /* Added margin-right of 8px after <strong> */
  }
`;

const StyledCard = styled.div`
  width: 600px;
  margin: 0 auto;
  background-color: ${(props) => props?.theme.palette?.background?.paper}; /* Card background based on theme */
  color: ${(props) => props.theme?.palette?.text?.primary}; /* Text color based on theme */
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px; /* Increased padding inside card */
`;

const EditProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px; /* Increased space from the profile info */
`;

const EditProfileButton = styled(Button)`
  padding: 12px 24px; /* Increased button padding */
`;

const StyledForm = styled.form`
  padding: 32px; /* Increased padding inside form */
`;

const Profile = () => {
  const { id, user, email, password } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(user);
  const [emailId, setEmail] = useState(email);
  const [passwordValue, setPasswordValue] = useState(password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordInDisplayMode, setShowPasswordInDisplayMode] = useState(false);

  const theme = useTheme(); 

  useEffect(() => {
    setUsername(user);
    setEmail(email);
    setPasswordValue(password);
  }, [user, email, password]);

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordInDisplayMode = () => {
    setShowPasswordInDisplayMode(!showPasswordInDisplayMode);
  };

  return (
    <div className="mr-8 ml-8">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <StyledCard theme={theme}>
            <Typography variant="h5" component="h2" gutterBottom>
              Profile Details
            </Typography>

            {!isEditing ? (
              <div>
                <ProfileText variant="body1" paragraph theme={theme}>
                  <strong>Username:</strong> {username}
                </ProfileText>
                <ProfileText variant="body1" paragraph theme={theme}>
                  <strong>Email:</strong> {emailId}
                </ProfileText>
                <ProfileText variant="body1" paragraph theme={theme}>
                  <strong>Password:</strong>
                  {showPasswordInDisplayMode ? passwordValue : '********'}
                  <IconButton onClick={handleTogglePasswordInDisplayMode} edge="end">
                    {showPasswordInDisplayMode ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </ProfileText>

                <EditProfileButtonWrapper>
                  <EditProfileButton
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </EditProfileButton>
                </EditProfileButtonWrapper>
              </div>
            ) : (
              <StyledForm onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <EditProfileButtonWrapper>
                  <EditProfileButton variant="contained" color="primary" type="submit">
                    Save Changes
                  </EditProfileButton>
                </EditProfileButtonWrapper>
              </StyledForm>
            )}
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
