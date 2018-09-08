const maps = {
    sweetWaterEntrance: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//0
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//2
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//3
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//4
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//5
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//6
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//7
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//8
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//9
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//10
        [0, 0, 0, 0, 101, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//11
        [0, 0, 0, 0, 201, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//12
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//13
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//14
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//15
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//16
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//17
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//18
        [0, 0, 0, 0, 0  , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//19
    ]
}

let you;

const playerFactory = (name,strength,charisma,intelligence,luck) => {
    let cash = 5;
    let karma = 50;
    let energy = 100;
    let maxHealth = 100;
    let currentHealth = 80;

    let inventory = [
        {
            name: "Id Card",
            description: "My ID Card",
            effect: () => {
                console.log(this);
            },
        },
    ];

    let currentPosition = [12,3]; //y,x

    return {name, charisma, strength, intelligence, luck, cash, karma, energy, maxHealth, currentHealth, inventory, currentPosition}

}

//TITLE SCREEN AND CHARACTER CREATION

renderStartMenu = () => {
    const statTotal = 40;
    let avaliablePoints = 0;

    let statValues = [
        {
            value: 10,
            domID: 'str',
            name: 'Strength',
            id: 0,
        },
        {
            value: 10,
            domID: 'chr',
            name: 'Charisma',
            id: 1,
        },
        {
            value: 8,
            domID: 'int',
            name: 'Intelligence',
            id: 2,
        },
        {
            value: 5,
            domID: 'lck',
            name: 'Luck',
            id: 3,
        },
    ]

    calculateAvaliablePoints = () => {
        let inUseTotal = 0;
        let avaliablePointsValue = 0;
        statValues.map((statObject) => {
            inUseTotal += statObject.value;
        });
        avaliablePointsValue = statTotal - inUseTotal;
        avaliablePoints = avaliablePointsValue;
        console.log(avaliablePoints);
        return avaliablePoints;
    }

    updateTotalUI = () => {
        document.querySelector('.total').innerHTML = avaliablePoints;
    }

    //RENDER THE BASE FORM

    calculateAvaliablePoints();
    let formHTML = `
        <form class="create-char">
            <label>Name:</label><input class="form-name" type="text">
            <div class='chr'></div>
            <div class='str'></div>
            <div class='lck'></div>
            <div class='int'></div>
            <h2>Points Avaliable = <span class="total">${avaliablePoints}</span></h2>
            <input type="submit">Create Character</input>
        </form>
    `

    document.querySelector('.root').innerHTML = formHTML;
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        let playerName = document.querySelector(".form-name").value;
//START THE GAME
        you = playerFactory(playerName,statValues[0].value,statValues[1].value,statValues[2].value,statValues[3].value);
        console.log(you);

        printMap(maps.sweetWaterEntrance);
        printPlayer();
    });

    createStatUI = (statObj) => {
        let statValue = statObj.value;
        let domId = statObj.domID;
        let statLabel = statObj.name;

        let html = `
        <p>${statLabel}</p>
        <div class="${domId}-reduce button">-</div>
        <p class="${domId}-value">${statValue}</p>
        <div class="${domId}-increase button">+</div>
        `
        document.querySelector(`.${domId}`).innerHTML += html;

        document.querySelector(`.${domId}-reduce`).addEventListener("click", () => {
            if (statValues[statObj.id].value - 1 >= 0) {
                statValues[statObj.id].value = statValues[statObj.id].value - 1;
                document.querySelector(`.${domId}-value`).innerHTML = statValues[statObj.id].value;
                calculateAvaliablePoints();
                updateTotalUI();
                return;
            }
        });
        document.querySelector(`.${domId}-increase`).addEventListener("click", () => {
            if (avaliablePoints !== 0) {
                statValues[statObj.id].value = statValues[statObj.id].value + 1;
                document.querySelector(`.${domId}-value`).innerHTML = statValues[statObj.id].value;
                calculateAvaliablePoints();
                updateTotalUI();
                return;
            }
        });
    }

    createStatUI(statValues[0]);
    createStatUI(statValues[1]);
    createStatUI(statValues[2]);
    createStatUI(statValues[3]);
}

//RENDER INTERFACE

