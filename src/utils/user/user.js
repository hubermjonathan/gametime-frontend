import networker from '../networker/networker';
import API_URL from '../API_URL';

/**
 * Returns the response body of the user request.
 *
 * @param {String} user_id The uuid of the user.
 * @return {data} the contents of the response body of the user request.
 */
export async function getUser() {
  const endpoint = `${API_URL}/user`;

  try {
    const response = await networker.get(endpoint);

    const user = {
      id: response.data.user_id,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email_address: response.data.email,
      profile_picture: response.data.profile_picture,
      default_phone_number: response.data.phone_number,
      extra_phone_numbers: response.data.extra_phone_numbers,
      teams: response.data.teams,
      groups: response.data.groups,
    };

    return {
      success: true,
      error: false,
      user: user,
    };
  } catch (error) {
    // Assume all non 2xx status codes are un-recoverable
    return {
      success: false,
      error: true,
      user: null,
    };
  }
}

/**
 * Adds a phone number to a particular user account
 *
 * @param {String} user_id The uuid of the user.
 * @param {String} phone_number The phone number to be added to the user's list.
 * @return {message} whether or not the request succeeded.
 */
export async function addPhoneNumber(user_id, phone_number) {
  const endpoint = `${API_URL}/user/phone/add`;

  const data = {
    id: user_id,
    phone: phone_number,
  };
  try {
    await networker.post(endpoint, data);
    return '';
  } catch (e) {
    return e.response.data.reason;
  }
  // TODO: Return success and error in response body from server
}

/**
 * Removes an existing phone number from a particular user account
 *
 * @param {String} user_id The uuid of the user.
 * @param {String} phone_number The phone number to be from the user's list.
 * @return {bool} whether or not the request succeeded.
 */
export async function removePhoneNumber(user_id, phone_number) {
  const endpoint = `${API_URL}/user/phone/remove`;

  const data = {
    id: user_id,
    phone: phone_number,
  };

  const response = await networker.post(endpoint, data);

  if (response.status !== 200) {
    return false;
  }

  // TODO: Return success and error in response body from server

  return true;
}

/**
 * Gets current profile picture of user
 */
export async function getProfilePicture(user_id) {
  const endpoint = `${API_URL}/user/profilePicture`;

  const data = {
    id: user_id,
  };

  const response = await networker.get(endpoint, data);

  if (response.status !== 200) {
    return false;
  }

  return response.data.profile_picture;
}

export async function setProfilePicture(user_id, picture, isFirst) {
  const endpoint = `${API_URL}/user/profilePicture`;

  const data = {
    id: user_id,
    profile_picture: picture,
  };

  if (isFirst) {
    const response = await networker.post(endpoint, data);
    if (response.status !== 200) {
      return false;
    }
    return response;
  }
  const response = await networker.put(endpoint, data);
  if (response.status !== 200) {
    return false;
  }
  return response;
}
