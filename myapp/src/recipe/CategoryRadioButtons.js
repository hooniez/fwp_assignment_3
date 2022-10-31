import {Form} from "react-bootstrap";

export default function CategoryRadioButtons({setCategoryChecked, setCategoryVal, isInvalid}) {
    const categories = [
        {id: "formRecipeCategoryBreakfast", label: "breakfast",},
        {id: "formRecipeCategoryLunch", label: "lunch"},
        {id: "formRecipeCategoryAppetizer", label: "appetizer"},
        {id: "formRecipeCategoryDinner", label: "dinner"},
        {id: "formRecipeCategorySide", label: "side"},
        {id: "formRecipeCategoryDessert", label: "dessert"},
    ];
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