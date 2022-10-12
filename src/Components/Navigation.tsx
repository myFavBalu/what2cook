import "./Navigation.scss"

export function Navigation(): JSX.Element {
    return <div className={"NavigationWrapper"}>
        <div className={"PageName"}>what2cook</div>
        <div className={"NavigationElement"}>Rezeptgenerator</div>
        <div className={"NavigationElement"}>Gericht anlegen</div>
    </div>
}