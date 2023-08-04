let optionButtons = document.querySelectorAll(".modifiers");
let advancedButtons = document.querySelectorAll(".adv");
let fontNames = document.getElementById("fontName");
let fontSizeref = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let unlinkButton = document.getElementById("unlink");
let alignButtons = document.querySelectorAll(".alignit");
let spaceButtons = document.querySelectorAll(".inds");
let firstButtons = document.querySelectorAll(".first");
let secondButtons = document.querySelectorAll(".second");
let backSpace = document.querySelectorAll(".special");
let lists = document.querySelectorAll(".easy");
let does = document.querySelectorAll(".do");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Corbel",
    "Calibri",
];

const initializer = () => {
    //Function calls for highlighter buttons
    //No highlighters for undo,redo,links and lists as they are one time operations
    highlighter(alignButtons, true);
    highlighter(spaceButtons, true);
    highlighter(firstButtons, true);
    highlighter(secondButtons, true);

    //Creating list of fontnames
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    })

    //Creating list of fontsizes
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeref.appendChild(option);
    }

    //Default font size
    fontSizeref.value = 3;

    //main logic
    const modifyText = (command, defaultUi, value) => {
        document.execCommand(command, defaultUi, value);
    };

    //For basic operations which dont need value parameter
    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        })
    });

    alignButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        })
    });

    spaceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        })
    });

    lists.forEach((button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        })
    });

    does.forEach((button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        })
    });

    //For operations which need parameter
    advancedButtons.forEach((button) => {
        button.addEventListener("change", () => {
            modifyText(button.id, false, button.value);
        })
    })

    backSpace.forEach((button) => {
        button.addEventListener("click", () => {
            let selection = selection.baseNode.data.slice(0, -1);
            modifyText(button.id, false, selection);
        })
    })

    linkButton.addEventListener("click", () => {
        let userlink = prompt("Enter the url");
        if (/http/i.test(userlink)) {
            modifyText(linkButton.id, false, userlink);
        }
        else {
            userlink = "http://" + userlink;
            modifyText(linkButton.id, false, userlink);
        }
    })

    unlinkButton.addEventListener("click", () => {
        modifyText(unlinkButton.id, false, unlinkButton.value);
    })

};

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needsRemoval = true means only one button must be highlight and others must be normal
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
                else {
                    button.classList.toggle("active");
                }
            }
        });
    });
};

window.onload = initializer();

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    })
}