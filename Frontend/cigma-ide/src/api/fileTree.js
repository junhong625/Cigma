import axios from "axios";
import { saveAs } from "file-saver";

export const fileTreeUpdate = async () => {
  try {
    const response = await axios.get("/api");
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("fileTreeUpdate error", error);
  }
};

export const fileTextUpdate = async (data) => {
  try {
    const response = await axios.put("/api", data);
  } catch (error) {
    console.error("fileTextUpdate error", error);
  }
};

export const deleteFolder = async (name, filepath) => {
  try {
    const response = await axios.delete(
      `/api/rmdir?name=${name}&path=${filepath}`
    );
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("deleteFolder error", error);
  }
};

export const deleteFile = async (name, filepath) => {
  try {
    const response = await axios.delete(`/api?name=${name}&path=${filepath}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("deleteFile error", error);
  }
};

// 프로젝트 파일 다운로드
export const projectDownload = async () => {
  try {
    const response = await axios.get("/api/download", {
      responseType: "blob",
    });
    const blob = new Blob([response.data]); // Blob 객체 생성
    saveAs(blob, "project.zip"); // 압축 파일 다운로드
  } catch (error) {
    console.error("Error downloading archive", error);
  }
};

// 파일 업데이트
export const fileUpdate = async (formData) => {
  try {
    const response = await axios.post("/api/upload", formData);
  } catch (error) {
    console.error("fileUpdate error", error);
  }
};

export const fileMoveUpdate = async (name, path, destination) => {
  try {
    const response = await axios.put("/api/move", {
      name,
      path,
      destination,
    });
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("fileMoveUpdate error", error);
  }
};

// express 관련
export const expressFolder = async (name, path) => {
  try {
    const response = await axios.post("/api/folder", { name, path });
    console.log(response.data.message);
  } catch (error) {
    console.error("expressFolder error", error);
  }
};

export const expressFile = async (name, path) => {
  try {
    const response = await axios.post("/api/file", { name, path });
    console.log(response.data.message);
  } catch (error) {
    console.error("expressFile error", error);
  }
};

// 모나코에 넣을 내용 불러오기
export const loadFileContent = async (path) => {
  try {
    const response = await axios.post("/api/file/data", { path: "/" + path });
    return {
      data: response.data,
    };
  } catch (error) {
    console.error("loadFileContent error", error);
  }
};

// 파일 내용 수정 저장
export const saveFileContent = async (path, data) => {
  try {
    const response = await axios.put("/api/file/data", {
      path: path,
      data: data,
    });
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("saveFileContent error", error);
  }
};
