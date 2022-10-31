import {Form} from "react-bootstrap";

/**
 * @module CategoryRadioButtons
 */

/**
 * Component used to render the radio buttons for category
 * @param {function} setCategoryChecked - the callback function to set categoryChecked to true when a radio button
 * is clicked.
 * @param {function} setCategoryVal - the callback function to store the value of the category checked
 * @param {boolean} isInvalid - the boolean value to pass from the parent component to show error messages
 * @property {Array<object>} categories - an array that stores an object that contains the id and label of each of
 * the categories
 * @property {function} checkCategory - the callback function to change the states related to the category when a
 * radio button is selected
 * @returns {JSX.Element} the JSX code to render to the DOM tree
 * @constructor
 */

export default function CategoryRadioButtons({setCategoryChecked,
                                                 setCategoryVal,
                                                 isInvalid}) {
    const categories = [
        {id: "formRecipeCategoryBreakfast", label: "breakfast",},
        {id: "formRecipeCategoryLunch", label: "lunch"},
        {id: "formRecipeCategoryAppetizer", label: "appetizer"},
        {id: "formRecipeCategoryDinner", label: "dinner"},
        {id: "formRecipeCategorySide", label: "side"},
        {id: "formRecipeCategoryDessert", label: "dessert"},
    ];

    // Change the states related to the category in the parent component
    const checkCategory = (e) => {
        setCategoryChecked(true);
        setCategoryVal(e.target.value);
    };

    return (
        <>
            {categories.map((category, idx) => (
                <Form.Check key={idx}
                            type="radio"
                            name="formRecipeCategory"
                            id={category.id}
                            label={category.label}
                            aria-required="true"
                            inline
                            value={category.label}
                            onClick={checkCategory}
                            isInvalid={isInvalid}
                />
            ))}
            {isInvalid && (
                <small className="text-danger d-block" type="invalid">
                    Category needs to be checked
                </small>
            )}
        </>

    )
}