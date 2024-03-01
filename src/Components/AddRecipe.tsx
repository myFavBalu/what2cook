import React, {useState} from "react";
import {MealCreation} from "../Types/MealTypes";
import "./AddRecipe.scss";
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

export function AddRecipe(): JSX.Element {
    const [newMeal, setNewMeal] = useState<MealCreation>({
        name: "Name",
        ingredients: [],
        instructions: "",
        vegetarian: true
    })
    const navigation = useNavigate()


    return <div className={"MealCreationForm"}>
        <NameInput
            name={newMeal.name}
            setName={(newName) => {
                setNewMeal({...newMeal, name: newName})
            }}
        />

        <IngredientList
            ingredients={newMeal.ingredients}
            setIngredients={(ingredients: string[]) => {
                setNewMeal({...newMeal, ingredients: ingredients})
            }}
            addNewIngredient={() => {
                let newIngredients = newMeal.ingredients;
                newIngredients.push("");
                setNewMeal({...newMeal, ingredients: newIngredients})
            }}/>

        <Instructions instructions={newMeal.instructions} setInstructions={(newInstructions: string) => setNewMeal({
            ...newMeal,
            instructions: newInstructions
        })}/>

        <Preferences isVegetarian={newMeal.vegetarian} toggleIsVegetarian={() => {
            setNewMeal({...newMeal, vegetarian: !newMeal.vegetarian})
        }}/>

        <button className={"SavingButton"}
                onClick={
                    () => addMeal(newMeal, () => navigation({pathname: "/"}))
                }>
            Speichern
        </button>
    </div>
}

type NameInputProps = {
    name: string,
    setName: (name: string) => void
}

function NameInput(props: NameInputProps) {
    return <div className={"NameInputWrapper"}>
        <input value={props.name} className={"NameInput"}
               onFocus={(event) => {
                   if (event.target.value === "Name") {
                       props.setName("")
                   }
               }}
               onChange={(event) => {
                   props.setName(event.target.value)
               }}
        />
    </div>
}

type IngredientListProps = {
    ingredients: string[],
    setIngredients: (ingredients: string []) => void,
    addNewIngredient: () => void
}

function IngredientList(props: IngredientListProps) {
    return <div className={"IngredientList"}>
        Zutaten:
        {props.ingredients.map((value, index) => {
            return <div className={"IngredientItemWrapper"} key={index}>
                <input className={"IngredientItem"}
                       value={value}
                       onChange={(event) => {
                           let newIngredients = props.ingredients
                           newIngredients[index] = event.target.value
                           props.setIngredients(newIngredients)
                       }}/>
                <button className={"IngredientItemDeleteButton"}
                        onClick={() => {
                            let newIngredients = props.ingredients
                            newIngredients.splice(index, 1)
                            props.setIngredients(newIngredients)
                        }}>
                    x
                </button>
            </div>
        })}
        <AddNewIngredient addNewIngredient={props.addNewIngredient}/>
    </div>
}

type AddNewIngredientProps = {
    addNewIngredient: () => void
}

function AddNewIngredient(props: AddNewIngredientProps) {
    return <div className={"AddNewIngredientBar"} onClick={props.addNewIngredient}>
        <button className={"AddNewIngredientButton"}>+</button>
    </div>
}


type InstructionProps = {
    instructions: string,
    setInstructions: (newInstructions: string) => void
}

function Instructions(props: InstructionProps) {
    return <div className={"InstructionWrapper"}>
        Zubereitung:
        <br/>
        <textarea rows={10} className={"InstructionInput"}
                  value={props.instructions}
                  onChange={(event) => props.setInstructions(event.target.value)}/>
    </div>
}


type PreferencesProps = {
    isVegetarian: boolean,
    toggleIsVegetarian: () => void
}

function Preferences(props: PreferencesProps) {
    return <div className={"PreferencesWrapper"}>
        Ernährungsweise:
        <select className={"PreferencesSelect"} defaultValue={props.isVegetarian ? "veggie" : "omni"}
                onChange={props.toggleIsVegetarian}>
            <option value={"veggie"}>
                vegetarisch
            </option>
            <option value={"omni"}>
                omni
            </option>
        </select>
    </div>
}

async function addMeal(newMeal: MealCreation, onSuccess: () => void) {

    // todo: inputvalidation
    try {
        const url = '/api/add-recipe';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // todo: just work with newMeal directly if possible (conversion to Meal?)
            body: JSON.stringify({
                name: newMeal.name,
                ingredients: "- " + newMeal.ingredients.join("- "),
                instructions: newMeal.instructions,
                vegetarian: newMeal.vegetarian
            })
        };
        console.log(requestOptions)
        await fetch(url, requestOptions).then(
            (value) => {
                if (value.ok) {
                    toast.success("Gespeichert! :-)", {onClose: () => onSuccess()})
                } else {
                    toast.error("Da ist etwas schief gelaufen! :-(")
                    toast.error("Fehler: " + value.statusText)
                }
            }
        )
    } catch (error) {
        toast.error("Da ist etwas schief gelaufen! :-(")
        console.log(error)
    }
}