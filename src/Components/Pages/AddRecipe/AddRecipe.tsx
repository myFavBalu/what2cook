import React, {useState} from "react";
import {RecipeCreation} from "../../../Types/RecipeTypes";
import s from "./AddRecipe.module.scss";
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";
import {addRecipe} from "../../../ApiCalls/Post/addRecipe";

export function AddRecipe(): JSX.Element {
    const [newRecipe, setNewRecipe] = useState<RecipeCreation>({
        name: "Name",
        ingredients: [],
        instructions: "",
        vegetarian: true
    })
    const navigation = useNavigate()


    return <div className={s.RecipeCreationForm}>
        <NameInput
            name={newRecipe.name}
            setName={(newName) => {
                setNewRecipe({...newRecipe, name: newName})
            }}
        />
        <IngredientList
            ingredients={newRecipe.ingredients}
            setIngredients={(ingredients: string[]) => {
                setNewRecipe({...newRecipe, ingredients: ingredients})
            }}
            addNewIngredient={() => {
                let newIngredients = newRecipe.ingredients;
                newIngredients.push("");
                setNewRecipe({...newRecipe, ingredients: newIngredients})
            }}/>

        <Instructions instructions={newRecipe.instructions} setInstructions={(newInstructions: string) => setNewRecipe({
            ...newRecipe,
            instructions: newInstructions
        })}/>

        <Preferences isVegetarian={newRecipe.vegetarian} toggleIsVegetarian={() => {
            setNewRecipe({...newRecipe, vegetarian: !newRecipe.vegetarian})
        }}/>

        <button className={s.SavingButton}
                onClick={
                    () => handleCall(newRecipe, () => navigation({pathname: "/"}))
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
    return <div className={s.NameInputWrapper}>
        <input value={props.name} className={s.NameInput}
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
    return <div className={s.IngredientList}>
        Zutaten:
        {props.ingredients.map((value, index) => {
            return <div className={s.IngredientItemWrapper} key={index}>
                <input className={s.IngredientItem}
                       value={value}
                       onChange={(event) => {
                           let newIngredients = props.ingredients
                           newIngredients[index] = event.target.value
                           props.setIngredients(newIngredients)
                       }}/>
                <button className={s.IngredientItemDeleteButton}
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
    return <div className={s.AddNewIngredientBar} onClick={props.addNewIngredient}>
        <button className={s.AddNewIngredientButton}>+</button>
    </div>
}


type InstructionProps = {
    instructions: string,
    setInstructions: (newInstructions: string) => void
}

function Instructions(props: InstructionProps) {
    return <div className={s.InstructionWrapper}>
        Zubereitung:
        <br/>
        <textarea rows={10} className={s.InstructionInput}
                  value={props.instructions}
                  onChange={(event) => props.setInstructions(event.target.value)}/>
    </div>
}


type PreferencesProps = {
    isVegetarian: boolean,
    toggleIsVegetarian: () => void
}

function Preferences(props: PreferencesProps) {
    return <div className={s.PreferencesWrapper}>
        Ernährungsweise:
        <select className={s.PreferencesSelect} defaultValue={props.isVegetarian ? "veggie" : "omni"}
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

async function handleCall(newRecipe: RecipeCreation, onSuccess: () => void) {
    try {
        addRecipe(newRecipe).then(
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