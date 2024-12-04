import axios from "axios";

export async function signup({ email, password, firstName, lastName }) {
  try {
    console.log(firstName, lastName);
    const res = await axios.post("http://127.0.0.1:3001/api/auth/register", {
      email,
      password,
      firstName,
      lastName,
    });

    console.log("Successfully registered!", res.data);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during registration.";
    throw new Error(errorMessage);
  }
}

export async function signin({ email, password }) {
  try {
    const res = await axios.post("http://127.0.0.1:3001/api/auth/login", {
      email,
      password,
    });

    const { token } = res.data;

    localStorage.setItem("accessToken", token);

    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error("Email, password combination is not valid.", error.message);
  }
}

export async function logout() {
  try {
    await axios.post(
      "http://127.0.0.1:3001/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export async function getUser() {
  try {
    const token = localStorage.getItem("accessToken");

    if (token === null) throw new Error("token is null");

    const res = await axios.get("http://127.0.0.1:3001/api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    // Axios hata objesini kontrol et
    if (error.response?.status === 401) {
      throw new Error("Unauthorized"); // 401 durumunda bir hata fırlat
    }

    throw new Error(error.message || "An error occurred while fetching user");
  }
}

export async function updateEmail({ currentPassword, newEmail }) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.put(
      "http://127.0.0.1:3001/api/auth/update-email", // API endpointi
      {
        currentPassword, // Mevcut şifreyi gönderiyoruz
        newEmail, // Yeni e-posta
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token ile yetkilendirme
        },
      }
    );

    console.log("Email update success:", res.data);
    return res.data; // Backend'ten dönen başarılı sonucu döndürüyoruz
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function updatePassword({
  currentPassword,
  newPassword,
  confirmNewPassword,
}) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.put(
      "http://127.0.0.1:3001/api/auth/update-password", // API endpointi
      {
        currentPassword, // Mevcut şifreyi gönderiyoruz
        newPassword, // Yeni şifre
        confirmNewPassword, // Yeni şifre onayı
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token ile yetkilendirme
        },
      }
    );

    console.log("Password update success:", res.data);
    return res.data; // Backend'ten dönen başarılı sonucu döndürüyoruz
  } catch (error) {
    console.log(error.response?.data?.message);
    throw new Error(error.response?.data?.message);
  }
}
