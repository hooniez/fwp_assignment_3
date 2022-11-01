import {cleanup, fireEvent, render, screen} from '@testing-library/react'
import RecipeForm from "../recipe/RecipeForm";

let submitButton;
let recipeNameInput;
let recipeDescriptionInput;
let recipeSourceInput;
let breakfastRadioButton;
let ingredientNameInput1;
let ingredientNameInput2;
let ingredientAmountInput1;
let ingredientAmountInput2;
let container;

beforeEach(() => {
    let utils = render(<RecipeForm></RecipeForm>)
    container = utils.container;
    submitButton = screen.getByRole("button", {name: "Submit"});
    recipeNameInput = screen.getByTestId("recipe-name-input");
    recipeDescriptionInput = screen.getByTestId("recipe-desc-input");
    recipeSourceInput = screen.getByTestId("recipe-source-input");
    breakfastRadioButton = screen.getByLabelText("breakfast");
    ingredientNameInput1 = screen.getByTestId("ingredient-name-input1");
    ingredientNameInput2 = screen.getByTestId("ingredient-name-input2");
    ingredientAmountInput1 = screen.getByTestId("ingredient-amount-input1");
    ingredientAmountInput2 = screen.getByTestId("ingredient-amount-input2");
})

afterEach(() => {
    cleanup();
})

// The purpose of this test is to ensure that all the error messages are shown as expected to the user
// so that the user learns what valid input values are like and, therefore, can create a recipe.
test("Display all the expected error messages when the user clicks the Submit button with invalid input fields", () => {
    // First click the submit button without filling out any field
    fireEvent.click(submitButton);
    expect(screen.queryAllByText("Recipe name is required.")).toHaveLength(1);
    expect(screen.queryAllByText("Description is required.")).toHaveLength(1);
    expect(screen.queryAllByText("Source is required.")).toHaveLength(1);
    expect(screen.queryAllByText("Category needs to be selected.")).toHaveLength(1);
    // For ingredient rows
    expect(screen.queryAllByText("Name is required.")).toHaveLength(2);
    expect(screen.queryAllByText("Amount is required.")).toHaveLength(2);

    /*
     Now fill out all the fields such that
     1. The Description field contains more than 100 characters
     2. The Source field contains a value not found in the valid set of values
     3. One of the ingredients contains a name whose length is greater than 20 characters
     4. For one ingredient, the Amount field contains a NaN value; for the other, the Amount contains a non-positive
      value
     */
    fireEvent.change(recipeNameInput, {target: {value: "Kimchi"}});
    // First create a string whose length is greater than 100 characters;
    let descriptionValue;
    for (let i = 0; i < 200; ++i) {
        descriptionValue += "a";
    }
    // Check that the string created indeed has more than 100 characters
    expect(descriptionValue.length > 100).toBeTruthy();
    fireEvent.change(recipeDescriptionInput, {target: {value: descriptionValue}});
    // Make sure the value for the Source field is not among the valid inputs
    fireEvent.change(recipeSourceInput, {target: {value: descriptionValue}});
    // Click the breakfast radio button for category
    expect(breakfastRadioButton).not.toBeChecked();
    fireEvent.click(breakfastRadioButton);
    expect(breakfastRadioButton).toBeChecked();
    // Provide one of the names for the ingredients with a value longer than 20 characters
    fireEvent.change(ingredientNameInput1, {target: {value: descriptionValue}});
    fireEvent.change(ingredientNameInput2, {target: {value: "Cabbage"}});
    // For the first ingredient, put a NaN value as its amount
    fireEvent.change(ingredientAmountInput1, {target: {value: "2 spoons"}});
    // For the other ingredient, put a non-positive number as its amount
    fireEvent.change(ingredientAmountInput2, {target: {value: -1}});
    fireEvent.click(submitButton);

    expect(screen.queryAllByText('Description can contain a maximum of 100 characters.')).toHaveLength(1);
    expect(screen.queryAllByText('Source should be any one of the values: cookbook, cooking magazine, website, family, newspaper, or friend.')).toHaveLength(1);
    expect(screen.queryAllByText('Name of ingredient can contain a maximum of 20 characters.')).toHaveLength(1);
    expect(screen.queryAllByText('Amount should contain only digits.')).toHaveLength(1);
    expect(screen.queryAllByText('Amount should contain a positive number.')).toHaveLength(1);
});

// The purpose of this test is to ensure that the user can add an ingredient according to the instruction given on
// the page without tampering with the ingredients already entered. It also tests whether an ingredient is deleted
// as intended via the delete button.
test("Check whether another row for an additional ingredient is added according to the requirement and a" +
    " corresponding row could be deleted when a delete button is clicked", () => {
    // Fill out all the fields for the first two ingredients
    fireEvent.change(ingredientNameInput1, {target: {value: "Garlic"}});
    fireEvent.change(ingredientNameInput2, {target: {value: "Cabbage"}});
    fireEvent.change(ingredientAmountInput1, {target: {value: "2"}});
    fireEvent.change(ingredientAmountInput2, {target: {value: "1"}});
    // Press enter to create another row for an additional ingredient
    fireEvent.keyDown(container, {key: 'Enter', code: 'Enter', charCode: 13} );

    // Check whether another row has been successfully added
    expect(screen.getByTestId("ingredient-name-input3")).toBeInTheDocument();
    expect(screen.getByTestId("ingredient-amount-input3")).toBeInTheDocument();
    let ingredientNameInput3 = screen.getByTestId("ingredient-name-input3");
    let ingredientAmountInput3 = screen.getByTestId("ingredient-amount-input3");
    // Give each of the new fields a value
    fireEvent.change(ingredientNameInput3, {target: {value: "Pepper"}});
    fireEvent.change(ingredientAmountInput3, {target: {value: "3"}});


    // Find the second delete button for Cabbage
    let deleteButtonForCabbage = screen.getByTestId("ingredient-delete-button2");
    // Before clicking the button, check whether the input whose value is Cabbage is indeed in the document.
    expect(screen.getByDisplayValue("Cabbage")).toBeInTheDocument();
    fireEvent.click(deleteButtonForCabbage);
    // The second row is expected to have the values that the third row has as the second row has just been deleted
    // and the third row has been pushed up to take the second index position.
    expect(screen.getByTestId("ingredient-name-input2")).toHaveValue("Pepper");
    expect(screen.getByTestId("ingredient-amount-input2")).toHaveValue("3");
    // Check the first row has its original value before the click event occured.
    expect(screen.getByTestId("ingredient-name-input1")).toHaveValue("Garlic");
    expect(screen.getByTestId("ingredient-amount-input1")).toHaveValue("2");
    // Check that there is no longer a third row
    expect(screen.queryByTestId("ingredient-name-input3")).toBeNull();
    expect(screen.queryByTestId("ingredient-amount-input3")).toBeNull();
})