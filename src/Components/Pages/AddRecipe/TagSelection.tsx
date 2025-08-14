import {SearchBarWithRecommendations} from "../../SearchBar/SearchBarWithRecommendations";
import {getTagsByName} from "../../../ApiCalls/Get/getTagsByName";
import React, {ReactElement} from "react";
import s from "./TagSelection.module.scss";
import {Tag} from "../../../Types/RecipeTypes";

export type TagSelectionProps = {
    tags: Tag[],
    setTags: (tags: Tag[]) => void
}

export function TagSelection({tags, setTags}: TagSelectionProps): ReactElement {
    return <div className={s.TagSelectionWrapper}>
        Tags:
        <SearchBarWithRecommendations
            className={s.TagSelectionSearchBar}
            getCall={getTagsByName}
            onResultClicked={(result) => {
                setTags([...tags, result as Tag])
            }}
            onAddResultClicked={(currentSearchWord) => {
                setTags([...tags, {id: 0, name: currentSearchWord} as Tag])
            }}
        />

        <ActiveTagsContainer tags={tags}
                             removeTag={(tagToRemove) => setTags(tags.filter((currentTag) => currentTag.id !== tagToRemove.id))}
        />
    </div>
}

export type ActiveTagsContainerProps = {
    tags: Tag[],
    removeTag: (tags: Tag) => void
}

function ActiveTagsContainer({tags, removeTag}: ActiveTagsContainerProps): ReactElement {
    const activeTags = tags.map((tag) => {
        return <li key={tag.id} className={s.ActiveTag}>{tag.name}
            <button className={s.DeleteButton}
                    onClick={() => removeTag(tag)}>
                x
            </button>
        </li>
    })

    return <ul>
        {activeTags}
    </ul>
}