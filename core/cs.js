function pointer() {
    document.body.addEventListener("mouseover", function (e) {
        var pointer = getStyle(e.target, "cursor");
        if (pointer == "pointer") {
            e.target.classList.add("cursorsHover");
        }
    });
}

function getStyle(element, property) {
    return (getComputedStyle(element, null).getPropertyValue(property));
}

chrome['storage'].local.get({
    "cursor": "cursor1"
}, function (items) {
    cursor = items.cursor;
    if (cursor.length > 0) {
        pointer();
    }
});