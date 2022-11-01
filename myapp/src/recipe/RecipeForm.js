import {Button, Form} from 'react-bootstrap'
import {useState, useEffect, useCallback, useRef} from "react";
import IngredientInputs from "./IngredientInputs";
import CategoryRadioButtons from "./CategoryRadioButtons";
import RecipeDetailsModal from "./RecipeDetailsModal";

/**
 * @module RecipeForm
 */

/**
 * @typedef {Function} eventHandlerFunction
 * @param {Object} e - the triggered event
 */

/**
 * a callback function to pass to a child component to be called to update the corresponding state
 * @typedef {Function} childComponentCallbackFunction
 */

/**
 * a validation function to check the name, description, and source of the recipe being created
 * @typedef {Function} validationFunction
 * @returns {Object} - the results of the validation (whether it is valid and the trimmed feilds, etc)
 */

/**
 * a callback function to delete an element in an array whose state is managed in the parent component
 * @typedef {Function} childComponentDeleteCallbackFunction
 * @param {Number} idx - the index of the element to delete in the array
 */

/**
 * a function to call to trim string values stored in recipeFields
 * @typedef {Function} trimStringsInObjectFunction
 * @return {Object} an object that contains the trimmed values from recipeFields
 */

/**
 * @function
 * Component used to render a UI to create a recipe via the form tag
 * @property {{formRecipeName: string, formRecipeDesc: string, formRecipeSource: string}} recipeFields - the object
 * to store the values of name, description, and source for the recipe
 * @property {{formRecipeName: string, formRecipeDesc: string, formRecipeSource: string}} recipeErrors - the object
 * to store the error messages for the following recipe fields: name, description, and source
 * @property {Array<{formIngredientName: string, formIngredientAmount: string}>} ingredients - the array to store
 * ingredients
 * @property {Array<{formIngredientName: string, formIngredientAmount: string}>} ingredientsErrors - the array to
 * store error messages for ingredients
 * @property {Object} recipeForm - the object to reference the form tag
 * @property {Array<string>} validSources - the array that stores valid values for the source input
 * @property {boolean} recipeDetailsVisible - the boolean to set the visibility of the modal which contains the details of the recipe
 * @property {boolean} categoryChecked - the boolean to track whether the radio button for category is checked
 * @property {string} categoryVal - the string to store the value of the selected radio button for category
 * @property {function} handleIngredientsFieldsValidation - The function first trims all the values of the entries
 * stored in ingredients and returns them in currentIngredients. It also returns ingredientsFieldsValid, with which
 * the result of the validation can be quickly accessed. It also returns currentIngredientsErrors to store
 * individual error message for each set of ingredient fields. All the returned values are stored inside an object
 * and returned as an object.
 * @property {eventHandlerFunction} handleRecipeInputChange - When the user types in any of the following fields: name,
 * description, and source, the corresponding state variable is updated with the value typed.
 * @property {eventHandlerFunction} handleSubmit - The function validates all the required fields in the form. If
 * not valid, display error messages set in handleValidation. Otherwise, save the recipe details in localStoage and
 * make visible the modal that contains the recipe details as well as an image of the recipe fetched from Unsplash.
 * triggered event.
 * @property {childComponentCallbackFunction} hideModalHandler - A callback function passed to the recipe details
 * modal to call when the user clicks the close button, upon which the form and the states are reset.
 * @property {validationFunction} handleRecipeFieldsValidation - The function first trims all the values of the
 * following fields: name, description, and source and then returns the trimmed values in trimmedRecipeFields. It
 * also returns currentRecipeErrors that contain an error message for each field if any.
 * @property {childComponentDeleteCallbackFunction} deleteIngredient - The callback function is called from the
 * component IngredientInputs to remove an ingredient row.
 * @property {validationFunction} handleValidation - handleValidation calls handleRecipeFieldsValidation for the
 * following fields: name, description, and source. It also calls handleIngredientsFieldsValidation to validate each
 * row representing an ingredient.
 * @property {trimStringsInObjectFunction} trimRecipeFields - The function trims potential whitespace found in the
 * values typed by the user
 *
 * @returns {JSX.Element} - the JSX code to render to the DOM tree
 */
