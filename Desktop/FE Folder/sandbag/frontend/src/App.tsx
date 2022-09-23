import React, {useState, createContext, useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom"
import Home from './components/Home';
import Account from './components/Account';
import NewRound from './components/newRound';
import Scores from './components/Scores';

interface ContextProps {
  loggedInUser: any,
  setLoggedInUser: Function,
  allUserRounds: any,
  setAllUserRounds: Function,
  userHandicap: any,
  setUserHandicap: Function,
  changesMade: number,
  setChangesMade: Function,
  serverPort: string
}

const defaultValues = {
  loggedInUser: {},
  setLoggedInUser: () => undefined,
  allUserRounds: [{}],
  setAllUserRounds: () => undefined,
  userHandicap: "",
  setUserHandicap: () => undefined,
  changesMade: 0,
  setChangesMade: () => undefined,
  serverPort: ""
}

export const SandbagContext = createContext<ContextProps>(defaultValues)

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  const [allUserRounds, setAllUserRounds] = useState([])

  const [userHandicap, setUserHandicap] = useState("")

  const [changesMade, setChangesMade] = useState(0)

  const serverPort = "http://localhost:5000/"
  // const serverPort = "heroku port"

  return (
    <SandbagContext.Provider value={{loggedInUser, setLoggedInUser, allUserRounds, setAllUserRounds, userHandicap, setUserHandicap, changesMade, setChangesMade, serverPort}}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/newround" element={<NewRound />} />
            <Route path="/scores" element={<Scores />} />
          </Routes>
        </Router>
      </div>
    </SandbagContext.Provider>
  );
}

export default App;
