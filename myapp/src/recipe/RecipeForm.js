import {Button, Form, Row} from 'react-bootstrap'

/**
 * Component used to render a UI to create a recipe via the form tag
 * @returns {JSX} the JSX code to render to the DOM tree
 */
export default function RecipeForm() {
    return (
        <Form>
            {/*Name*/}
            <Form.Group className="mb-3"
                        aria-labelledby="formRecipeNameLabel"
                        controlId="formRecipeName"
            >
                <Form.Label id="formRecipeNameLabel">Name</Form.Label>
                <Form.Control type="text" name="formRecipeName" aria-required="true"/>
            </Form.Group>

            {/*Description*/}
            <Form.Group className="mb-3"
                        aria-labelledby="formRecipeDescLabel"
                        controlId="formRecipeDesc"
            >
                <Form.Label id="formRecipeDescLabel">Description</Form.Label>
                <Form.Control type="text" name="formRecipeDesc" aria-required="true"/>
            </Form.Group>

            {/*Source*/}
            <Form.Group className="mb-3"
                        aria-labelledby="formRecipeSourceLabel"
                        controlId="formRecipeSource"
            >
                <Form.Label id="formRecipeSourceLabel">Source</Form.Label>

                <Form.Control type="text" name="formRecipeSource" aria-required="true"/>
                <Form.Text>Type any one of the values: cookbook, cooking magazine, website, family, newspaper, or friend</Form.Text>

            </Form.Group>

            {/*Category*/}
            <div className="mb-3"
                        aria-labelledby="formRecipeCategory"
            >
                {/*Use span instead of label when there is no corresponding input tag*/}
                <span id="formRecipeCategory" className="d-block mb-2">Category</span>

                <Form.Check type="radio"
                            name="formRecipeCategoryBreakfast"
                            id="formRecipeCategoryBreakfast"
                            label="breakfast"
                            aria-required="true"
                            inline/>
                <Form.Check type="radio"
                            name="formRecipeCategoryLunch"
                            id="formRecipeCategoryLunch"
                            label="lunch"
                            aria-required="true"
                            inline/>
                <Form.Check type="radio"
                            name="formRecipeCategoryAppetizer"
                            id="formRecipeCategoryAppetizer"
                            label="appetizer"
                            aria-required="true"
                            inline/>
                <Form.Check type="radio"
                            name="formRecipeCategoryDinner"
                            id="formRecipeCategoryDinner"
                            label="dinner"
                            aria-required="true"
                            inline/>
                <Form.Check type="radio"
                            name="formRecipeCategorySide"
                            id="formRecipeCategorySide"
                            label="side"
                            aria-required="true"
                            inline/>
                <Form.Check type="radio"
                            name="formRecipeCategoryDessert"
                            id="formRecipeCategoryDessert"
                            label="dessert"
                            aria-required="true"
                            inline/>
            </div>

            {/*Ingredients*/}
            <div className="mb-3"
                 aria-labelledby="formRecipeIngredients"
            >
                {/*Use span instead of label when there is no corresponding input tag*/}
                <span id="formRecipeIngredients" className="d-block mb-2">Ingredients</span>
                {/*Ingredient */}
                <div className="formIngredientGroup d-flex">
                    {/*Ingredient Name*/}
                    <Form.Group
                                className="me-5"
                                aria-labelledby="formIngredientNameLabel"
                                controlId="formIngredientName"
                    >
                        <Form.Label id="formIngredientNameLabel">Name</Form.Label>
                        <Form.Control type="text" name="formIngredientName" aria-required="true"/>
                    </Form.Group>
                    {/*Ingredient Amount*/}
                    <Form.Group
                        className="me-5"
                        aria-labelledby="formIngredientAmountLabel"
                        controlId="formIngredientAmount"
                    >
                        <Form.Label id="formIngredientAmountLabel">Amount</Form.Label>
                        <Form.Control type="text" name="formIngredientAmount" aria-required="true"/>
                    </Form.Group>
                    {/*Delete Button*/}
                    <div
                        aria-labelledby="formIngredientDelete">
                        <span className="d-block mb-2 text-white" id="formIngredientDelete">Delete Ingredient</span>
                        <Button variant="danger">x</Button>
                    </div>
                </div>
                {/*Ingredient */}
                <div className="formIngredientGroup d-flex">
                    {/*Ingredient Name*/}
                    <Form.Group
                        className="me-5"
                        aria-labelledby="formIngredientNameLabel"
                        controlId="formIngredientName"
                    >
                        <Form.Label id="formIngredientNameLabel">Name</Form.Label>
                        <Form.Control type="text" name="formIngredientName" aria-required="true"/>
                    </Form.Group>
                    {/*Ingredient Amount*/}
                    <Form.Group
                        className="me-5"
                        aria-labelledby="formIngredientAmountLabel"
                        controlId="formIngredientAmount"
                    >
                        <Form.Label id="formIngredientAmountLabel">Amount</Form.Label>
                        <Form.Control type="text" name="formIngredientAmount" aria-required="true"/>
                    </Form.Group>
                    {/*Delete Button*/}
                    <div
                        aria-labelledby="formIngredientDelete">
                        <span className="d-block mb-2 text-white" id="formIngredientDelete">Delete Ingredient</span>
                        <Button variant="danger">x</Button>
                    </div>
                </div>
            </div>
            <Button variant="success">Submit</Button>
        </Form>
    );


}