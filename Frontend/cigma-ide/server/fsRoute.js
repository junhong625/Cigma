import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

const ROOT_FOLDER = "../../workspace/project";

// 파일 업로드 설정 (multer : 디스크 저장)
const setStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ROOT_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: setStorage });

// 파일 목록 받기
router.get("/", (req, res) => {
  const result = [];

  function traverseDir(currentPath, parentFolder) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        // 디렉토리인 경우 재귀적으로 탐색
        const folder = {
          id: result.length + 1,
          parent: parentFolder,
          droppable: true,
          text: file,
        };
        result.push(folder);
        traverseDir(fullPath, folder.id);
      } else {
        // 파일인 경우 현재 폴더에 추가
        const ext = path.extname(file);
        const data = {
          fileType: ext.slice(1),
          fileSize: `${(stats.size / 1024 / 1024).toFixed(1)}MB`,
        };
        const fileObj = {
          id: result.length + 1,
          parent: parentFolder,
          droppable: false,
          text: file,
          data: data,
        };
        result.push(fileObj);
      }
    }
  }

  traverseDir(ROOT_FOLDER, 0);

  res.json(result);
});

// 파일 생성
router.post("/file", (req, res) => {
  const { name, path: filePath } = req.body;
  const fullPath = path.join(ROOT_FOLDER, filePath, name);

  fs.writeFile(fullPath, "", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ message: "File created successfully" });
    }
  });
});

// 폴더 생성
router.post("/folder", (req, res) => {
  const { name, path: folderPath } = req.body;
  const fullPath = path.join(ROOT_FOLDER, folderPath, name);

  fs.mkdir(fullPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ message: "Folder created successfully" });
    }
  });
});

// 파일 삭제
router.delete("/", (req, res) => {
  const { name, path: filePath } = req.query;
  const fullPath = path.join(ROOT_FOLDER, filePath, name);
  console.log(fullPath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ message: "File deleted successfully" });
    }
  });
});

// 폴더 삭제
router.delete("/rmdir", (req, res) => {
  const { name, path: filePath } = req.query;
  const fullPath = path.join(ROOT_FOLDER, filePath, name);
  console.log(fullPath);

  function removeDir(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file) => {
        const curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          removeDir(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }

  try {
    removeDir(fullPath);
    res.json({ message: "Folder deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// 파일/폴더 이름 변경
router.put("/", (req, res) => {
  const { oldName, newName, path: filePath } = req.body;
  const oldPath = path.join(ROOT_FOLDER, filePath, oldName);
  const newPath = path.join(ROOT_FOLDER, filePath, newName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ message: "File/Folder name changed successfully" });
    }
  });
});

// 파일/폴더 위치 이동
router.put("/move", (req, res) => {
  const { name, path: filePath, destination } = req.body;
  const sourcePath = path.join(ROOT_FOLDER, filePath, name);
  const destinationPath = path.join(ROOT_FOLDER, destination, name);

  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ message: "File/Folder moved successfully" });
    }
  });
});

/**
 * 클라이언트에서 key(fieldname)을 files로 전송하면
 */
router.post("/upload", upload.array("files"), (req, res, next) => {
  // 파일들 업로드 부분
});

export default router;
