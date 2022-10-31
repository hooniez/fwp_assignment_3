import {Button, Form} from "react-bootstrap";
import {X} from "react-bootstrap-icons"

/**
 * @module IngredientInputs
 */

/**
 * Component used to render input fields to specify an ingredient
 * @param {Number} idx - the index of the ingredient element in the array ingredients
 * @param {Array<object>} ingredients - the array that contains ingredient objects
 * @param {function} setIngredients - the callback function to change the fields of the ingredient onChange
 * @param {object} ingredientsErrors - the error messages for each field of an ingredient if any
 * @param {function} deleteIngredient - the callback function to delete an ingredient row
 * @returns {JSX.Element} - the JSX code to render to the DOM tree
 * @constructor
 */
export default function IngredientInputs({idx,
                                             ingredients,
                                             setIngredients,
                                             ingredientsErrors,
                                             deleteIngredient
}) {
    // Change the value of an appropriate field in an ingredient row
    const handleInputChange = (e) => {
        setIngredients(Object.values({...ingredients, [idx]: {
            ...ingredients[idx],
                [e.target.name]: e.target.value
        }}));
    }

    // Delete an ingredient row when a delete button is clicked
    const deleteHandler = () => {
        deleteIngredient(idx);
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
                              isInvalid={ingredientsErrors[idx].formIngredientName}
                              onChange={handleInputChange}
                              value={ingredients[idx].formIngredientName}/>
                <Form.Control.Feedback type="invalid">
                    {ingredientsErrors[idx].formIngredientName}
                </Form.Control.Feedback>
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
                              isInvalid={ingredientsErrors[idx].formIngredientAmount}
                              onChange={handleInputChange}
                              value={ingredients[idx].formIngredientAmount}/>
                <Form.Control.Feedback type="invalid">
                    {ingredientsErrors[idx].formIngredientAmount}
                </Form.Control.Feedback>
            </Form.Group>
            {/*Delete Button*/}
            <div
                aria-labelledby="formIngredientDelete">
                <span className="d-block mb-2 text-white" id="formIngredientDelete">Delete Ingredient</span>
                <Button variant="danger" onClick={deleteHandler}><X size={22}></X></Button>
            </div>
        </div>
    )
}