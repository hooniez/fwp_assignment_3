import {Button, Form} from "react-bootstrap";

/**
 * Component used to render input fields to specify an ingredient
 * @returns {JSX} the JSX code to render to the DOM tree
 */
export default function IngredientInputs({idx, ingredients, setIngredients}) {
    const handleInputChange = (e) => {
        setIngredients(Object.values({...ingredients, [idx]: {
            ...ingredients[idx],
                [e.target.name]: e.target.value
        }}));
    }

    return (
        <div className="formIngredientGroup d-flex mb-3">
            {/*Ingredient Name*/}
            <Form.Group
                className="me-5"
                aria-labelledby="formIngredientNameLabel"
                controlId="formIngredientName"
            >
                <Form.Label id="formIngredientNameLabel">Name</Form.Label>
                <Form.Control type="text"
                              name="formIngredientName"
                              aria-required="true"
                              onChange={handleInputChange}/>
            </Form.Group>
            {/*Ingredient Amount*/}
            <Form.Group
                className="me-5"
                aria-labelledby="formIngredientAmountLabel"
                controlId="formIngredientAmount"
            >
                <Form.Label id="formIngredientAmountLabel">Amount</Form.Label>
                <Form.Control type="text"
                              name="formIngredientAmount"
                              aria-required="true"
                              onChange={handleInputChange}/>
            </Form.Group>
            {/*Delete Button*/}
            <div
                aria-labelledby="formIngredientDelete">
                <span className="d-block mb-2 text-white" id="formIngredientDelete">Delete Ingredient</span>
                <Button variant="danger">x</Button>
            </div>
        </div>
    )
}