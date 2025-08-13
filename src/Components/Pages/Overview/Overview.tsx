import {RecipeSearchResult, Tag} from "../../../Types/RecipeTypes";
import React, {useEffect, useState} from "react";
import s from "./Overview.module.scss"
import {getRecipeNamesWithIds} from "../../../ApiCalls/Get/getRecipeNamesWithIds";
import {getAllTags} from "../../../ApiCalls/Get/getAllTags";

export function Overview(): JSX.Element {
    const [recipePlaceholders, setRecipePlaceholders] = useState<RecipeSearchResult[]>([]);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [filterTags, setFilterTags] = useState<Tag[]>([])

    useEffect(() => {
        getRecipeNamesWithIds(filterTags).then((recipePlaceholders) => {
            setRecipePlaceholders(recipePlaceholders)
        })
        getAllTags().then((tags) => {
            setAllTags(tags)
        })
    }, [filterTags])

    return <div className={s.OverviewWrapper}>
        <span className={s.Filter}>Filter:</span>
        <div className={s.TagsContainer}>
            {allTags.map((tag) => {
                const isActive = filterTags.some(t => t.id === tag.id);

                return (
                    <div
                        key={tag.id}
                        className={s.Tag}
                        onClick={() => {
                            setFilterTags(isActive
                                ? filterTags.filter(t => t.id !== tag.id)
                                : [...filterTags, tag]
                            );
                        }}
                    >
                        {isActive && <span>✔️</span>}
                        {tag.name}
                    </div>
                );
            })}
        </div>

        {recipePlaceholders.length > 0 && <div className={s.RecipeContainer}>
            {recipePlaceholders.map((placeholder) =>
                <a className={s.OverviewElement}
                   key={placeholder.id}
                   href={"/generate?recipeId=" + placeholder.id}
                >{placeholder.name}</a>)
            }
        </div>}
    </div>;
}