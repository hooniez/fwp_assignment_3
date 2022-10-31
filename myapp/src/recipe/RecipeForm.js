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
    const [ingredients, setIngredients] = useState([
        {formIngredientName: "", formIngredientAmount: "", isInvalid: false},
        {formIngredientName: "", formIngredientAmount: "", isInvalid: false},
    ]);
    const [errors, setErrors] = useState({});
    const sources = [
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
        const {trimmedFields, isValid } = handleValidation();

        if (!isValid)
            return;
    }

    const handleValidation = () => {
        const trimmedFields = trimFields();
        const currentErrors = {};

        let key = "formRecipeName";
        let field = trimmedFields[key];
        if (field.length === 0) {
            currentErrors[key] = "Recipe name is required.";
        }

        key = "formRecipeDesc";
        field = trimmedFields[key];
        if (field.length === 0) {
            currentErrors[key] = "Description is required.";
        } else if (field.length > 100) {
            currentErrors[key] = "Description can contain a maximum of 100 characters.";
        }

        key = "formRecipeSource";
        field = trimmedFields[key];
        if (field.length === 0) {
            currentErrors[key] = "Source is required.";
        } else if (!sources.includes(field.toLowerCase())) {
            currentErrors[key] = "Source should be any one of the values: cookbook, cooking magazine, website, family, newspaper, or friend"
        }

        setErrors(currentErrors);

        return {trimmedFields, isValid: Object.keys(currentErrors).length === 0};
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
                              isInvalid={errors.hasOwnProperty("formRecipeName")}/>
                <Form.Control.Feedback type="invalid">
                    {errors.formRecipeName}
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
                              isInvalid={errors.hasOwnProperty("formRecipeDesc")}/>
                <Form.Control.Feedback type="invalid">
                    {errors.formRecipeDesc}
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
                              isInvalid={errors.hasOwnProperty("formRecipeSource")}/>
                <Form.Control.Feedback type="invalid">
                    {errors.formRecipeSource}
                </Form.Control.Feedback>
                <Form.Text>Type any one of the values: cookbook, cooking magazine, website, family, newspaper, or friend</Form.Text>

            </Form.Group>

            {/*Category*/}
            <Form.Group className="mb-3"
                        aria-labelledby="formRecipeCategoryLabel"
            >
                <span id="formRecipeCategoryLabel" className="d-block mb-2">Category</span>
                <CategoryRadioButtons setRadioChecked={setRadioChecked} setRadioVal={setRadioVal}/>

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
                                      setIngredients={setIngredients}/>)}
            </div>
            <Button variant="success" type="submit">Submit</Button>
        </Form>
    );


}