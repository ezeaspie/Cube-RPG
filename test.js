
renderStartMenu = () => {
    const statTotal = 40;
    let avaliablePoints = 0;

    let statValues = [
        {
            value:10,
            domID: 'str',
            name: 'Strength',
            id: 0,
        },
        {
            value:10,
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
        <form>
            <label>Name:</label><input type="text">
            <div class='chr'></div>
            <div class='str'></div>
            <div class='lck'></div>
            <div class='int'></div>
            <h2>Points Avaliable = <span class="total">${avaliablePoints}</span></h2>
            <input type="submit">
        </form>
    `

    document.querySelector('.root').innerHTML = formHTML;
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
    });
    
    createStatUI = (statObj) => {
        let statValue = statObj.value;
        let domId = statObj.domID;
        let statLabel = statObj.name;

        let html = `
        <p>${statLabel}</p>
        <button class="${domId}-reduce">-</button>
        <p class="${domId}-value">${statValue}</p>
        <button class="${domId}-increase">+</button>
        `
        document.querySelector(`.${domId}`).innerHTML += html;

        document.querySelector(`.${domId}-reduce`).addEventListener("click", () => {
            if (statValues[statObj.id].value - 1 >= 0){
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

renderStartMenu();