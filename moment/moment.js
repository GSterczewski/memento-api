const buildMoment = ({
    IDGenerator,
    validator,
    makeSource
}) => ({
    owner,
    source,
    name,
    date,
    tags = [],
    icon,
    isFavourite = false,
    id = IDGenerator(),
    modifiedOn = Date.now(),
    createdOn = Date.now()

}) => {
    if (!validator.isArray(tags)) {
        throw new Error(`Tags should be an array, got :${typeof tags}`)
    }

    const sanitizedOwner = validator.sanitize(owner)
    const sanitizedName = validator.sanitize(name)
    const sanitizedIcon = validator.sanitize(icon)
    const sanitizedTags = tags.map(tag => validator.sanitize(tag))
    const _source = makeSource(source)
    let _isFavourite = isFavourite


    if (!validator.isUUIDv4(sanitizedOwner)) {
        throw new Error("Owner id is not valid uuid v4")
    }
    if (!validator.isUUIDv4(id)) {
        throw new Error("id is not valid uuid v4")
    }
    if (!validator.isLength(sanitizedName, {
            min: 2,
            max: 50
        })) {
        throw new Error("Invalid name")
    }
    if (!validator.isDate(date)) {
        throw new Error("Invalid date")
    }
    if (!validator.isDate(new Date(createdOn))) {
        throw new Error("Invalid createdOn")
    }
    if (!validator.isDate(new Date(modifiedOn))) {
        throw new Error("Invalid modifiedOn")
    }
    /*
    if (!validator.isIconValid(sanitizedIcon)) {
        throw new Error("Invalid icon")
    }
    if (!validator.isTagsValid(sanitizedTags)) {
        throw new Error("Invalid tags")
    }
    if (!validator.isSourceValid(source)) {
        throw new Error("Invalid source")
    }
 */
    sanitizedTags.forEach(tag => {
        if (!validator.isLength(tag, {
                min: 1,
                max: 40
            })) {
            throw new Error("Invalid tag")
        }
    })


    return Object.freeze({
        getID: () => id,
        getName: () => sanitizedName,
        getDate: () => date,
        getIcon: () => sanitizedIcon,
        getOwner: () => sanitizedOwner,
        getTags: () => sanitizedTags,
        getCreatedOn: () => createdOn,
        getModifiedOn: () => modifiedOn,
        getSource: () => _source,
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