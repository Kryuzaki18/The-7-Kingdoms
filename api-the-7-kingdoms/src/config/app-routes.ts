const API_BASE_URL = "https://anapioficeandfire.com/api";

export const ROUTES = {
  AUTH: {
    ME: "me",
    LOGIN: "login",
    SIGNUP: "signup",
    LOGOUT: "logout",
  },
};

export const EXT_ROUTES = {
  ALL_BOOKS: `${API_BASE_URL}/books`,
  BOOKS: (id: number) => `${API_BASE_URL}/books/${id}`,

  ALL_CHARACTERS: (page: number, size: number, name?: string, gender?: string) => {
    let url = `${API_BASE_URL}/characters?page=${page}&pageSize=${size}`;
    if (name?.trim()) {
      const formatted = name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      url += `&name=${encodeURIComponent(formatted)}`;
    }
    if (gender === 'Male' || gender === 'Female') {
      url += `&gender=${gender}`;
    }
    return url;
  },
  CHARACTER_INFO: (id: number) => `${API_BASE_URL}/characters/${id}`,

  ALL_HOUSES: (page: number, size: number, name?: string, region?: string) => {
    let url = `${API_BASE_URL}/houses?page=${page}&pageSize=${size}`;
    if (name?.trim()) {
      // Correct House Stark of Winterfell
      // Wrong House%20Stark%20Of%20Winterfell
      url += `&name=${encodeURIComponent(name)}`;
    }

    if(region?.trim()) {
      // Correct Beyond the Wall or Beyond%20the%20Wall
      // Wrong Beyond The Wall or Beyond%20The%20Wall
      url += `&region=${encodeURIComponent(region)}`;
    }
    return url;
  },
  HOUSE_INFO: (id: number) => `${API_BASE_URL}/houses/${id}`,
};
