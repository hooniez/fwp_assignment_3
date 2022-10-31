import {Image, Modal} from "react-bootstrap";
import useFetchImage from "../hooks/useFetchImage";

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