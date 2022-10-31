import {Button, Form, Row} from 'react-bootstrap'
import {useState, useRef} from "react";
import IngredientInputs from "./IngredientInputs";
import CategoryRadioButtons from "./CategoryRadioButtons";

/**
 * Component used to render a UI to create a recipe via the form tag
 * @returns {JSX} the JSX code to render to the DOM tree
 */
export default function RecipeForm() {
    // const [numIngredients, setNumIngredients] = useState(2);
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

    const validSources = [
        "cookbook",
        "cooking magazine",
        "website",
        "family",
        "newspaper",
        "friend"
    ]

    const [radioChecked, setRadioChecked] = useState(false);
    const [radioVal, setRadioVal ] = useState();

    const handleInputChange = (e) => {
        setRecipeFields({...recipeFields, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {trimmedFields, currentIngredients, isValid } = handleValidation();

        if (!isValid)
            return;

        console.log(trimmedFields);
        console.log(radioVal);
        console.log(currentIngredients);
    }

    const handleValidation = () => {
        // Recipe fields validation
        const trimmedFields = trimFields();
        const currentRecipeErrors = {};

        let key = "formRecipeName";
        let field = trimmedFields[key];
        if (field.length === 0) {
            currentRecipeErrors[key] = "Recipe name is required.";
        }

        key = "formRecipeDesc";
        field = trimmedFields[key];
        if (field.length === 0) {
            currentRecipeErrors[key] = "Description is required.";
        } else if (field.length > 100) {
            currentRecipeErrors[key] = "Description can contain a maximum of 100 characters.";
        }

        key = "formRecipeSource";
        field = trimmedFields[key];
        if (field.length === 0) {
            currentRecipeErrors[key] = "Source is required.";
        } else if (!validSources.includes(field.toLowerCase())) {
            currentRecipeErrors[key] = "Source should be any one of the values: cookbook, cooking magazine, website, family, newspaper, or friend"
        }

        key = "formRecipeCategory";
        if (!radioChecked) {
            currentRecipeErrors[key] = "Category needs to be checked";
        }

        setRecipeErrors(currentRecipeErrors);

        // Ingredients fields validation
        let currentIngredients = [];
        let currentIngredientsErrors = [];
        let ingredientsFieldsValid = true;
        ingredients.forEach((ingredient, idx) => {
            const trimmedFields = {};
            const currentErrors = {};
            Object.keys(ingredient).map(key => trimmedFields[key] =
                ingredient[key].trim());

            let key = "formIngredientName";
            let field = trimmedFields[key];
            if (field.length === 0) {
                currentErrors[key] = "Name is required";
                ingredientsFieldsValid = false;
            } else if (field.length > 20) {
                currentErrors[key] = "Name of ingredient can contain a maximum of 20 characters";
                ingredientsFieldsValid = false;
            }

            key = "formIngredientAmount";
            field = trimmedFields[key];
            if  (field.length === 0) {
                currentErrors[key] = "Amount is required";
                ingredientsFieldsValid = false;
            } else if (!/^-*\d+$/.test(field)) {
                currentErrors[key] = "Amount should contain only digits";
                ingredientsFieldsValid = false;
            } else if (Number(field) <= 0) {
                currentErrors[key] = "Amount should contain a positive number";
                ingredientsFieldsValid = false;
            }

            currentIngredientsErrors.push(currentErrors);
            currentIngredients.push(trimmedFields);

        })

        setIngredientsErrors([...currentIngredientsErrors]);
        setIngredients([...currentIngredients]);

        return {trimmedFields, currentIngredients,
                isValid: Object.keys(currentRecipeErrors).length === 0 && ingredientsFieldsValid};
    }

    const trimFields = () => {
        const trimmedFields = {};
        Object.keys(recipeFields).map(key => trimmedFields[key] = recipeFields[key].trim());
        setRecipeFields(trimmedFields);

        return trimmedFields;
    }



    return (
        <Form onSubmit={handleSubmit}>
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
                              onChange={handleInputChange}
                              isInvalid={recipeErrors.hasOwnProperty("formRecipeName")}/>
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
                              onChange={handleInputChange}
                              isInvalid={recipeErrors.hasOwnProperty("formRecipeDesc")}/>
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
                              onChange={handleInputChange}
                              isInvalid={recipeErrors.hasOwnProperty("formRecipeSource")}/>
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
                <CategoryRadioButtons setRadioChecked={setRadioChecked}
                                      setRadioVal={setRadioVal}
                                      isInvalid={recipeErrors.hasOwnProperty("formRecipeCategory")}/>

            </Form.Group>

            {/*Ingredients*/}
            <div className="mb-3"
                 aria-labelledby="formRecipeIngredients"
            >
                {/*Use span instead of label when there is no corresponding input tag*/}
                <span id="formRecipeIngredients" className="d-block mb-2">Ingredients</span>
                {ingredients.map((ingredient, idx) =>
                    <IngredientInputs key={idx}
                                      idx={idx}
                                      ingredients={ingredients}
                                      setIngredients={setIngredients}
                                      ingredientsErrors={ingredientsErrors}/>)}
            </div>
            <Button variant="success" type="submit">Submit</Button>
        </Form>
    );


}