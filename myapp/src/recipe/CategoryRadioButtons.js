import {Form} from "react-bootstrap";

export default function CategoryRadioButtons({setRadioChecked, setRadioVal, isInvalid}) {
    const radios = [
        {id: "formRecipeCategoryBreakfast", label: "breakfast",},
        {id: "formRecipeCategoryLunch", label: "lunch"},
        {id: "formRecipeCategoryAppetizer", label: "appetizer"},
        {id: "formRecipeCategoryDinner", label: "dinner"},
        {id: "formRecipeCategorySide", label: "side"},
        {id: "formRecipeCategoryDessert", label: "dessert"},
    ];
    const checkRadio = (e) => {
        setRadioChecked(true);
        setRadioVal(e.target.value);
    };
    return (
        <>
            {radios.map((radio, idx) => (
                <Form.Check key={idx}
                            type="radio"
                            name="formRecipeCategory"
                            id={radio.id}
                            label={radio.label}
                            aria-required="true"
                            inline
                            value={radio.label}
                            onClick={checkRadio}
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