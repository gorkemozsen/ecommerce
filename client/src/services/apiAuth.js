import apiClient from "./apiClient";

export async function signup({ email, password, firstName, lastName }) {
  const res = await apiClient.post("/auth/register", {
    email,
    password,
    firstName,
    lastName,
  });

  return res.data;
}

export async function signin({ email, password }) {
  const res = await apiClient.post("/auth/login", {
    email,
    password,
  });

  const { token } = res.data;

  localStorage.setItem("accessToken", token);

  return res.data;
}

export async function logout() {
  await apiClient.post("/auth/logout", {});
  localStorage.removeItem("accessToken");
}

export async function getUser() {
  const res = await apiClient.get("/auth/user");
  return res.data;
}

export async function updateEmail({ currentPassword, newEmail }) {
  const res = await apiClient.put(
    "/auth/update-email", // API endpointi
    {
      currentPassword, // Mevcut şifreyi gönderiyoruz
      newEmail, // Yeni e-posta
    }
  );

  return res.data; // Backend'ten dönen başarılı sonucu döndürüyoruz
}

export async function updatePassword({
  currentPassword,
  newPassword,
  confirmNewPassword,
}) {
  const res = await apiClient.put(
    "/auth/update-password", // API endpointi
    {
      currentPassword, // Mevcut şifreyi gönderiyoruz
      newPassword, // Yeni şifre
      confirmNewPassword, // Yeni şifre onayı
    }
  );

  return res.data; // Backend'ten dönen başarılı sonucu döndürüyoruz
}