let home = {
    name: "My Home",
    shop: true,
    shopInventory: [
        {
            name: "Smokes",
            value: 10,
            description: "<p>SMOKING KILLS - But it makes you cool.<p> <p>-10 HP +1 Charisma</p>",
            effect: () => {
                you.currentHealth = you.currentHealth-20;
                you.charisma = you.charisma++;
                console.log(you.charisma, you.currentHealth);
            },
        },
        {
            name: "BubbleGum",
            value: 5,
            description: "<p>Bubbly Goodness in a small easy to open package.<p> <p>+5 HP</p>",
            effect: () => {
                you.currentHealth = you.currentHealth + 5;
                console.log(you.currentHealth);
            },
        }
    ],
    options: [
        {
            name: "Sleep",
            effect: () => {
                you.currentHealth = you.maxHealth;
                console.log(you.currentHealth);
                alert('Paulina');
            }
        },
        {
            name: "OverDose",
            effect: () => {
                you.currentHealth = 0;
                console.log(you.currentHealth);
                alert('You OD on drugs and died.');
            }
        }
    ]
}

renderInterFace = (interfaceObject) => {

    let shopHTML = '';

    if(interfaceObject.shop){
        interfaceObject.shopInventory.map((product)=>{
            shopHTML += `
            <p class="product-name">${product.name}</p>
            <div class="product-desc">${product.description}</div>
            <p class="product-value">${product.value}</div>
            <button class="purchase-${product.name}">Buy</button>
            `
        });
    }
    //if shop 

    //Print Inventory
    //Add option to hold-up
    //Add option to work

    createOptions = () => {
        let optionsHTML = '';

        interfaceObject.options.map((option)=>{
            optionsHTML += `<li class=${option.name}>${option.name}</li>`;
        });

        return optionsHTML;
    }

    let interFaceHTML = `
        <div>
            <h2>${interfaceObject.name}</h2>
            ${shopHTML}
            ${createOptions()}
            <button class="back-to-map">Back to Map</button>
        </div>
    `

    document.querySelector('.root').innerHTML = interFaceHTML;

    interfaceObject.options.map((option)=>{
        document.querySelector('.' + option.name).addEventListener('click', option.effect);
    });

    interfaceObject.shopInventory.map((product) => {
        document.querySelector(`.purchase-${product.name}`).addEventListener('click', ()=>{
            you.cash = you.cash - product.value;
            you.inventory.push(product);
            console.log(you.cash, you.inventory);
        });
    })

    document.querySelector('.back-to-map').addEventListener('click', () => {
        printMap(maps.sweetWaterEntrance);
        printPlayer();
    });
}

//TILE MAP RENDERING AND MAP MOVEMENT

printMap = (map) => {
    let html = '';

    map.map((row,i) => {
        let rowHTML = '';
        html += `<div class='map-row' id='row${i}'>`

        row.map((cell, p) => {rowHTML += `<div class="cell" id=${i}-${p} style="background:#${cell}${cell}"></div>`})

        html += rowHTML + "</div>";
    });

    document.querySelector('.root').innerHTML = html;
}

printPlayer = () => {
    let currentX = you.currentPosition[1];
    let currentY = you.currentPosition[0];

    let cellList = document.querySelectorAll(".cell");
    for(i = 0 ; i<cellList.length ; i++){
        cellList[i].classList.remove('player-active');
    }

    document.getElementById(`${currentY}-${currentX}`).classList.add("player-active");
}

updatePlayerPosition = (key) => {
    let positionY = you.currentPosition[0];
    let positionX = you.currentPosition[1];
    //Check for offScreen position
    if (key === 'ArrowUp') {
        if(positionY - 1 > -1){
            positionY--;
        }
    }
    if (key === 'ArrowDown') {
        if(positionY + 1 < 20){
            positionY++;
        }
    }
    if (key === 'ArrowLeft') {
        if (positionX - 1 > -1) {
            positionX--;
        }
    }
    if (key === 'ArrowRight') {
        if (positionX + 1 < 20) {
            positionX++;
        }
    }
    //Check for invalid or action tiles
    if (maps.sweetWaterEntrance[positionY][positionX] > 200 ) {
        //Find which 'shop' to show. Use the tile value.
        if(maps.sweetWaterEntrance[positionY][positionX] === 201){
            renderInterFace(home);
        }
        //Render that shop.
        alert("Weclome home or something.");
        return;
    }
    else if(maps.sweetWaterEntrance[positionY][positionX] > 100 ){
        return;
    }
    //Proceed with movement
    you.currentPosition = [positionY, positionX];
    printPlayer();
}

document.body.addEventListener('keypress', (e) => {
    let keyPressed = e.key;
    
    if (keyPressed === 'ArrowUp' || keyPressed === 'ArrowDown' || keyPressed == 'ArrowLeft' || keyPressed === 'ArrowRight') {
        updatePlayerPosition(keyPressed)
    }
})



renderStartMenu();