export default function RecipeForm() {
    const [recipeFields, setRecipeFields] = useState({
        formRecipeName: "", formRecipeDesc: "", formRecipeSource: ""
    });
    const [recipeErrors, setRecipeErrors] = useState({});
    const [ingredients, setIngredients] = useState([
        {formIngredientName: "", formIngredientAmount: ""},
        {formIngredientName: "", formIngredientAmount: ""},
    ]);
    const [ingredientsErrors, setIngredientsErrors] = useState([
        {}, {}
    ]);
    const recipeForm = useRef(null);

    const [recipeDetailsVisible, setRecipeDetailsVisible] = useState(false);

    const validSources = [
        "cookbook",
        "cooking magazine",
        "website",
        "family",
        "newspaper",
        "friend"
    ]

    const [categoryChecked, setCategoryChecked] = useState(false);

    const [categoryVal, setCategoryVal ] = useState(null);

    const handleIngredientsFieldsValidation = useCallback(() => {
        let currentIngredients = [];
        let currentIngredientsErrors = [];
        let ingredientsFieldsValid = true;

        // Iterate each ingredient
        ingredients.forEach((ingredient, idx) => {
            const trimmedFields = {};
            const currentErrors = {};

            // Trim each field in the ingredient
            Object.keys(ingredient).map(key => trimmedFields[key] =
                ingredient[key].trim());

            let key = "formIngredientName";
            let field = trimmedFields[key];
            if (field.length === 0) {
                currentErrors[key] = "Name is required.";
                ingredientsFieldsValid = false;
            } else if (field.length > 20) {
                currentErrors[key] = "Name of ingredient can contain a maximum of 20 characters.";
                ingredientsFieldsValid = false;
            }

            key = "formIngredientAmount";
            field = trimmedFields[key];
            if  (field.length === 0) {
                currentErrors[key] = "Amount is required.";
                ingredientsFieldsValid = false;
            } else if (!/^-*\d+$/.test(field)) {
                currentErrors[key] = "Amount should contain only digits.";
                ingredientsFieldsValid = false;
            } else if (Number(field) <= 0) {
                currentErrors[key] = "Amount should contain a positive number.";
                ingredientsFieldsValid = false;
            }

            currentIngredientsErrors.push(currentErrors);
            currentIngredients.push(trimmedFields);
        })

        return {currentIngredients, ingredientsFieldsValid, currentIngredientsErrors};
    }, [ingredients]);

    /*
     Add an event listener for an enter key. When the enter key is pressed, validate all the ingredient fields
     and then create another row for an additional ingredient if the fields are validated. Otherwise, display
     error messages if needed.
     */
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const { currentIngredientsErrors} = handleIngredientsFieldsValidation();

                let isFilled = true;
                /*
                 If currentIngredientsErrors contains any error that has the word "required",
                 ingredient fields are not all filled.
                 */
                currentIngredientsErrors.forEach(entry => {
                    for (const [key, value] of Object.entries(entry)) {
                        if (value.includes("required")) {
                            isFilled = false;
                        }
                    }
                })

                if (isFilled) {
                    setIngredients([...ingredients, {formIngredientName: "", formIngredientAmount: ""}])
                    setIngredientsErrors([...ingredientsErrors, {}])
                } else {
                    setIngredientsErrors([...currentIngredientsErrors]);
                }
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [handleIngredientsFieldsValidation, ingredientsErrors, ingredients])

    const handleRecipeInputChange = (e) => {
        setRecipeFields({...recipeFields, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {isValid } = handleValidation();

        if (!isValid)
            return;

        // Save the recipe details in localStorage
        localStorage.setItem("name", recipeFields['formRecipeName']);
        localStorage.setItem("desc", recipeFields['formRecipeDesc']);
        localStorage.setItem("source", recipeFields['formRecipeSource']);
        localStorage.setItem("category", categoryVal);
        localStorage.setItem("ingredients", JSON.stringify(ingredients));

        // Display the recipe details modal
        setRecipeDetailsVisible(true);
    }

    const hideModalHandler = () => {
        // Reset the form and the states
        recipeForm.current.reset();
        setRecipeFields({formRecipeName: "", formRecipeDesc: "", formRecipeSource: ""});
        setIngredients([
            {formIngredientName: "", formIngredientAmount: ""},
            {formIngredientName: "", formIngredientAmount: ""},
        ])
        setIngredientsErrors([{},{}]);
        setRecipeDetailsVisible(false);
    }

    const handleRecipeFieldsValidation = () => {
        const trimmedRecipeFields = trimRecipeFields();
        const currentRecipeErrors = {};

        let key = "formRecipeName";
        let field = trimmedRecipeFields[key];
        if (field.length === 0) {
            currentRecipeErrors[key] = "Recipe name is required.";
        }

        key = "formRecipeDesc";
        field = trimmedRecipeFields[key];
        if (field.length === 0) {
            currentRecipeErrors[key] = "Description is required.";
        } else if (field.length > 100) {
            currentRecipeErrors[key] = "Description can contain a maximum of 100 characters.";
        }

        key = "formRecipeSource";
        field = trimmedRecipeFields[key];
        if (field.length === 0) {
            currentRecipeErrors[key] = "Source is required.";
        } else if (!validSources.includes(field.toLowerCase())) {
            currentRecipeErrors[key] = "Source should be any one of the values: cookbook, cooking magazine, website," +
                " family, newspaper, or friend."
        }

        key = "formRecipeCategory";
        if (!categoryChecked) {
            currentRecipeErrors[key] = "Category needs to be checked.";
        }

        return {trimmedRecipeFields, currentRecipeErrors}
    }

    const deleteIngredient = (idx) => {
        let tempIngredients = ingredients;
        let tempIngredientsErrors = ingredientsErrors;
        // Remove the element at the given index from both tempIngredients and tempIngredientsErrors
        tempIngredients.splice(idx, 1);
        tempIngredientsErrors.splice(idx, 1);
        setIngredients([...tempIngredients]);
        setIngredientsErrors([...tempIngredientsErrors]);
    }

    const handleValidation = () => {
        // Validate the name, description, source, category
        const {trimmedRecipeFields, currentRecipeErrors} = handleRecipeFieldsValidation();
        setRecipeErrors(currentRecipeErrors);

        // Validate the fields found in all the ingredient rows
        const {currentIngredients, ingredientsFieldsValid, currentIngredientsErrors} = handleIngredientsFieldsValidation();
        setIngredientsErrors([...currentIngredientsErrors]);
        setIngredients([...currentIngredients]);

        return {trimmedRecipeFields, currentIngredients,
                isValid: Object.keys(currentRecipeErrors).length === 0 && ingredientsFieldsValid};
    }

    const trimRecipeFields = () => {
        const trimmedFields = {};
        Object.keys(recipeFields).map(key => trimmedFields[key] = recipeFields[key].trim());
        setRecipeFields(trimmedFields);
        return trimmedFields;
    }

    return (
        <>
            <Form onSubmit={handleSubmit} ref={recipeForm}>
                {/*Name*/}
                <Form.Group className="mb-3"
                            aria-labelledby="formRecipeNameLabel"
                            controlId="formRecipeName"
                >
                    <Form.Label id="formRecipeNameLabel">Name</Form.Label>
                    <Form.Control type="text"
                                  name="formRecipeName"
                                  aria-required="true"
                                  value={recipeFields.formRecipeName}
                                  onChange={handleRecipeInputChange}
                                  isInvalid={recipeErrors.hasOwnProperty("formRecipeName")}
                                  data-testid='recipe-name-input'/>
                    <Form.Control.Feedback type="invalid">
                        {recipeErrors.formRecipeName}
                    </Form.Control.Feedback>
                </Form.Group>

                {/*Description*/}
                <Form.Group className="mb-3"
                            aria-labelledby="formRecipeDescLabel"
                            controlId="formRecipeDesc"
                >
                    <Form.Label id="formRecipeDescLabel">Description</Form.Label>
                    <Form.Control type="text"
                                  name="formRecipeDesc"
                                  aria-required="true"
                                  value={recipeFields.formRecipeDesc}
                                  onChange={handleRecipeInputChange}
                                  isInvalid={recipeErrors.hasOwnProperty("formRecipeDesc")}
                                  data-testid='recipe-desc-input'/>
                    <Form.Control.Feedback type="invalid">
                        {recipeErrors.formRecipeDesc}
                    </Form.Control.Feedback>
                </Form.Group>

                {/*Source*/}
                <Form.Group className="mb-3"
                            aria-labelledby="formRecipeSourceLabel"
                            controlId="formRecipeSource"
                >
                    <Form.Label id="formRecipeSourceLabel">Source</Form.Label>

                    <Form.Control type="text"
                                  name="formRecipeSource"
                                  aria-required="true"
                                  value={recipeFields.formRecipeSource}
                                  onChange={handleRecipeInputChange}
                                  isInvalid={recipeErrors.hasOwnProperty("formRecipeSource")}
                                  data-testid='recipe-source-input'/>
                    <Form.Control.Feedback type="invalid">
                        {recipeErrors.formRecipeSource}
                    </Form.Control.Feedback>
                    <Form.Text>Type any one of the values: cookbook, cooking magazine, website, family, newspaper, or friend</Form.Text>
                </Form.Group>

                {/*Category*/}
                <Form.Group className="mb-3"
                            aria-labelledby="formRecipeCategoryLabel"
                >
                    <span id="formRecipeCategoryLabel" className="d-block mb-2">Category</span>
                    <CategoryRadioButtons setCategoryChecked={setCategoryChecked}
                                          setCategoryVal={setCategoryVal}
                                          isInvalid={recipeErrors.hasOwnProperty("formRecipeCategory")}/>

                </Form.Group>

                {/*Ingredients*/}
                <div className="mb-3"
                     aria-labelledby="formRecipeIngredients"
                >
                    {/*Use span instead of label when there is no corresponding input tag*/}
                    <span id="formRecipeIngredients" className="d-block">Ingredients</span>
                    <small className="mb-2">Fill all the fields below and enter to add another ingredient</small>
                    {ingredients.map((ingredient, idx) =>
                        <IngredientInputs key={idx}
                                          idx={idx}
                                          ingredients={ingredients}
                                          setIngredients={setIngredients}
                                          ingredientsErrors={ingredientsErrors}
                                          deleteIngredient={deleteIngredient}/>)}
                </div>
                <Button variant="success" type="submit">Submit</Button>
            </Form>

            {/*Modal*/}
            {recipeDetailsVisible && (
                <RecipeDetailsModal recipeDetailsVisible={recipeDetailsVisible}
                                    hideModalHandler={hideModalHandler}
                                    recipeFields={recipeFields}
                                    categoryVal={categoryVal}
                                    ingredients={ingredients}/>
            )}
        </>
    );


}