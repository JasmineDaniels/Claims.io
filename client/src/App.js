import Register from "./components/Register Form/Register";
import SignIn from "./components/Sign-In-Form/SignIn";
import TempHeader  from "./components/temp-header";
function App() {
  return (
    <>
      <div className="App">
        <TempHeader/>
        {/* Navigation */}
        {/* <Register/> */}
        <SignIn/>
      </div>
    </>
    
  );
}

export default App;
