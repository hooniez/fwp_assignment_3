import {Image, Modal} from "react-bootstrap";
import useFetchImage from "../hooks/useFetchImage";

/**
 * @module RecipeDetailsModal
 */

/**
 * Component used to render a modal to display recipe details and an image for the recipe
 * @param {boolean} recipeDetailsVisible - the boolean value to set the visibility of the modal
 * @param {function} hideModalHandler - the callback function to hide the modal when the click button is clicked
 * @param {object} recipeFields - the recipe fields such as name, description, and source
 * @param {string} categoryVal - the category value (e.g. breakfast, lunch, dinner, side, dessert, etc)
 * @param {object} ingredients - the array of ingredients with each ingredient's name and amount
 * @property {string} src - the url fetched from Unsplash and its state updater function
 * @returns {JSX.Element} the JSX code to render to the DOM tree
 * @constructor
 */
export default function RecipeDetailsModal({recipeDetailsVisible,
                                               hideModalHandler,
                                               recipeFields,
                                               categoryVal,
                                               ingredients
}) {
    const [src, setSrc] = useFetchImage(recipeFields['formRecipeName']);

    return (
        <Modal show={recipeDetailsVisible}
               onHide={hideModalHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Recipe Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={src}></Image>
                <p>Name: {recipeFields['formRecipeName']}</p>
                <p>Description: {recipeFields['formRecipeDesc']}</p>
                <p>Source: {recipeFields['formRecipeSource']}</p>
                <p>Category: {categoryVal}</p>
                <hr/>
                <p>Ingredients: </p>
                {ingredients.map((ingredient, idx) => (
                    <p key={idx}>{`${ingredient.formIngredientAmount} ${ingredient.formIngredientName}`}</p>
                ))}
            </Modal.Body>
        </Modal>
    )
}