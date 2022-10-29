import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import app, { auth, db } from './firebase-config';
import { useNavigate } from "react-router";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "../css/Todo.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useUserAuth } from "../contexts/MyContext";
import { deleteDoc,updateDoc, doc, getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
import { async } from "@firebase/util";

export default function Todo() {
  const [id, setId] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosFS, setTodosFS] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

const dbfs =getFirestore(app)

  const getTodos = async () => {
    const todosCollectionRef = collection(dbfs, "todos")
    const data = await getDocs(todosCollectionRef);
    setTodosFS(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/login");
      }
    });
    getTodos()
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd
    });
    const todosCollectionRef = collection(dbfs, "todos")
    addDoc(todosCollectionRef, {
      todo: todo,
      status: "In-process"
    })
    setTodo("");
    getTodos();
  };

  // update
  const handleUpdate = (id, todo) => {
    setIsEdit(true);
    setTodo(todo);
    // setTempUidd(todo.uidd);
    setId(id)
  };

  const handleEditConfirm = async () => {
    // update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
    //   todo: todo,
    //   tempUidd: tempUidd
    // });
    await updateDoc(doc(dbfs, "todos", id), { todo: todo} );
    getTodos()
    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (id) => {
    // remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    deleteDoc(doc(dbfs, "todos", id))
    getTodos();
  };

  const toggleComplete = async (id) => {
    console.log(id)
    // update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
    //   todo: todo,
    //   tempUidd: tempUidd
    // });
    try {
      await updateDoc(doc(dbfs, "todos", id), { status: "done"});
      getTodos()
    }
    catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="todo-container">
      <input
        className="add-edit-input"
        type="text"
        placeholder="Add todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {todosFS.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}</h1>
          <EditIcon
            fontSize="large"
            onClick={() => handleUpdate(todo.id, todo.todo)}
            className="edit-button"
          />
          <DeleteIcon
            fontSize="large"
            onClick={() => handleDelete(todo.id)}
            className="delete-button"
          />
          <CheckCircleIcon
            fontSize="large"
            onClick={() => toggleComplete(todo.id)}
            className="confirm-button"
          />
        </div>
      ))}

      {isEdit ? (
        <div>
        <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
    </div>
  );
}
