import React, { useState, useRef, useLayoutEffect } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { CustomNodeAtom } from "../atoms/CustomNodeAtom";
import { CustomDragPreviewAtom } from "../atoms/CustomDragPreviewAtom";
import styles from "../../styles/organisms/FileTreeOrganism.module.scss";
import {
  BsArrowDownSquare,
  BsArrowUpSquare,
  BsFileEarmarkPlus,
  BsFolderPlus,
} from "react-icons/bs";
import { Resizable } from "re-resizable";
import axios from "axios";
import { useQuery } from "react-query";

// 마지막 파일의 Id 값을 가져옴
const getLastId = (treeData) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};

//id에 해당하는 노드를 찾기 위한 재귀 함수
const findNodeById = (id, nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) {
      return node;
    } else if (node.children) {
      const foundNode = findNodeById(id, node.children);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
};

//id를 기반으로 파일 경로를 구성하는 함수
const getFilepathById = (id, nodes) => {
  const node = findNodeById(id, nodes);
  if (!node) {
    return "/";
  }

  const segments = [];
  let parent = findNodeById(node.parent, nodes);
  while (parent) {
    segments.unshift(parent.text);
    parent = findNodeById(parent.parent, nodes);
  }

  return segments.join("/");
};

function FileTreeOrganism(props) {
  // ============================ 트리용 데이터 리스트 생성=====================//
  const [treeData, setTreeData] = useState([]);

  // const { data, isLoading, isError } = useQuery('treeData', async () => {
  //   const response = await axios.get('/api');
  //   setTreeData(data)
  // });

  useLayoutEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setTreeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //=========================== 파일 이름 바꾸기=============================== //
  const handleTextChange = (id, value, type) => {
    // 파일 경로 확보
    const filepath = getFilepathById(id, treeData);
    const node = findNodeById(id, treeData);
    const data = { oldName: node.text, newName: value, path: filepath };
    // 파일 이름 변경에 성공한 경우
    const newTree = treeData.map((node) => {
      // 유효한 파일 타입 확장자를 입력 받았을 때
      if (node.id === id && type != undefined) {
        return {
          ...node,
          text: value,
          data: {
            ...node.data,
            fileType: type,
          },
        };
      } else if (node.id === id) {
        // 파일명만 수정할 때
        return {
          ...node,
          text: value,
        };
      }
      return node;
    });
    setTreeData(newTree);
    axios
      .put("/api", data)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
        // 파일 이름 변경에 실패한 경우
      });
  };

  // ===============================파일 삭제================================= //
  const handleDelete = (id, name, dir, created = false) => {
    // 파일 경로
    const filepath = getFilepathById(id, treeData);
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id),
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));
    if (created != true) {
      // 폴더일 경우
      if (dir) {
        axios
          .delete(`/api/rmdir?name=${name}&path=${filepath}`)
          .then((response) => {
            setTreeData(newTree);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //파일일 경우
        axios
          .delete(`/api?name=${name}&path=${filepath}`)
          .then((response) => {
            setTreeData(newTree);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setTreeData(newTree);
    }
  };
  //========================= 새로운 파일/ 폴더 만들기=============================//
  const [lastCreated, setLastCreated] = useState(0);

  const handleCreate = (newNode) => {
    const lastId = getLastId(treeData) + 1;
    setLastCreated(lastId);
    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId,
      },
    ]);
  };

  // 현재 위치에 새로운 폴더를 만드는 함수
  const CreateFolder = () => {
    const text = "";
    const droppable = true;
    // 선택중인 파일이 없을 때, 최상단에 생성
    if (selectedNode === null) {
      handleCreate({
        text,
        parent: 0,
        droppable,
      });
    } else if (selectedNode.droppable === false) {
      // 선택중인 파일이 폴더가 아닐 때.
      handleCreate({
        text,
        parent: selectedNode.parent,
        droppable,
      });
    } else {
      // 선택중인 파일이 폴더일 때.
      handleCreate({
        text,
        parent: selectedNode.id,
        droppable,
      });
    }
  };

  // 현재 위치에 새로운 파일을 만드는 함수
  const CreateFile = () => {
    const text = "";
    const fileType = "";
    const droppable = false;
    // 선택중인 파일이 없을 때, 최상단에 생성
    if (selectedNode === null) {
      handleCreate({
        text,
        parent: 0,
        droppable,
        data: { fileType },
      });
    } else if (selectedNode.droppable === false) {
      // 선택중인 파일이 폴더가 아닐 때.
      handleCreate({
        text,
        parent: selectedNode.parent,
        droppable,
        data: { fileType },
      });
    } else {
      // 선택중인 파일이 폴더일 때.
      handleCreate({
        text,
        parent: selectedNode.id,
        droppable,
        data: { fileType },
      });
    }
  };

  // 실제 Express 서버에 요청을 보내는 함수
  const createSignal = (id, name, dir, type) => {
    const newTree = treeData.map((node) => {
      // 유효한 파일 타입 확장자를 입력 받았을 때
      if (node.id === id && type != undefined) {
        return {
          ...node,
          text: name,
          data: {
            ...node.data,
            fileType: type,
          },
        };
      } else if (node.id === id) {
        // 파일명만 수정할 때
        return {
          ...node,
          text: name,
        };
      }
      return node;
    });
    setTreeData(newTree);
    const filepath = getFilepathById(id, treeData);
    if (dir) {
      axios
        .post("api/folder", { name: name, path: filepath })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("api/file", { name: name, path: filepath })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //======================================================================//

  // 드래그 드롭을 실행하는 함수
  const handleDrop = async (newTree, monitor) => {
    const dragNodeId = monitor.getItem().id;
    const dropNodeId = monitor.getDropResult().node.id;

    const dragNode = findNodeById(dragNodeId, treeData);
    const dropNode = findNodeById(dropNodeId, newTree);

    const isDraggedFile = !!dragNode.children;
    const sourcePath = getFilepathById(dragNodeId, treeData);
    const destinationPath = isDraggedFile
      ? `${getFilepathById(dropNodeId, newTree)}/${dragNode.text}`
      : getFilepathById(dropNodeId, newTree);

    if (sourcePath === destinationPath) {
      return;
    }

    try {
      await axios.put("/api/move", {
        name: dragNode.text,
        path: sourcePath,
        destination: destinationPath,
      });
      setTreeData(newTree);
    } catch (err) {
      console.error(err);
    }
  };

  // 선택된 노드를 표기하는 State
  const [selectedNode, setSelectedNode] = useState(null);
  const handleSelect = (node) => setSelectedNode(node);

  //모든 폴더를 접는 Ref
  const ref = useRef(null);
  const handleCloseAll = () => ref.current?.closeAll();
  const handleOpenAll = () => ref.current?.openAll();

  return (
    <Resizable
      size={{ width: props.widthLeft }}
      minWidth={props.handleFileBar ? 240 : 0}
      maxWidth={"50%"}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      handleClasses={{ right: `${styles.handle}` }}
      onResizeStart={() => {
        props.defaultWidth.current = props.widthLeft;
      }}
      onResize={(e, direction, ref, d) => {
        props.setWidthLeft(props.defaultWidth.current + d.width);
      }}
      // 배경색
      style={{ backgroundColor: "#24282e" }}
      className={props.handleFileBar ? "" : styles.hidden}
    >
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app} style={{ width: props.widthLeft + "px" }}>
          <div className={styles.buttonWapper}>
            <div onClick={handleOpenAll}>
              <BsArrowDownSquare />
            </div>
            <div onClick={handleCloseAll}>
              <BsArrowUpSquare />
            </div>
            <div
              onClick={() => {
                CreateFile();
              }}
            >
              <BsFileEarmarkPlus />
            </div>
            <div
              onClick={() => {
                CreateFolder();
              }}
            >
              <BsFolderPlus />
            </div>
          </div>
          <Tree
            ref={ref}
            tree={treeData}
            rootId={0}
            render={(node, { depth, isOpen, onToggle }) => (
              <CustomNodeAtom
                node={node}
                depth={depth}
                isOpen={isOpen}
                isSelected={node.id === selectedNode?.id}
                onToggle={onToggle}
                onTextChange={handleTextChange}
                onSelect={handleSelect}
                onDelete={handleDelete}
                lastCreated={lastCreated}
                createSignal={createSignal}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreviewAtom monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
          />
        </div>
      </DndProvider>
    </Resizable>
  );
}

export default FileTreeOrganism;
