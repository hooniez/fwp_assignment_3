import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import RecipeForm from "./recipe/RecipeForm";
import {Container} from "react-bootstrap";

function App() {
  return (
    <Container className="mt-5">
        <h1>Add Recipe</h1>
        <RecipeForm/>
    </Container>
  );
}

export default App;
