/**
 *  User shouldnt be able to enter the new-ticket route if they are not logged in
 * 
 */
import { useState, useEffect } from 'react';
// Bring in useSelector cause we need to select user from state to see if we're logged in
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Get use from the STATE
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    // check to see if user is there aka logged in
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    setCheckingStatus(false)
  }, [user]) // Run everytime [user] changes

  return { loggedIn, checkingStatus }
}

