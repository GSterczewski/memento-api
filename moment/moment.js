const buildMoment = ({
    IDGenerator,
    sanitize,
    validator,
    makeSource
}) => ({
    owner,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
    id = IDGenerator.generate(),
    sourceData,
    name,
    date,
    tags = [],
    icon,
    isFavourite = false

}) => {
    const sanitizedOwner = sanitize(owner)
    const sanitizedName = sanitize(name)
    const sanitizedIcon = sanitize(icon)
    const sanitizedTags = tags.map(tag => sanitize(tag))
    const source = makeSource(sourceData)
    let _isFavourite = isFavourite


    if (!validator.isOwnerValid(sanitizedOwner)) {
        throw new Error("Invalid owner")
    }
    if (!validator.isIdValid(id)) {
        throw new Error("Invalid id")
    }
    if (!validator.isNameValid(sanitizedName)) {
        throw new Error("Invalid name")
    }
    if (!validator.isDateValid(date)) {
        throw new Error("Invalid date")
    }
    if (!validator.isIconValid(sanitizedIcon)) {
        throw new Error("Invalid icon")
    }
    if (!validator.isTagsValid(sanitizedTags)) {
        throw new Error("Invalid tags")
    }
    if (!validator.isSourceValid(source)) {
        throw new Error("Invalid source")
    }

    return Object.freeze({
        getID: () => id,
        getName: () => sanitizedName,
        getDate: () => date,
        getIcon: () => sanitizedIcon,
        getOwner: () => sanitizedOwner,
        getTags: () => sanitizedTags,
        getCreatedOn: () => createdOn,
        getModifiedOn: () => modifiedOn,
        getSource: () => source,
        getIsFavourite: () => _isFavourite,
        setFavourite: () => {
            _isFavourite = true
        },
        unsetFavourite: () => {
            _isFavourite = false
        }

    })
}

module.exports = buildMoment